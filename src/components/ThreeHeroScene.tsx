import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeHeroScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0f1d, 0.035);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 4, 11);
    camera.lookAt(0, 1.5, 0);

    // 3. Renderer with antialiasing and alpha
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0a0f1d, 1);
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const goldPointLight = new THREE.PointLight(0xf4b400, 2.5, 20);
    goldPointLight.position.set(4, 6, 4);
    scene.add(goldPointLight);

    const redPointLight = new THREE.PointLight(0xe63946, 2.5, 20);
    redPointLight.position.set(-4, 3, -2);
    scene.add(redPointLight);

    // 5. Main Architectural Wireframe Structure Group
    const buildingGroup = new THREE.Group();
    scene.add(buildingGroup);

    // Create a multi-tier modern architectural building wireframe (Skyscraper / Villa Frame)
    const tiers = [
      { w: 3.2, h: 1.2, d: 3.2, y: 0.6, color: 0xf4b400 },
      { w: 2.6, h: 1.4, d: 2.6, y: 1.9, color: 0xe63946 },
      { w: 2.0, h: 1.6, d: 2.0, y: 3.4, color: 0xf4b400 },
      { w: 1.4, h: 1.8, d: 1.4, y: 5.1, color: 0xffffff },
      { w: 0.6, h: 1.2, d: 0.6, y: 6.6, color: 0xe63946 },
    ];

    const materialsToDispose: THREE.Material[] = [];
    const geometriesToDispose: THREE.BufferGeometry[] = [];

    tiers.forEach((tier) => {
      // Box wireframe
      const boxGeo = new THREE.BoxGeometry(tier.w, tier.h, tier.d);
      geometriesToDispose.push(boxGeo);

      const wireframeGeo = new THREE.WireframeGeometry(boxGeo);
      geometriesToDispose.push(wireframeGeo);

      const lineMaterial = new THREE.LineBasicMaterial({
        color: tier.color,
        transparent: true,
        opacity: 0.45,
        linewidth: 1.5,
      });
      materialsToDispose.push(lineMaterial);

      const line = new THREE.LineSegments(wireframeGeo, lineMaterial);
      line.position.y = tier.y;
      buildingGroup.add(line);

      // Add subtle semi-transparent glass core
      const innerBoxGeo = new THREE.BoxGeometry(tier.w * 0.98, tier.h * 0.98, tier.d * 0.98);
      geometriesToDispose.push(innerBoxGeo);

      const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x0f172a,
        roughness: 0.1,
        metalness: 0.1,
        transparent: true,
        opacity: 0.6,
      });
      materialsToDispose.push(glassMaterial);

      const innerMesh = new THREE.Mesh(innerBoxGeo, glassMaterial);
      innerMesh.position.y = tier.y;
      buildingGroup.add(innerMesh);

      // Floor slab indicators
      const slabGeo = new THREE.BoxGeometry(tier.w * 1.05, 0.06, tier.d * 1.05);
      geometriesToDispose.push(slabGeo);

      const slabMaterial = new THREE.MeshBasicMaterial({
        color: 0xf4b400,
        transparent: true,
        opacity: 0.7,
      });
      materialsToDispose.push(slabMaterial);

      const topSlab = new THREE.Mesh(slabGeo, slabMaterial);
      topSlab.position.y = tier.y + tier.h / 2;
      buildingGroup.add(topSlab);
    });

    // 6. Foundation Blueprint Grid
    const gridHelper = new THREE.GridHelper(24, 32, 0xe63946, 0x1e293b);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    // 7. Floating Construction Spark / Dust Particle System
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const goldColor = new THREE.Color(0xf4b400);
    const redColor = new THREE.Color(0xe63946);
    const whiteColor = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 1] = Math.random() * 8;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 16;

      const mixChoice = Math.random();
      const col = mixChoice > 0.6 ? goldColor : mixChoice > 0.3 ? redColor : whiteColor;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    geometriesToDispose.push(particleGeo);

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    materialsToDispose.push(particleMat);

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 8. Crane / Compass Structural Mast wireframe
    const craneGeo = new THREE.CylinderGeometry(0.04, 0.04, 8, 8);
    geometriesToDispose.push(craneGeo);
    const craneMat = new THREE.MeshBasicMaterial({ color: 0xf4b400, wireframe: true });
    materialsToDispose.push(craneMat);
    const crane = new THREE.Mesh(craneGeo, craneMat);
    crane.position.set(3, 4, -2.5);
    scene.add(crane);

    const craneArmGeo = new THREE.BoxGeometry(4.5, 0.08, 0.08);
    geometriesToDispose.push(craneArmGeo);
    const craneArm = new THREE.Mesh(craneArmGeo, craneMat);
    craneArm.position.set(2, 7.8, -2.5);
    scene.add(craneArm);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.6;
      targetY = y * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      buildingGroup.rotation.y = elapsedTime * 0.12;
      craneArm.rotation.y = Math.sin(elapsedTime * 0.3) * 0.4;

      // Pulse lights
      goldPointLight.intensity = 2.2 + Math.sin(elapsedTime * 1.5) * 0.6;
      redPointLight.intensity = 2.0 + Math.cos(elapsedTime * 1.8) * 0.5;

      // Float particles
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += 0.004;
        if (positions[i * 3 + 1] > 8) {
          positions[i * 3 + 1] = 0;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Parallax look
      camera.position.x = Math.sin(mouseX) * 3;
      camera.position.y = 4 + mouseY * 2;
      camera.lookAt(0, 2.2, 0);

      renderer.render(scene, camera);
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Safe Cleanup in unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      geometriesToDispose.forEach((geo) => geo.dispose());
      materialsToDispose.forEach((mat) => mat.dispose());
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing overflow-hidden"
      style={{ zIndex: 0 }}
      title="Interactive 3D Architectural Blueprint - Move mouse to rotate angle"
    />
  );
};
