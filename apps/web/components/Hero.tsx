"use client";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';

// Types
type TerminalLine = {
  text: string;
  delay: number;
  color: string;
};

type SystemStats = {
  cpu: number;
  memory: number;
  network: { in: number; out: number };
  processes: string[];
  temperature: number;
  uptime: number;
};

// Clean 3D Volumetric Chart
const VolumetricChart = ({ data, color, scale = 1 }: { data: number[]; color: string; scale?: number }) => {
  const tubeRef = useRef<THREE.Mesh>(null);
  const spheresRef = useRef<THREE.InstancedMesh>(null);
  
  const maxValue = Math.max(...data, 1);
  const minValue = Math.min(...data, 0);
  const range = maxValue - minValue || 1;

  const points = useMemo(() => {
    return data.map((value, index) => {
      const x = (index / (data.length - 1)) * 6 - 3;
      const y = ((value - minValue) / range) * 2 - 1;
      const z = Math.sin(index * 0.3) * 0.2;
      return new THREE.Vector3(x * scale, y * scale, z * scale);
    });
  }, [data, minValue, range, scale]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (tubeRef.current) {
      tubeRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;
    }

    if (spheresRef.current) {
      data.forEach((_, i) => {
        const scale = 1 + Math.sin(time * 2 + i * 0.5) * 0.3;
        const matrix = new THREE.Matrix4();
        matrix.makeScale(scale, scale, scale);
        matrix.setPosition(points[i]);
        spheresRef.current!.setMatrixAt(i, matrix);
      });
      spheresRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  const colorObj = new THREE.Color(color);
  const curve = new THREE.CatmullRomCurve3(points);

  return (
    <group>
      {/* Main tube */}
      <mesh ref={tubeRef}>
        <tubeGeometry args={[curve, 64, 0.08, 8, false]} />
        <meshBasicMaterial color={colorObj} transparent opacity={0.6} />
      </mesh>

      {/* Subtle glow */}
      <mesh>
        <tubeGeometry args={[curve, 64, 0.15, 8, false]} />
        <meshBasicMaterial color={colorObj} transparent opacity={0.15} />
      </mesh>

      {/* Data points */}
      <instancedMesh ref={spheresRef} args={[undefined, undefined, data.length]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial 
          color={colorObj} 
          emissive={colorObj}
          emissiveIntensity={0.4}
          transparent 
          opacity={0.85} 
        />
      </instancedMesh>
    </group>
  );
};

// Subtle particle field
const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 500;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = [];
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      vel.push({
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.015,
        z: (Math.random() - 0.5) * 0.01
      });
    }
    
    return [pos, vel];
  }, []);

  useFrame(() => {
    if (!particlesRef.current) return;
    
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] += velocities[i].x;
      positions[i * 3 + 1] += velocities[i].y;
      positions[i * 3 + 2] += velocities[i].z;
      
      if (Math.abs(positions[i * 3]) > 20) velocities[i].x *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 20) velocities[i].y *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 10) velocities[i].z *= -1;
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
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
        size={0.04}
        color="#00ffff"
        transparent
        opacity={0.25}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Enhanced Floating Terminal
