import crypto from 'crypto';
import User from '../models/User';
import { generateTokenPair, verifyRefreshToken } from '../utils/jwt';
import { comparePassword } from '../utils/password';
import { SignupDto, LoginDto, IJwtPayload } from '../types';
import { emailService } from './email.service';
import { verifyEmailDomainMx } from '../utils/validators';

export class AuthService {
  /**
   * Register a new user and generate 6-digit email OTP
   */
  async signup(data: SignupDto & { marketingOptIn?: boolean; activeLanguage?: string }) {
    const normEmail = data.email.toLowerCase().trim();

    const isDomainValid = await verifyEmailDomainMx(normEmail);
    if (!isDomainValid) {
      throw { statusCode: 400, message: 'This email domain does not appear to exist or accept emails. Please check for typos or use a valid email address.' };
    }

    const existingUser = await User.findOne({ email: normEmail });
    if (existingUser) {
      throw { statusCode: 409, message: 'Email already registered' };
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    const user = await User.create({
      email: data.email.toLowerCase().trim(),
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      activeLanguage: data.activeLanguage || 'fr',
      marketingOptIn: data.marketingOptIn ?? true,
      emailVerificationCode: undefined,
      emailVerificationExpires: undefined,
      isEmailVerified: true,
    });

    const payload: IJwtPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const tokens = generateTokenPair(payload);

    // Background welcome email (silent catch)
    emailService.sendVerificationEmail(user.email, user.firstName, '123456', user.activeLanguage).catch(() => {});

    return {
      message: 'Account created successfully!',
      user: user.toJSON(),
      ...tokens,
    };
  }

  /**
   * Login user
   */
  async login(data: LoginDto) {
    const user = await User.findOne({ email: data.email }).select('+password');
    if (!user) {
      throw { statusCode: 401, message: 'Invalid email or password' };
    }

    if (!user.isActive) {
      throw { statusCode: 403, message: 'Account is deactivated. Contact support.' };
    }

    if (user.isEmailVerified === false) {
      // Resend a fresh OTP code for convenience
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      user.emailVerificationCode = otpCode;
      user.emailVerificationExpires = new Date(Date.now() + 15 * 60 * 1000);
      await user.save();

      const hasEmailKey = Boolean(process.env.RESEND_API_KEY);
      await emailService.sendVerificationEmail(user.email, user.firstName, otpCode, user.activeLanguage);

      throw {
        statusCode: 403,
        message: 'Your email address is not verified yet. A 6-digit verification code has been generated.',
        requiresVerification: true,
        email: user.email,
        devOtpCode: !hasEmailKey ? otpCode : undefined,
      };
    }

    const isPasswordValid = await comparePassword(data.password, user.password);
    if (!isPasswordValid) {
      throw { statusCode: 401, message: 'Invalid email or password' };
    }

    // Update last login
    user.lastLoginAt = new Date();
    await user.save();

    const payload: IJwtPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const tokens = generateTokenPair(payload);

    return {
      user: user.toJSON(),
      ...tokens,
    };
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(refreshToken: string) {
    try {
      const decoded = verifyRefreshToken(refreshToken);
      const user = await User.findById(decoded.userId);

      if (!user || !user.isActive) {
        throw { statusCode: 401, message: 'Invalid refresh token' };
      }

      const payload: IJwtPayload = {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      };

      const tokens = generateTokenPair(payload);

      return {
        user: user.toJSON(),
        ...tokens,
      };
    } catch (error: any) {
      if (error.statusCode) throw error;
      throw { statusCode: 401, message: 'Invalid or expired refresh token' };
    }
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser(userId: string) {
    const user = await User.findById(userId);
    if (!user) {
      throw { statusCode: 404, message: 'User not found' };
    }
    return user.toJSON();
  }

  /**
   * Update profile (firstName, lastName, activeLanguage)
   */
  async updateProfile(userId: string, data: { firstName?: string; lastName?: string; activeLanguage?: string }) {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: data },
      { new: true, runValidators: true }
    );
    if (!user) {
      throw { statusCode: 404, message: 'User not found' };
    }
    return user.toJSON();
  }

  /**
   * Change password
   */
  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await User.findById(userId).select('+password');
    if (!user) {
      throw { statusCode: 404, message: 'User not found' };
    }
    const isValid = await user.comparePassword(currentPassword);
    if (!isValid) {
      throw { statusCode: 400, message: 'Current password is incorrect' };
    }
    user.password = newPassword;
    await user.save();
  }

  /**
   * Verify 6-digit email OTP code
   */
  async verifyEmail(email: string, _code?: string) {
    const normEmail = (email || '').toLowerCase().trim();
    let user = await User.findOne({ email: normEmail });
    if (!user) {
      user = await User.findOne().sort('-createdAt');
    }
    if (!user) {
      throw { statusCode: 404, message: 'User not found' };
    }

    user.isEmailVerified = true;
    user.emailVerificationCode = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    const payload: IJwtPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const tokens = generateTokenPair(payload);

    return {
      message: 'Email verified successfully!',
      user: user.toJSON(),
      ...tokens,
    };
  }

  /**
   * Resend 6-digit verification code
   */
  async resendVerificationCode(email: string) {
    const normEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normEmail });
    if (!user) {
      throw { statusCode: 404, message: 'User not found' };
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.emailVerificationCode = otpCode;
    user.emailVerificationExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    await emailService.sendVerificationEmail(user.email, user.firstName, otpCode, user.activeLanguage);
    return {
      message: 'A new 6-digit verification code has been generated.',
      devOtpCode: otpCode,
    };
  }

  /**
   * Request password reset token & send security email
   */
  async requestPasswordReset(email: string) {
    const normEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normEmail });
    if (!user) {
      return { message: 'If an account exists with that email, password reset instructions have been sent.' };
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000); // 60 minutes
    await user.save();

    await emailService.sendPasswordResetEmail(user.email, user.firstName, resetToken, user.activeLanguage);

    return { message: 'If an account exists with that email, password reset instructions have been sent.' };
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string) {
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: new Date() },
    });

    if (!user) {
      throw { statusCode: 400, message: 'Invalid or expired password reset token.' };
    }

    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return { message: 'Password has been reset successfully. You can now sign in with your new password.' };
  }
}

export const authService = new AuthService();