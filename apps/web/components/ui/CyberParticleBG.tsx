'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// 3D Particle Field Component with CAD-style interaction
const ParticleField3D = ({ 
  mousePos, 
  isDragging, 
  dragDelta 
}: { 
  mousePos: { x: number; y: number };
  isDragging: boolean;
  dragDelta: { x: number; y: number };
}) => {
  const particlesRef = useRef<THREE.Points>(null);
  const rotationRef = useRef({ x: 0, y: 0 });
  const count = 1000;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = [];
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
      
      vel.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.015
      });
    }
    
    return [pos, vel];
  }, []);

  useFrame(() => {
    if (!particlesRef.current) return;
    
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] += velocities[i].x * 2;
      positions[i * 3 + 1] += velocities[i].y * 2;
      positions[i * 3 + 2] += velocities[i].z * 2;
      
      if (Math.abs(positions[i * 3]) > 25) velocities[i].x *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 25) velocities[i].y *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 12) velocities[i].z *= -1;
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    
    // CAD-style rotation with drag
    if (isDragging) {
      rotationRef.current.y += dragDelta.x * 0.01;
      rotationRef.current.x += dragDelta.y * 0.01;
    } else {
      // Gentle auto-rotation when not dragging
      rotationRef.current.y += 0.0005;
    }
    
    particlesRef.current.rotation.y = rotationRef.current.y;
    particlesRef.current.rotation.x = rotationRef.current.x;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00ffff"
        transparent
        opacity={isDragging ? 0.6 : 0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// 3D Floating Grid with CAD-style interaction
const FloatingGrid = ({ 
  mousePos, 
  isDragging,
  dragDelta 
}: { 
  mousePos: { x: number; y: number };
  isDragging: boolean;
  dragDelta: { x: number; y: number };
}) => {
  const gridRef = useRef<THREE.Group>(null);
  const rotationRef = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!gridRef.current) return;
    const time = state.clock.getElapsedTime();
    
    if (isDragging) {
      rotationRef.current.x += dragDelta.y * 0.008;
      rotationRef.current.y += dragDelta.x * 0.008;
    } else {
      rotationRef.current.y += 0.003;
    }
    
    gridRef.current.rotation.x = rotationRef.current.x + Math.sin(time * 0.2) * 0.1;
    gridRef.current.rotation.y = rotationRef.current.y;
    gridRef.current.position.y = Math.sin(time * 0.5) * 0.5;
  });

  return (
    <group ref={gridRef} position={[0, -5, -10]}>
      <gridHelper args={[30, 30, '#00ffff', '#a855f7']} />
    </group>
  );
};

// Animated Wireframe Sphere
const WireframeSphere = ({ 
  position, 
  isDragging,
  dragDelta
}: { 
  position: [number, number, number];
  isDragging: boolean;
  dragDelta: { x: number; y: number };
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const rotationRef = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    if (isDragging) {
      rotationRef.current.x += dragDelta.y * 0.015;
      rotationRef.current.y += dragDelta.x * 0.015;
    } else {
      rotationRef.current.x += 0.004;
      rotationRef.current.y += 0.006;
    }
    
    meshRef.current.rotation.x = rotationRef.current.x;
    meshRef.current.rotation.y = rotationRef.current.y;
    meshRef.current.scale.setScalar(1 + Math.sin(time * 3) * 0.15);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshBasicMaterial 
        color="#00ffff" 
        wireframe 
        transparent 
        opacity={isDragging ? 0.35 : 0.2} 
      />
    </mesh>
  );
};