const FloatingTerminal = ({ lines }: { lines: TerminalLine[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const elements = containerRef.current.querySelectorAll('.terminal-line');
    
    elements.forEach((el, index) => {
      gsap.fromTo(el,
        { 
          opacity: 0, 
          x: -50,
          filter: 'blur(10px)'
        },
        { 
          opacity: 0.7, 
          x: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power2.out'
        }
      );

      el.addEventListener('mouseenter', () => {
        gsap.to(el, {
          opacity: 1,
          x: 10,
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          opacity: 0.7,
          x: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });
  }, [lines]);

  return (
    <div ref={containerRef} className="absolute left-8 top-1/2 -translate-y-1/2 space-y-3 z-[15] pointer-events-none">
      {lines.map((line, index) => (
        <div
          key={index}
          className="terminal-line font-mono text-base cursor-pointer transition-all"
          style={{ 
            color: line.color,
            textShadow: `0 0 15px ${line.color}40`
          }}
        >
          {line.text}
        </div>
      ))}
    </div>
  );
};

// Floating Metric
const FloatingMetric = ({ 
  label, 
  value, 
  color, 
  position 
}: { 
  label: string; 
  value: number; 
  color: string; 
  position: { top?: string; bottom?: string; left?: string; right?: string };
}) => {
  const metricRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!metricRef.current) return;

    const element = metricRef.current;

    gsap.fromTo(element,
      { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
      { 
        opacity: 1, 
        scale: 1, 
        filter: 'blur(0px)',
        duration: 1,
        ease: 'back.out(1.7)'
      }
    );

    gsap.to(element, {
      y: '+=10',
      duration: 2 + Math.random(),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale: 1.15,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={metricRef}
      className="absolute z-[15] cursor-pointer hidden lg:block pointer-events-auto"
      style={position}
    >
      <div className="relative">
        <div 
          className="absolute inset-0 blur-xl opacity-50"
          style={{ backgroundColor: color }}
        />
        <div className="relative px-4 py-2 rounded-lg backdrop-blur-sm border"
          style={{ 
            borderColor: `${color}40`,
            background: `linear-gradient(135deg, ${color}10, transparent)`
          }}
        >
          <div className="text-xs font-mono opacity-70" style={{ color }}>
            {label}
          </div>
          <div className="text-2xl font-bold font-mono" style={{ color }}>
            {Math.round(value)}%
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Hero Component
const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);
  const [systemStats, setSystemStats] = useState<SystemStats>({
    cpu: 45,
    memory: 60,
    network: { in: 30, out: 25 },
    processes: [],
    temperature: 55,
    uptime: 0
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const cpuHistoryRef = useRef(new Array(20).fill(45));
  const memoryHistoryRef = useRef(new Array(20).fill(60));
  const networkHistoryRef = useRef({ 
    in: new Array(20).fill(30), 
    out: new Array(20).fill(25) 
  });

  const commandSets = useMemo(() => [
    [
      { text: '$ git status', delay: 800, color: '#10b981' },
      { text: 'On branch main', delay: 300, color: '#cbd5e1' },
      { text: '$ npm run build', delay: 1000, color: '#10b981' },
      { text: '✓ Compiled successfully', delay: 600, color: '#22c55e' }
    ],
    [
      { text: '$ docker ps', delay: 800, color: '#10b981' },
      { text: 'CONTAINER ID   STATUS', delay: 400, color: '#06b6d4' },
      { text: 'f2a1c3d5e7   Up 2 hours', delay: 300, color: '#22c55e' }
    ],
    [
      { text: '$ tail -f app.log', delay: 800, color: '#10b981' },
      { text: '[INFO] Server started', delay: 400, color: '#3b82f6' },
      { text: '[INFO] Ready for requests', delay: 500, color: '#06b6d4' }
    ]
  ], []);

  const processes = useMemo(() => [
    'node server.js',
    'nginx master', 
    'postgres main',
    'redis-server',
    'docker daemon',
    'kubectl proxy'
  ], []);

  // Hero entrance animation
  useEffect(() => {
    if (!titleRef.current) return;

    const tl = gsap.timeline();
    
    tl.from(titleRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out'
    })
    .from('.subtitle', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.cta-button', {
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.6,
      ease: 'back.out(1.7)'
    }, '-=0.4');
  }, []);

  // Terminal animation
  useEffect(() => {
    let currentSet = 0;
    let currentCommand = 0;
    let timeoutId: NodeJS.Timeout;

    const executeCommands = () => {
      const commandSet = commandSets[currentSet];
      const command = commandSet[currentCommand];

      setTerminalLines(prev => [...prev, command].slice(-8));

      currentCommand++;
      if (currentCommand >= commandSet.length) {
        currentCommand = 0;
        currentSet = (currentSet + 1) % commandSets.length;
        timeoutId = setTimeout(executeCommands, 2000);
      } else {
        timeoutId = setTimeout(executeCommands, command.delay);
      }
    };

    executeCommands();
    return () => clearTimeout(timeoutId);
  }, [commandSets]);

  // System stats simulation
  useEffect(() => {
    const updateStats = () => {
      setSystemStats(prev => {
        const newCpu = Math.max(15, Math.min(95, prev.cpu + (Math.random() - 0.5) * 25));
        const newMemory = Math.max(25, Math.min(85, prev.memory + (Math.random() - 0.5) * 20));
        const newNetworkIn = Math.max(0, Math.min(100, prev.network.in + (Math.random() - 0.5) * 40));
        const newNetworkOut = Math.max(0, Math.min(100, prev.network.out + (Math.random() - 0.5) * 35));

        cpuHistoryRef.current.push(newCpu);
        cpuHistoryRef.current.shift();
        memoryHistoryRef.current.push(newMemory);
        memoryHistoryRef.current.shift();
        networkHistoryRef.current.in.push(newNetworkIn);
        networkHistoryRef.current.in.shift();
        networkHistoryRef.current.out.push(newNetworkOut);
        networkHistoryRef.current.out.shift();

        return {
          cpu: newCpu,
          memory: newMemory,
          network: { in: newNetworkIn, out: newNetworkOut },
          processes: [...processes].sort(() => 0.5 - Math.random()).slice(0, 4),
          temperature: 45 + Math.random() * 20,
          uptime: prev.uptime + 1
        };
      });
    };

    const interval = setInterval(updateStats, 2000);
    return () => clearInterval(interval);
  }, [processes]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (heroRef.current) {
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        gsap.to(heroRef.current, {
          rotationY: x * 2,
          rotationX: -y * 2,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden" ref={heroRef}>
      {/* ===== BACKGROUND LAYER (z-0 to z-10) ===== */}
      {/* 3D Canvas Background */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <Canvas 
          camera={{ position: [0, 0, 15], fov: 75 }}
          style={{ pointerEvents: 'none' }}
          gl={{ alpha: true }}
        >
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#00ffff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
          
          <ParticleField />
          
          {/* 3D Charts */}
          <group position={[-8, 3, -5]}>
            <VolumetricChart data={cpuHistoryRef.current} color="#00ffff" scale={0.8} />
          </group>
          
          <group position={[8, 2, -5]}>
            <VolumetricChart data={memoryHistoryRef.current} color="#a855f7" scale={0.8} />
          </group>
          
          <group position={[8, -2, -5]}>
            <VolumetricChart data={networkHistoryRef.current.in} color="#22c55e" scale={0.6} />
          </group>
        </Canvas>
      </div>

      {/* Gradient overlay */}
      <div 
        className="fixed inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/60 pointer-events-none" 
        style={{ zIndex: 1 }}
      />
      
      {/* Cursor glow */}
      <div
        className="fixed w-96 h-96 rounded-full pointer-events-none transition-all duration-300 opacity-15 hidden md:block"
        style={{
          zIndex: 2,
          background: 'radial-gradient(circle, rgba(0,255,255,0.2) 0%, rgba(0,255,255,0.08) 40%, transparent 70%)',
          transform: `translate(${mousePosition.x - 192}px, ${mousePosition.y - 192}px)`,
          filter: 'blur(60px)'
        }}
      />

      {/* ===== DECORATIVE LAYER (z-10 to z-20) ===== */}
      {/* Floating terminal */}
      <div style={{ zIndex: 10 }}>
        <FloatingTerminal lines={terminalLines} />
      </div>

      {/* Floating metrics */}
      <div style={{ zIndex: 10 }}>
        <FloatingMetric 
          label="CPU" 
          value={systemStats.cpu} 
          color="#00ffff"
          position={{ top: '20%', right: '8%' }}
        />
        <FloatingMetric 
          label="MEMORY" 
          value={systemStats.memory} 
          color="#a855f7"
          position={{ top: '45%', right: '6%' }}
        />
        <FloatingMetric 
          label="NETWORK" 
          value={systemStats.network.in} 
          color="#22c55e"
          position={{ top: '70%', right: '10%' }}
        />
      </div>

      {/* ===== CONTENT LAYER (z-50+) ===== */}
      {/* Main Content */}
      <div 
        className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8"
        style={{ zIndex: 50, isolation: 'isolate' }}
      >
        
        {/* Status badge */}
        <div className="mb-8 animate-pulse">
          <div className="px-4 py-2 rounded-full bg-cyan-500/10 backdrop-blur-md border border-cyan-500/30">
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
              <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
              <span className="tracking-wider">SYSTEM ONLINE</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 
          ref={titleRef}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight mb-6 text-center"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #00ffff 50%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 80px rgba(0,255,255,0.3)'
          }}
        >
          Adnan
        </h1>
        
        {/* Subtitle */}
        <h2 className="subtitle text-xl sm:text-2xl lg:text-3xl font-light tracking-[0.3em] text-slate-300/90 mb-6 text-center">
          FULL STACK DEVELOPER
        </h2>
        
        {/* Description */}
        <p className="subtitle text-sm sm:text-base lg:text-lg text-slate-400/80 max-w-2xl mx-auto leading-relaxed mb-12 text-center px-4">
          Architecting scalable solutions with cutting-edge technologies
        </p>

        {/* CTAs */}
        <div 
          className="relative flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto px-4 sm:px-0 mb-8"
          style={{ zIndex: 9999, position: 'relative' }}
        >
          <button 
            className="cta-button group relative px-8 sm:px-10 py-3.5 sm:py-4 bg-white text-black font-semibold rounded-md transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20 active:scale-95 cursor-pointer"
            onClick={() => alert('Portfolio clicked!')}
            style={{ opacity: 1, visibility: 'visible' }}
          >
            <span className="relative flex items-center justify-center gap-2 text-sm sm:text-base">
              View Portfolio
              <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </button>
          
          <button 
            className="cta-button group relative px-8 sm:px-10 py-3.5 sm:py-4 bg-transparent text-cyan-300 font-semibold rounded-md border-2 border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:border-cyan-400/60 hover:bg-cyan-500/10 backdrop-blur-sm active:scale-95 cursor-pointer"
            onClick={() => alert('Build Together clicked!')}
            style={{ opacity: 1, visibility: 'visible' }}
          >
            <span className="relative flex items-center justify-center gap-2 text-sm sm:text-base">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
              Build Together
            </span>
            <div className="absolute inset-0 border border-cyan-400/0 group-hover:border-cyan-400/40 rounded-md transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]" />
          </button>
        </div>

        {/* Mobile metrics */}
        <div className="lg:hidden mt-16 grid grid-cols-3 gap-3 w-full max-w-md px-4">
          <div 
            className="p-3 sm:p-4 rounded-xl backdrop-blur-sm border border-cyan-500/20"
            style={{ background: 'linear-gradient(135deg, rgba(0,255,255,0.1), transparent)' }}
          >
            <div className="text-xs font-mono text-cyan-400 mb-1">CPU</div>
            <div className="text-xl sm:text-2xl font-bold text-white">{Math.round(systemStats.cpu)}%</div>
          </div>
          <div 
            className="p-3 sm:p-4 rounded-xl backdrop-blur-sm border border-purple-500/20"
            style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.1), transparent)' }}
          >
            <div className="text-xs font-mono text-purple-400 mb-1">MEM</div>
            <div className="text-xl sm:text-2xl font-bold text-white">{Math.round(systemStats.memory)}%</div>
          </div>
          <div 
            className="p-3 sm:p-4 rounded-xl backdrop-blur-sm border border-green-500/20"
            style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.1), transparent)' }}
          >
            <div className="text-xs font-mono text-green-400 mb-1">NET</div>
            <div className="text-xl sm:text-2xl font-bold text-white">{Math.round(systemStats.network.in)}</div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 text-slate-500/60">
          <span className="text-xs font-mono tracking-wider">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-slate-500/60 to-transparent animate-pulse" />
        </div>
      </div>

      {/* ===== DECORATIVE CORNERS (z-5) ===== */}
      {/* Corner decorations - BELOW content layer */}
      <div className="fixed top-0 left-0 w-12 h-12 lg:w-16 lg:h-16 border-l-2 border-t-2 border-cyan-500/30 pointer-events-none" style={{ zIndex: 5 }} />
      <div className="fixed top-0 right-0 w-12 h-12 lg:w-16 lg:h-16 border-r-2 border-t-2 border-cyan-500/30 pointer-events-none" style={{ zIndex: 5 }} />
      <div className="fixed bottom-0 left-0 w-12 h-12 lg:w-16 lg:h-16 border-l-2 border-b-2 border-cyan-500/30 pointer-events-none" style={{ zIndex: 5 }} />
      <div className="fixed bottom-0 right-0 w-12 h-12 lg:w-16 lg:h-16 border-r-2 border-b-2 border-cyan-500/30 pointer-events-none" style={{ zIndex: 5 }} />
    </div>
  );
};

export default Hero;