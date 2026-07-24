import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeRadarChartProps {
  selectedDimension?: string;
  isExploded?: boolean;
  onResetView?: () => void;
}

const MODEL_DATA = [
  { name: 'GPT-4 Omni', color: 0x2dd4bf, values: [0.96, 0.94, 0.88, 0.92, 0.95] }, // Veracity, Reasoning, Speed, Factuality, Logic
  { name: 'Claude 3.5', color: 0xa855f7, values: [0.98, 0.98, 0.82, 0.96, 0.97] },
  { name: 'Llama 3 70B', color: 0xf97316, values: [0.89, 0.89, 0.95, 0.84, 0.90] },
  { name: 'Gemini 1.5 Pro', color: 0x3b82f6, values: [0.93, 0.91, 0.90, 0.94, 0.92] },
];

export const ThreeRadarChart: React.FC<ThreeRadarChartProps> = ({
  selectedDimension = 'all',
  isExploded = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const gridLayersRef = useRef<THREE.LineSegments[]>([]);

  // Drag interaction state
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0.3, y: 0.2 });
  const currentRotation = useRef({ x: 0.3, y: 0.2 });
  const explosionFactor = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 380;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 11);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    groupRef.current = mainGroup;

    // Helper: Pentagon Shape
    const createPentagonShape = (radius: number) => {
      const shape = new THREE.Shape();
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      }
      shape.closePath();
      return shape;
    };

    // 2. Grid Concentric Layers
    const gridLayers: THREE.LineSegments[] = [];
    for (let i = 1; i <= 5; i++) {
      const radius = i * 0.75;
      const shape = createPentagonShape(radius);
      const geometry = new THREE.ShapeGeometry(shape);
      const edges = new THREE.EdgesGeometry(geometry);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0x3c4a46, transparent: true, opacity: 0.35 })
      );
      mainGroup.add(line);
      gridLayers.push(line);
    }
    gridLayersRef.current = gridLayers;

    // 3. Axis Radial Lines
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
      const points = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(Math.cos(angle) * 3.8, Math.sin(angle) * 3.8, 0),
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({ color: 0x3c4a46, transparent: true, opacity: 0.3 })
      );
      mainGroup.add(line);
    }

    // 4. Model Data Meshes
    const modelMeshes: THREE.Mesh[] = [];
    MODEL_DATA.forEach((model, idx) => {
      const shape = new THREE.Shape();
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const r = model.values[i] * 3.75;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      }
      shape.closePath();

      const geom = new THREE.ShapeGeometry(shape);
      const mat = new THREE.MeshBasicMaterial({
        color: model.color,
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.z = (idx - 1.5) * 0.15; // subtle offset

      // Wireframe Outline
      const edges = new THREE.EdgesGeometry(geom);
      const wireframe = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: model.color, linewidth: 2 })
      );
      mesh.add(wireframe);

      mainGroup.add(mesh);
      modelMeshes.push(mesh);
    });
    meshesRef.current = modelMeshes;

    // 5. Drag Listeners
    const onMouseDown = (e: MouseEvent | TouchEvent) => {
      isDragging.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePosition.current = { x: clientX, y: clientY };
    };

    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousMousePosition.current.x;
      const deltaY = clientY - previousMousePosition.current.y;

      targetRotation.current.y += deltaX * 0.008;
      targetRotation.current.x += deltaY * 0.008;

      previousMousePosition.current = { x: clientX, y: clientY };
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('touchstart', onMouseDown, { passive: true });
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onMouseMove, { passive: true });
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchend', onMouseUp);

    // 6. Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth Rotation Damping
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.08;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.08;

      if (groupRef.current) {
        groupRef.current.rotation.x = currentRotation.current.x;
        groupRef.current.rotation.y = currentRotation.current.y;
      }

      // Smooth Explosion Damping
      const targetExp = isExploded ? 1 : 0;
      explosionFactor.current += (targetExp - explosionFactor.current) * 0.08;

      meshesRef.current.forEach((mesh, idx) => {
        mesh.position.z = (idx - 1.5) * (0.15 + explosionFactor.current * 1.2);
      });

      gridLayersRef.current.forEach((layer, idx) => {
        layer.position.z = (idx - 2) * explosionFactor.current * 0.5;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('touchstart', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onMouseUp);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isExploded]);

  // Handle Layer Dimension Filtering
  useEffect(() => {
    if (!meshesRef.current) return;
    const dimensionMap: Record<string, number> = {
      veracity: 0,
      reasoning: 1,
      speed: 2,
      factuality: 3,
      logic: 4,
    };

    const targetIdx = dimensionMap[selectedDimension.toLowerCase()];

    meshesRef.current.forEach((mesh, modelIdx) => {
      const material = mesh.material as THREE.MeshBasicMaterial;
      if (targetIdx === undefined || selectedDimension === 'all') {
        material.opacity = 0.25;
      } else {
        // Highlight specific dimension emphasis
        const val = MODEL_DATA[modelIdx].values[targetIdx];
        material.opacity = val > 0.9 ? 0.45 : 0.15;
      }
    });
  }, [selectedDimension]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      {/* Metric Labels Overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 font-code text-[10px] text-[#859490]">
        <div className="text-center font-bold text-[#57f1db] tracking-widest uppercase">VERACITY (Top)</div>
        <div className="flex justify-between items-center w-full px-2">
          <span className="font-bold text-[#57f1db] tracking-widest uppercase">LOGIC</span>
          <span className="font-bold text-[#57f1db] tracking-widest uppercase">REASONING</span>
        </div>
        <div className="flex justify-around items-center w-full">
          <span className="font-bold text-[#57f1db] tracking-widest uppercase">FACTUALITY</span>
          <span className="font-bold text-[#57f1db] tracking-widest uppercase">SPEED</span>
        </div>
      </div>
    </div>
  );
};