// CAD-style Camera controller with orbit controls
const CameraController = ({ 
  mousePos, 
  isDragging,
  dragDelta,
  zoom
}: { 
  mousePos: { x: number; y: number };
  isDragging: boolean;
  dragDelta: { x: number; y: number };
  zoom: number;
}) => {
  const { camera } = useThree();
  const targetRef = useRef({ x: 0, y: 0, z: 20 });
  
  useFrame(() => {
    if (isDragging) {
      // Orbit-style rotation
      targetRef.current.x += dragDelta.x * 0.05;
      targetRef.current.y += -dragDelta.y * 0.03;
    } else {
      // Smooth return to hover position
      targetRef.current.x += (mousePos.x * 3 - targetRef.current.x) * 0.02;
      targetRef.current.y += (-mousePos.y * 2 - targetRef.current.y) * 0.02;
    }
    
    // Apply zoom
    targetRef.current.z = 20 - zoom * 5;
    
    camera.position.x += (targetRef.current.x - camera.position.x) * 0.1;
    camera.position.y += (targetRef.current.y - camera.position.y) * 0.1;
    camera.position.z += (targetRef.current.z - camera.position.z) * 0.1;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
};

const RenderBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [normalizedMouse, setNormalizedMouse] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragDelta, setDragDelta] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(0);
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  // Mouse tracking with normalization
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setNormalizedMouse({ x, y });

      // CAD-style drag interaction
      if (isDragging) {
        setDragDelta({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        });
        setDragStart({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      setDragDelta({ x: 0, y: 0 });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setDragDelta({ x: 0, y: 0 });
    };

    // CAD-style zoom with Shift + mouse wheel
    const handleWheel = (e: WheelEvent) => {
      if (isShiftPressed) {
        e.preventDefault();
        setZoom((prev) => Math.max(-2, Math.min(2, prev + e.deltaY * 0.001)));
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setIsShiftPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setIsShiftPressed(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isDragging, dragStart, isShiftPressed]);

  return (
    <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
      {/* 3D Canvas Background with CAD-style interaction */}
      <div 
        className="absolute inset-0"
        style={{ 
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
      >
        <Canvas 
          camera={{ position: [0, 0, 20], fov: 75 }}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
          <pointLight position={[-10, -10, -10]} intensity={0.6} color="#a855f7" />
          <pointLight position={[0, 10, 5]} intensity={0.4} color="#22c55e" />
          
          <CameraController 
            mousePos={normalizedMouse} 
            isDragging={isDragging}
            dragDelta={dragDelta}
            zoom={zoom}
          />
          <ParticleField3D 
            mousePos={normalizedMouse} 
            isDragging={isDragging}
            dragDelta={dragDelta}
          />
          <FloatingGrid 
            mousePos={normalizedMouse} 
            isDragging={isDragging}
            dragDelta={dragDelta}
          />
          
          {/* Floating wireframe spheres */}
          <WireframeSphere 
            position={[-8, 3, -5]} 
            isDragging={isDragging}
            dragDelta={dragDelta}
          />
          <WireframeSphere 
            position={[8, -2, -8]} 
            isDragging={isDragging}
            dragDelta={dragDelta}
          />
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-transparent to-black/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
      
      {/* Enhanced interactive cursor glow effect */}
      <div
        className="fixed w-96 h-96 rounded-full pointer-events-none transition-all duration-150 ease-out hidden md:block"
        style={{
          background: isDragging 
            ? 'radial-gradient(circle, rgba(0,255,255,0.7) 0%, rgba(168,85,247,0.5) 40%, transparent 70%)'
            : 'radial-gradient(circle, rgba(0,255,255,0.5) 0%, rgba(168,85,247,0.3) 40%, transparent 70%)',
          transform: `translate(${mousePosition.x - 192}px, ${mousePosition.y - 192}px) scale(${isDragging ? 1.3 : 1 + Math.abs(normalizedMouse.x) * 0.2})`,
          filter: 'blur(60px)',
          opacity: isDragging ? 0.3 : 0.2
        }}
      />

      {/* CAD-style crosshair cursor */}
      {!isDragging && (
        <>
          <div
            className="fixed w-screen h-px pointer-events-none transition-all duration-100 hidden md:block"
            style={{
              top: `${mousePosition.y}px`,
              background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,255,0.3) 48%, rgba(0,255,255,0.6) 50%, rgba(0,255,255,0.3) 52%, transparent 100%)',
              boxShadow: '0 0 10px rgba(0,255,255,0.4)',
            }}
          />
          <div
            className="fixed h-screen w-px pointer-events-none transition-all duration-100 hidden md:block"
            style={{
              left: `${mousePosition.x}px`,
              background: 'linear-gradient(180deg, transparent 0%, rgba(0,255,255,0.3) 48%, rgba(0,255,255,0.6) 50%, rgba(0,255,255,0.3) 52%, transparent 100%)',
              boxShadow: '0 0 10px rgba(0,255,255,0.4)',
            }}
          />
        </>
      )}

      {/* CAD-style corner coordinates */}
      <div className="fixed top-4 left-4 pointer-events-none">
        <div className="font-mono text-xs text-cyan-400/60 space-y-1">
          <div>X: {normalizedMouse.x.toFixed(3)}</div>
          <div>Y: {normalizedMouse.y.toFixed(3)}</div>
          <div>Z: {zoom.toFixed(3)}</div>
        </div>
      </div>

      {/* CAD-style zoom indicator */}
      <div className="fixed bottom-4 right-4 pointer-events-none">
        <div className="font-mono text-xs text-cyan-400/60">
          ZOOM: {((1 - zoom * 0.25) * 100).toFixed(0)}%
        </div>
      </div>

      {/* CAD-style mode indicator */}
      <div className="fixed top-4 right-4 pointer-events-none">
        <div className="font-mono text-xs text-cyan-400/80 px-3 py-1.5 border border-cyan-500/30 bg-black/40 backdrop-blur-sm">
          {isDragging ? '● ORBIT' : isShiftPressed ? '⇧ ZOOM' : '○ VIEW'}
        </div>
      </div>

      {/* Corner decorations with glow effect */}
      <div className="fixed top-0 left-0 w-12 h-12 lg:w-16 lg:h-16 border-l-2 border-t-2 border-cyan-500/30 pointer-events-none" 
           style={{ 
             boxShadow: '-4px -4px 20px rgba(0,255,255,0.2)',
             animation: 'pulse 3s ease-in-out infinite'
           }} />
      <div className="fixed top-0 right-0 w-12 h-12 lg:w-16 lg:h-16 border-r-2 border-t-2 border-cyan-500/30 pointer-events-none" 
           style={{ 
             boxShadow: '4px -4px 20px rgba(0,255,255,0.2)',
             animation: 'pulse 3.2s ease-in-out infinite'
           }} />
      <div className="fixed bottom-0 left-0 w-12 h-12 lg:w-16 lg:h-16 border-l-2 border-b-2 border-cyan-500/30 pointer-events-none" 
           style={{ 
             boxShadow: '-4px 4px 20px rgba(0,255,255,0.2)',
             animation: 'pulse 3.4s ease-in-out infinite'
           }} />
      <div className="fixed bottom-0 right-0 w-12 h-12 lg:w-16 lg:h-16 border-r-2 border-b-2 border-cyan-500/30 pointer-events-none" 
           style={{ 
             boxShadow: '4px 4px 20px rgba(0,255,255,0.2)',
             animation: 'pulse 3.6s ease-in-out infinite'
           }} />

      {/* Tech grid overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: `perspective(500px) rotateX(60deg) translateY(${normalizedMouse.y * 20}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      />
    </div>
  );
};

export default RenderBackground;