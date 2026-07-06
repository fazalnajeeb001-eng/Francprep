import User from '../models/User';
import { generateTokenPair, verifyRefreshToken } from '../utils/jwt';
import { comparePassword } from '../utils/password';
import { SignupDto, LoginDto, IJwtPayload } from '../types';

export class AuthService {
  /**
   * Register a new user
   */
  async signup(data: SignupDto) {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw { statusCode: 409, message: 'Email already registered' };
    }

    const user = await User.create({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    });

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
   * Update profile (firstName, lastName)
   */
  async updateProfile(userId: string, data: { firstName?: string; lastName?: string }) {
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
}

export const authService = new AuthService();