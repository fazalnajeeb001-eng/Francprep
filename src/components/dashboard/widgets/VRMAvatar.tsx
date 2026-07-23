import { useRef, useState, useEffect, useMemo, Suspense, Component, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

class ErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

interface VRMAvatarProps {
  modelUrl: string;
  size?: number;
  animate?: string;
  tint?: {
    skinColor?: string;
    hairColor?: string;
    outfitColor?: string;
  };
}

/* ─── Camera: frames avatar only ─── */
function CameraController({ modelCenterY, modelHeight }: { modelCenterY: number; modelHeight: number }) {
  const { camera } = useThree();
  useEffect(() => {
    const halfH = modelHeight / 2;
    const fov = 36;
    const fovRad = (fov / 2) * (Math.PI / 180);
    const neededZ = halfH / Math.tan(fovRad) * 1.3;
    camera.position.set(0, modelCenterY, Math.max(neededZ, 2.8));
    camera.lookAt(0, modelCenterY * 0.7, 0);
    (camera as THREE.PerspectiveCamera).fov = fov;
    (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
  }, [camera, modelCenterY, modelHeight]);
  return null;
}

function findBones(scene: THREE.Group) {
  const bones: Record<string, THREE.Object3D> = {};
  const keywords: Record<string, string[]> = {
    head: ["mixamorig:Head", "mixamorigHead", "Head"],
    spine: ["mixamorig:Spine", "mixamorigSpine", "Spine"],
    spine1: ["mixamorig:Spine1", "mixamorigSpine1"],
    spine2: ["mixamorig:Spine2", "mixamorigSpine2"],
    leftArm: ["mixamorig:LeftArm", "mixamorigLeftArm", "LeftArm"],
    rightArm: ["mixamorig:RightArm", "mixamorigRightArm", "RightArm"],
    leftForearm: ["mixamorig:LeftForeArm", "mixamorigLeftForeArm", "LeftForeArm"],
    rightForearm: ["mixamorig:RightForeArm", "mixamorigRightForeArm", "RightForeArm"],
    leftHand: ["mixamorig:LeftHand", "mixamorigLeftHand"],
    rightHand: ["mixamorig:RightHand", "mixamorigRightHand"],
    hips: ["mixamorig:Hips", "mixamorigHips", "Hips"],
    leftUpLeg: ["mixamorig:LeftUpLeg", "mixamorigLeftUpLeg"],
    rightUpLeg: ["mixamorig:RightUpLeg", "mixamorigRightUpLeg"],
    leftLeg: ["mixamorig:LeftLeg", "mixamorigLeftLeg"],
    rightLeg: ["mixamorig:RightLeg", "mixamorigRightLeg"],
    leftFoot: ["mixamorig:LeftFoot", "mixamorigLeftFoot"],
    rightFoot: ["mixamorig:RightFoot", "mixamorigRightFoot"],
    neck: ["mixamorig:Neck", "mixamorigNeck"],
  };
  scene.traverse((child) => {
    for (const [key, names] of Object.entries(keywords)) {
      if (!bones[key] && names.some((n) => child.name === n || child.name.toLowerCase() === n.toLowerCase())) {
        bones[key] = child;
      }
    }
  });
  return bones;
}

function smoothStep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function VRMModel({
  modelUrl,
  animate,
  tint,
}: {
  modelUrl: string;
  animate: string;
  tint?: VRMAvatarProps["tint"];
}) {
  const groupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [modelInfo, setModelInfo] = useState({ centerY: 0.9, height: 1.85 });
  const bonesRef = useRef<Record<string, THREE.Object3D>>({});
  const restposesRef = useRef<Record<string, THREE.Euler>>({});
  const blinkRef = useRef(0);
  const animStartRef = useRef(0);
  const prevAnimRef = useRef(animate);
  const noiseRef = useRef({ v1: 0, v2: 0, v3: 0, v4: 0 });

  useEffect(() => {
    let cancelled = false;

    async function loadModel() {
      try {
        const { GLTFLoader } = await import("three/addons/loaders/GLTFLoader.js");
        const { DRACOLoader } = await import("three/addons/loaders/DRACOLoader.js");

        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("/draco/");
        loader.setDRACOLoader(dracoLoader);

        loader.load(
          modelUrl,
          (gltf: any) => {
            if (cancelled) return;
            const scene = gltf.scene;

            scene.traverse((child: any) => {
              if (child.isMesh) {
                child.frustumCulled = false;
                child.castShadow = true;
                child.receiveShadow = true;

                if (child.material) {
                  const mat = child.material;
                  if (mat.emissiveMap && !mat.map) {
                    const tex = mat.emissiveMap;
                    child.material = new THREE.MeshStandardMaterial({
                      map: tex,
                      roughness: 0.6,
                      metalness: 0.0,
                    });
                  }
                }
              }
            });

            const MIXAMO_HIPS_Y = 1.011;
            const MIXAMO_HEAD_TOP_Y = 1.88;
            const MIXAMO_TOE_BOTTOM_Y = -0.18;
            const MIXAMO_HEIGHT = MIXAMO_HEAD_TOP_Y - MIXAMO_TOE_BOTTOM_Y;

            let hasMixamo = false;
            scene.traverse((child: any) => {
              if (!hasMixamo && child.name && child.name.startsWith("mixamorig:")) hasMixamo = true;
            });

            let boneMinY: number, skeletonHeight: number;
            if (hasMixamo) {
              boneMinY = MIXAMO_TOE_BOTTOM_Y;
              skeletonHeight = MIXAMO_HEIGHT;
            } else {
              const bbox = new THREE.Box3().setFromObject(scene);
              const bsize = bbox.getSize(new THREE.Vector3());
              boneMinY = 0;
              skeletonHeight = bsize.y || 1.85;
            }

            const targetHeight = 1.4;
            const scale = targetHeight / skeletonHeight;
            scene.scale.set(scale, scale, scale);
            scene.position.y = -boneMinY * scale;

            scene.updateMatrixWorld(true);
            const hbox = new THREE.Box3().setFromObject(scene);
            const hcenter = hbox.getCenter(new THREE.Vector3());
            scene.position.x -= hcenter.x;
            scene.position.z -= hcenter.z;

            const cameraCenterY = targetHeight * 0.56;
            setModelInfo({ centerY: cameraCenterY, height: targetHeight });
            bonesRef.current = findBones(scene);
            const rps: Record<string, THREE.Euler> = {};
            for (const [k, v] of Object.entries(bonesRef.current)) {
              rps[k] = v.rotation.clone();
            }
            restposesRef.current = rps;

            modelRef.current = scene;
            setLoaded(true);
            dracoLoader.dispose();
          },
          undefined,
          (err: any) => {
            console.error("[VRMAvatar] Failed to load:", modelUrl, err);
            if (!cancelled) setLoadError(true);
          }
        );
      } catch (e) {
        console.warn("Failed to import 3D loaders:", e);
        if (!cancelled) setLoadError(true);
      }
    }

    loadModel();
    return () => { cancelled = true; };
  }, [modelUrl, tint]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const dt = clock.getDelta();
    const g = groupRef.current;
    const m = modelRef.current;
    if (!g || !m) return;
    const bones = bonesRef.current;
    const rp = restposesRef.current;

    const noise = noiseRef.current;
    noise.v1 += (Math.random() - 0.5) * dt * 2;
    noise.v1 *= 0.95;
    noise.v2 += (Math.random() - 0.5) * dt * 1.5;
    noise.v2 *= 0.93;
    noise.v3 += (Math.random() - 0.5) * dt * 1.8;
    noise.v3 *= 0.94;

    blinkRef.current += dt;
    const blinkCycle = 3.5 + Math.sin(t * 0.3) * 1.5;
    const blinkPhase = blinkRef.current % blinkCycle;

    if (prevAnimRef.current !== animate) {
      animStartRef.current = t;
      prevAnimRef.current = animate;
    }
    const animT = t - animStartRef.current;

    if (animate === "idle") {
      const wanderCycle = 10;
      const wanderPhase = t % wanderCycle;
      const isWalking = wanderPhase < 4.5;
      const walkRaw = isWalking
        ? Math.min(wanderPhase, 4.5 - wanderPhase)
        : 0;
      const walkBlend = smoothStep(0, 0.7, walkRaw);

      const walkFreq = 1.8;
      const stride = Math.sin(t * walkFreq) * walkBlend;

      const driftX = Math.sin(t * 0.28) * 0.05 * walkBlend;
      const driftZ = Math.sin(t * 0.56) * 0.025 * walkBlend;
      g.position.x = driftX;
      g.position.z = driftZ;

      const walkBounce = Math.abs(Math.sin(t * walkFreq)) * 0.018 * walkBlend;
      const breathe = Math.sin(t * 1.05) * 0.003;
      g.position.y = walkBounce + breathe;

      const walkAngle = Math.atan2(
        Math.cos(t * 0.28) * 0.28,
        Math.cos(t * 0.56) * 0.56
      );
      g.rotation.y = walkBlend > 0.01
        ? walkAngle * 0.2 * walkBlend
        : noise.v2 * 0.3;
      g.rotation.z = noise.v3 * 0.08;

      g.scale.y = 1 + breathe * 0.4;
      g.scale.x = 1 - breathe * 0.1;

      if (bones.hips) {
        const rp2 = rp.hips || bones.hips.rotation;
        bones.hips.rotation.y = rp2.y + stride * 0.06 + noise.v1 * 0.01;
        bones.hips.rotation.z = rp2.z + Math.sin(t * walkFreq) * 0.012 * walkBlend;
        bones.hips.rotation.x = rp2.x + Math.cos(t * walkFreq) * 0.006 * walkBlend;
      }

      if (bones.spine) {
        const rp2 = rp.spine || bones.spine.rotation;
        bones.spine.rotation.y = rp2.y - stride * 0.035;
        bones.spine.rotation.z = rp2.z + Math.sin(t * walkFreq + 1.5) * 0.008 * walkBlend;
        bones.spine.rotation.x = rp2.x + breathe * 0.35;
      }

      if (bones.leftUpLeg) {
        const rp2 = rp.leftUpLeg || bones.leftUpLeg.rotation;
        bones.leftUpLeg.rotation.x = rp2.x + stride * 0.22;
      }
      if (bones.rightUpLeg) {
        const rp2 = rp.rightUpLeg || bones.rightUpLeg.rotation;
        bones.rightUpLeg.rotation.x = rp2.x - stride * 0.22;
      }
      if (bones.leftLeg) {
        const rp2 = rp.leftLeg || bones.leftLeg.rotation;
        bones.leftLeg.rotation.x = rp2.x - Math.max(0, stride) * 0.28 * walkBlend;
      }
      if (bones.rightLeg) {
        const rp2 = rp.rightLeg || bones.rightLeg.rotation;
        bones.rightLeg.rotation.x = rp2.x - Math.max(0, -stride) * 0.28 * walkBlend;
      }

      if (bones.leftArm) {
        const rp2 = rp.leftArm || bones.leftArm.rotation;
        bones.leftArm.rotation.x = rp2.x - stride * 0.2;
        bones.leftArm.rotation.z = rp2.z + 0.05 + Math.abs(stride) * 0.015 * walkBlend;
      }
      if (bones.leftForearm) {
        const rp2 = rp.leftForearm || bones.leftForearm.rotation;
        bones.leftForearm.rotation.x = rp2.x - 0.05 - Math.max(0, stride) * 0.1 * walkBlend;
      }
      if (bones.rightArm) {
        const rp2 = rp.rightArm || bones.rightArm.rotation;
        bones.rightArm.rotation.x = rp2.x + stride * 0.2;
        bones.rightArm.rotation.z = rp2.z - 0.05 - Math.abs(stride) * 0.015 * walkBlend;
      }
      if (bones.rightForearm) {
        const rp2 = rp.rightForearm || bones.rightForearm.rotation;
        bones.rightForearm.rotation.x = rp2.x - 0.05 - Math.max(0, -stride) * 0.1 * walkBlend;
      }

      if (bones.head) {
        const rp2 = rp.head || bones.head.rotation;
        const headStabilize = -Math.sin(t * walkFreq) * 0.015 * walkBlend;
        const idleLookY = noise.v1 * 0.25 + Math.sin(t * 0.13) * 0.03;
        const idleLookX = noise.v2 * 0.15 + Math.sin(t * 0.09 + 0.5) * 0.02;
        const glancePhase = t % 6.3;
        const glance = glancePhase < 0.35
          ? Math.sin(glancePhase * 9) * 0.07 * smoothStep(0, 0.12, glancePhase) * (1 - smoothStep(0.22, 0.35, glancePhase))
          : 0;

        bones.head.rotation.x = rp2.x + idleLookX + headStabilize;
        bones.head.rotation.y = rp2.y + idleLookY + glance;
        bones.head.rotation.z = rp2.z + noise.v3 * 0.06;
      }

      if (bones.neck) {
        const rp2 = rp.neck || bones.neck.rotation;
        bones.neck.rotation.x = rp2.x + noise.v2 * 0.06;
        bones.neck.rotation.z = rp2.z + noise.v3 * 0.04;
      }

    } else if (animate === "wave") {
      const waveDur = 2.5;
      const waveT = Math.min(t, waveDur);
      const waveIn = smoothStep(0, 0.4, waveT);
      const waveOut = 1 - smoothStep(1.8, waveDur, waveT);
      const waveBlend = waveIn * waveOut;

      g.position.y = Math.sin(t * 2.5) * 0.005;
      g.rotation.y = Math.sin(t * 1.2) * 0.03 * waveBlend;
      g.rotation.z = Math.sin(t * 1.5) * 0.02 * waveBlend;

      if (bones.head) {
        const rp2 = rp.head || bones.head.rotation;
        bones.head.rotation.x = rp2.x - 0.04 * waveBlend;
        bones.head.rotation.y = rp2.y + Math.sin(t * 1.8) * 0.05 * waveBlend;
        bones.head.rotation.z = rp2.z + 0.06 * waveBlend;
      }
      if (bones.rightArm) {
        const rp2 = rp.rightArm || bones.rightArm.rotation;
        bones.rightArm.rotation.z = rp2.z - (1.0 + Math.sin(t * 3.5) * 0.3) * waveBlend;
        bones.rightArm.rotation.x = rp2.x - 0.15 * waveBlend;
      }
      if (bones.rightForearm) {
        const rp2 = rp.rightForearm || bones.rightForearm.rotation;
        bones.rightForearm.rotation.x = rp2.x - (0.6 + Math.sin(t * 3.5) * 0.15) * waveBlend;
      }
      if (bones.leftArm) {
        const rp2 = rp.leftArm || bones.leftArm.rotation;
        bones.leftArm.rotation.z = rp2.z + 0.06 + Math.sin(t * 1.0) * 0.02;
      }
      if (bones.spine) {
        const rp2 = rp.spine || bones.spine.rotation;
        bones.spine.rotation.z = rp2.z + Math.sin(t * 1.5) * 0.015 * waveBlend;
        bones.spine.rotation.x = rp2.x + Math.sin(t * 1.2) * 0.01 * waveBlend;
      }

    } else if (animate === "walk") {
      const walkSpeed = 3.5;
      const stride = Math.sin(t * walkSpeed);

      g.position.y = Math.abs(stride) * 0.025;
      g.rotation.z = stride * 0.015;
      g.rotation.y = Math.sin(t * walkSpeed * 0.5) * 0.02;

      if (bones.leftArm) {
        const rp2 = rp.leftArm || bones.leftArm.rotation;
        bones.leftArm.rotation.x = rp2.x + stride * 0.25;
        bones.leftArm.rotation.z = rp2.z + 0.1 + Math.abs(stride) * 0.05;
      }
      if (bones.rightArm) {
        const rp2 = rp.rightArm || bones.rightArm.rotation;
        bones.rightArm.rotation.x = rp2.x - stride * 0.25;
        bones.rightArm.rotation.z = rp2.z - 0.1 - Math.abs(stride) * 0.05;
      }
      if (bones.leftForearm) {
        const rp2 = rp.leftForearm || bones.leftForearm.rotation;
        bones.leftForearm.rotation.x = rp2.x - 0.15 - Math.max(0, stride) * 0.1;
      }
      if (bones.rightForearm) {
        const rp2 = rp.rightForearm || bones.rightForearm.rotation;
        bones.rightForearm.rotation.x = rp2.x - 0.15 - Math.max(0, -stride) * 0.1;
      }
      if (bones.head) {
        const rp2 = rp.head || bones.head.rotation;
        bones.head.rotation.y = rp2.y + Math.sin(t * 1.2) * 0.03;
        bones.head.rotation.x = rp2.x + 0.02;
      }
      if (bones.spine) {
        const rp2 = rp.spine || bones.spine.rotation;
        bones.spine.rotation.y = rp2.y - stride * 0.03;
      }
      if (bones.hips) {
        const rp2 = rp.hips || bones.hips.rotation;
        bones.hips.rotation.y = rp2.y + stride * 0.04;
      }

    } else if (animate === "celebrate") {
      const jumpPhase = Math.sin(t * 4);
      g.position.y = Math.abs(jumpPhase) * 0.06;
      g.rotation.y = t * 2.5 % (Math.PI * 2);
      g.rotation.z = Math.sin(t * 5) * 0.02;

      if (bones.leftArm) { const rp2 = rp.leftArm || bones.leftArm.rotation; bones.leftArm.rotation.z = rp2.z + 0.9 + Math.sin(t * 5) * 0.3; bones.leftArm.rotation.x = rp2.x + Math.sin(t * 4 + 0.5) * 0.15; }
      if (bones.rightArm) { const rp2 = rp.rightArm || bones.rightArm.rotation; bones.rightArm.rotation.z = rp2.z - 0.9 + Math.sin(t * 5 + Math.PI) * 0.3; bones.rightArm.rotation.x = rp2.x + Math.sin(t * 4 + 2) * 0.15; }
      if (bones.leftForearm) { const rp2 = rp.leftForearm || bones.leftForearm.rotation; bones.leftForearm.rotation.x = rp2.x - 0.3 + Math.sin(t * 5) * 0.1; }
      if (bones.rightForearm) { const rp2 = rp.rightForearm || bones.rightForearm.rotation; bones.rightForearm.rotation.x = rp2.x - 0.3 + Math.sin(t * 5 + Math.PI) * 0.1; }
      if (bones.head) { const rp2 = rp.head || bones.head.rotation; bones.head.rotation.z = rp2.z + Math.sin(t * 3) * 0.1; bones.head.rotation.x = rp2.x + Math.sin(t * 2) * 0.05; }
      if (bones.spine) { const rp2 = rp.spine || bones.spine.rotation; bones.spine.rotation.x = rp2.x + Math.sin(t * 4) * 0.04; bones.spine.rotation.z = rp2.z + Math.sin(t * 3) * 0.02; }
      if (bones.hips) { const rp2 = rp.hips || bones.hips.rotation; bones.hips.rotation.y = rp2.y + Math.sin(t * 4) * 0.05; }

    } else if (animate === "speak") {
      const speakTempo = t * 10;
      const mouthOpen = Math.abs(Math.sin(speakTempo)) * 0.08;
      const headNod = Math.sin(t * 3) * 0.03;
      const headTilt = Math.sin(t * 1.5) * 0.02;

      g.position.y = Math.sin(t * 2) * 0.004;

      if (bones.head) {
        const rp2 = rp.head || bones.head.rotation;
        bones.head.rotation.x = rp2.x + headNod + mouthOpen * 0.2;
        bones.head.rotation.y = rp2.y + headTilt;
        bones.head.rotation.z = rp2.z + Math.sin(t * 2.5) * 0.015;
      }
      if (bones.leftArm) {
        const rp2 = rp.leftArm || bones.leftArm.rotation;
        bones.leftArm.rotation.z = rp2.z + 0.15 + Math.sin(t * 2) * 0.04;
        bones.leftArm.rotation.x = rp2.x - 0.1 + Math.sin(t * 1.8) * 0.03;
      }
      if (bones.rightArm) {
        const rp2 = rp.rightArm || bones.rightArm.rotation;
        bones.rightArm.rotation.z = rp2.z - 0.15 - Math.sin(t * 2.2) * 0.04;
        bones.rightArm.rotation.x = rp2.x - 0.1 + Math.sin(t * 1.5) * 0.03;
      }

    } else if (animate === "chapterComplete") {
      const walkDur = 1.5;
      const stopDur = 0.5;
      const pumpDur = 1.0;
      const holdDur = 1.5;
      const totalDur = walkDur + stopDur + pumpDur + holdDur;
      const phase = animT % totalDur;

      if (phase < walkDur) {
        const stride = Math.sin(phase * 6);
        g.position.y = Math.abs(stride) * 0.02;
        g.rotation.z = stride * 0.01;
        if (bones.leftArm) { const rp2 = rp.leftArm || bones.leftArm.rotation; bones.leftArm.rotation.x = rp2.x + stride * 0.2; }
        if (bones.rightArm) { const rp2 = rp.rightArm || bones.rightArm.rotation; bones.rightArm.rotation.x = rp2.x - stride * 0.2; }
        if (bones.leftForearm) { const rp2 = rp.leftForearm || bones.leftForearm.rotation; bones.leftForearm.rotation.x = rp2.x - 0.15; }
        if (bones.rightForearm) { const rp2 = rp.rightForearm || bones.rightForearm.rotation; bones.rightForearm.rotation.x = rp2.x - 0.15; }
        if (bones.hips) { const rp2 = rp.hips || bones.hips.rotation; bones.hips.rotation.y = rp2.y + stride * 0.03; }
      } else if (phase < walkDur + stopDur) {
        const blend = smoothStep(0, stopDur, phase - walkDur);
        g.position.y = Math.sin(t * 2) * 0.005;
        if (bones.spine) { const rp2 = rp.spine || bones.spine.rotation; bones.spine.rotation.x = rp2.x - 0.03 * blend; }
      } else if (phase < walkDur + stopDur + pumpDur) {
        const pumpT = (phase - walkDur - stopDur) / pumpDur;
        const pumpEase = Math.sin(pumpT * Math.PI);
        g.position.y = Math.sin(t * 2) * 0.005;
        if (bones.rightArm) { const rp2 = rp.rightArm || bones.rightArm.rotation; bones.rightArm.rotation.z = rp2.z - (1.0 + pumpEase * 0.4); bones.rightArm.rotation.x = rp2.x - 0.2 * pumpEase; }
        if (bones.rightForearm) { const rp2 = rp.rightForearm || bones.rightForearm.rotation; bones.rightForearm.rotation.x = rp2.x - (0.6 + pumpEase * 0.3); }
        if (bones.head) { const rp2 = rp.head || bones.head.rotation; bones.head.rotation.x = rp2.x - 0.06 * pumpEase; bones.head.rotation.z = rp2.z + 0.05 * pumpEase; }
        if (bones.spine) { const rp2 = rp.spine || bones.spine.rotation; bones.spine.rotation.z = rp2.z - 0.02 * pumpEase; }
      } else {
        g.position.y = Math.sin(t * 2) * 0.005;
        if (bones.rightArm) { const rp2 = rp.rightArm || bones.rightArm.rotation; bones.rightArm.rotation.z = rp2.z - 1.2; bones.rightArm.rotation.x = rp2.x - 0.15; }
        if (bones.rightForearm) { const rp2 = rp.rightForearm || bones.rightForearm.rotation; bones.rightForearm.rotation.x = rp2.x - 0.8; }
        if (bones.head) { const rp2 = rp.head || bones.head.rotation; bones.head.rotation.x = rp2.x - 0.05; }
      }

    } else if (animate === "moduleComplete") {
      const jumpDur = 1.0;
      const pumpDur = 1.0;
      const spinDur = 1.5;
      const victoryDur = 1.5;
      const totalDur = jumpDur + pumpDur + spinDur + victoryDur;
      const phase = animT % totalDur;

      if (phase < jumpDur) {
        const jumpT = phase / jumpDur;
        const jumpHeight = Math.sin(jumpT * Math.PI) * 0.1;
        g.position.y = jumpHeight;
        g.rotation.y = 0;
        if (bones.leftArm) { const rp2 = rp.leftArm || bones.leftArm.rotation; bones.leftArm.rotation.z = rp2.z + 0.6 * Math.sin(jumpT * Math.PI); }
        if (bones.rightArm) { const rp2 = rp.rightArm || bones.rightArm.rotation; bones.rightArm.rotation.z = rp2.z - 0.6 * Math.sin(jumpT * Math.PI); }
      } else if (phase < jumpDur + pumpDur) {
        const pumpT = (phase - jumpDur) / pumpDur;
        const pumpEase = Math.sin(pumpT * Math.PI);
        g.position.y = 0.02;
        if (bones.leftArm) { const rp2 = rp.leftArm || bones.leftArm.rotation; bones.leftArm.rotation.z = rp2.z + (0.9 + pumpEase * 0.4); bones.leftArm.rotation.x = rp2.x + Math.sin(pumpT * Math.PI * 3) * 0.1; }
        if (bones.rightArm) { const rp2 = rp.rightArm || bones.rightArm.rotation; bones.rightArm.rotation.z = rp2.z - (0.9 + pumpEase * 0.4); bones.rightArm.rotation.x = rp2.x + Math.sin(pumpT * Math.PI * 3) * 0.1; }
        if (bones.leftForearm) { const rp2 = rp.leftForearm || bones.leftForearm.rotation; bones.leftForearm.rotation.x = rp2.x - 0.2 * pumpEase; }
        if (bones.rightForearm) { const rp2 = rp.rightForearm || bones.rightForearm.rotation; bones.rightForearm.rotation.x = rp2.x - 0.2 * pumpEase; }
      } else if (phase < jumpDur + pumpDur + spinDur) {
        const spinT = (phase - jumpDur - pumpDur) / spinDur;
        const spinEase = smoothStep(0, 1, spinT);
        g.position.y = 0.03;
        g.rotation.y = spinEase * Math.PI * 2;
        if (bones.leftArm) { const rp2 = rp.leftArm || bones.leftArm.rotation; bones.leftArm.rotation.z = rp2.z + 1.0; }
        if (bones.rightArm) { const rp2 = rp.rightArm || bones.rightArm.rotation; bones.rightArm.rotation.z = rp2.z - 1.0; }
        if (bones.leftForearm) { const rp2 = rp.leftForearm || bones.leftForearm.rotation; bones.leftForearm.rotation.x = rp2.x - 0.3; }
        if (bones.rightForearm) { const rp2 = rp.rightForearm || bones.rightForearm.rotation; bones.rightForearm.rotation.x = rp2.x - 0.3; }
      } else {
        const breathe = Math.sin(t * 3) * 0.01;
        g.position.y = 0.02 + breathe;
        g.rotation.y = Math.PI * 2;
        if (bones.leftArm) { const rp2 = rp.leftArm || bones.leftArm.rotation; bones.leftArm.rotation.z = rp2.z + 1.2; bones.leftArm.rotation.x = rp2.x - 0.1; }
        if (bones.rightArm) { const rp2 = rp.rightArm || bones.rightArm.rotation; bones.rightArm.rotation.z = rp2.z - 1.2; bones.rightArm.rotation.x = rp2.x - 0.1; }
        if (bones.leftForearm) { const rp2 = rp.leftForearm || bones.leftForearm.rotation; bones.leftForearm.rotation.x = rp2.x - 0.5; }
        if (bones.rightForearm) { const rp2 = rp.rightForearm || bones.rightForearm.rotation; bones.rightForearm.rotation.x = rp2.x - 0.5; }
        if (bones.head) { const rp2 = rp.head || bones.head.rotation; bones.head.rotation.x = rp2.x - 0.08; bones.head.rotation.z = rp2.z + Math.sin(t * 2) * 0.03; }
        if (bones.spine) { const rp2 = rp.spine || bones.spine.rotation; bones.spine.rotation.x = rp2.x - 0.04; }
      }
    }
  });

  if (loadError) return null;
  if (!loaded) return null;

  return (
    <group ref={groupRef}>
      <CameraController modelCenterY={modelInfo.centerY} modelHeight={modelInfo.height} />
      {modelRef.current && <primitive object={modelRef.current} />}
    </group>
  );
}

function LoadingBox() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime;
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshStandardMaterial color="#8B5CF6" wireframe />
    </mesh>
  );
}

function TimeBasedLights() {
  const hour = new Date().getHours();
  let phase: "morning" | "afternoon" | "evening" | "night";
  if (hour >= 5 && hour < 12) phase = "morning";
  else if (hour >= 12 && hour < 17) phase = "afternoon";
  else if (hour >= 17 && hour < 21) phase = "evening";
  else phase = "night";

  const configs: Record<string, { ambient: number; key: string; fill: string; rim: string; keyIntensity: number; fillIntensity: number }> = {
    morning: { ambient: 0.7, key: "#FFF5E6", fill: "#FFE4CC", rim: "#FFD4AA", keyIntensity: 1.0, fillIntensity: 0.4 },
    afternoon: { ambient: 0.65, key: "#FFFFFF", fill: "#E8D5F5", rim: "#D4B5FF", keyIntensity: 1.2, fillIntensity: 0.5 },
    evening: { ambient: 0.55, key: "#FFD4AA", fill: "#E8A070", rim: "#C08050", keyIntensity: 0.9, fillIntensity: 0.45 },
    night: { ambient: 0.45, key: "#C4B5FD", fill: "#8B5CF6", rim: "#6D28D9", keyIntensity: 0.8, fillIntensity: 0.35 },
  };

  const c = configs[phase];

  return (
    <>
      <ambientLight intensity={c.ambient} />
      <directionalLight position={[2, 4, 4]} intensity={c.keyIntensity} color={c.key} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-2, 3, 3]} intensity={c.fillIntensity} color={c.fill} />
      <directionalLight position={[0, -1, 3]} intensity={0.2} color="#f0e6ff" />
      <pointLight position={[0, 2, 2]} intensity={0.3} color={c.rim} distance={5} />
      {/* @ts-ignore */}
      <hemisphereLight skyColor={c.key} groundColor="#333333" intensity={0.35} />
    </>
  );
}

export function VRMAvatar({
  modelUrl,
  size = 80,
  animate = "idle",
  tint,
}: VRMAvatarProps) {
  return (
    <ErrorBoundary fallback={null}>
      <div style={{ width: size, height: size }} className="relative">
        <Canvas
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
          dpr={[1, 3]}
          shadows
        >
          <TimeBasedLights />
          <Suspense fallback={<LoadingBox />}>
            <VRMModel modelUrl={modelUrl} animate={animate} tint={tint} />
          </Suspense>
        </Canvas>
      </div>
    </ErrorBoundary>
  );
}
