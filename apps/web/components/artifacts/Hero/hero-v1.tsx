"use client";
import React, { useState, useEffect, useRef } from 'react';

// --- Types remain unchanged ---
type TerminalLine = {
  text: string;
  delay: number;
  color: string;
};
type SystemStats = {
  cpu: number;
  memory: number;
  network: {
    in: number;
    out: number;
  };
  processes: string[];
  temperature: number;
  uptime: number;
};
// ----------------------------

// --- Helper Component: BentoBox (Structural Shell) ---
const BentoBox = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <div
      className={`relative p-6 rounded-xl border border-white/10 bg-black/30 backdrop-blur-md transition-all duration-500 hover:border-cyan-500/30 shadow-2xl overflow-hidden
        before:content-[''] before:absolute before:inset-0 before:bg-cyan-500/5 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-10
        ${className}`}
    >
      {children}
    </div>
  );
};
// ----------------------------------------------------


// --- Helper Component: MiniChart (Retained for functionality) ---
const MiniChart = ({ data, color, height = 30, showFill = true }: any) => {
  const maxValue = Math.max(...data) * 1.1;
  const minValue = Math.min(...data) * 0.9;
  const range = maxValue - minValue || 1;
  
  return (
    <svg width="100%" height={height} viewBox="0 0 100 30" preserveAspectRatio="none">
      <defs>
        <filter id={`glow-${color.replace('#', '')}`}>
          <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.4"/>
          <stop offset="100%" stopColor={color} stopOpacity="0.05"/>
        </linearGradient>
      </defs>
      
      <path
        d={`M0,30 ${data.map((value: any, index: any) => {
          const x = (index / (data.length - 1)) * 100;
          const y = 30 - ((value - minValue) / range) * 30;
          return `L${x},${y}`;
        }).join(' ')} L100,30 Z`}
        fill={`url(#gradient-${color.replace('#', '')})`}
        opacity={showFill ? 1 : 0}
      />
      
      <polyline
        points={data.map((value: any, index: any) => {
          const x = (index / (data.length - 1)) * 100;
          const y = 30 - ((value - minValue) / range) * 30;
          return `${x},${y}`;
        }).join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        filter={`url(#glow-${color.replace('#', '')})`}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      <circle
        cx={100}
        cy={30 - ((data[data.length - 1] - minValue) / range) * 30}
        r="1.5"
        fill={color}
        filter={`url(#glow-${color.replace('#', '')})`}
      >
        <animate attributeName="r" values="1.5;2.5;1.5" dur="2s" repeatCount="indefinite"/>
      </circle>
    </svg>
  );
};
// ----------------------------------------------------


// --- Main Hero Component ---
const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [leftTerminalLines, setLeftTerminalLines] = useState<TerminalLine[]>([]);
  const [rightSystemStats, setRightSystemStats] = useState<SystemStats>({
    cpu: 0,
    memory: 0,
    network: { in: 0, out: 0 },
    processes: [],
    temperature: 0,
    uptime: 0,
  });

  const cpuHistoryRef = useRef(new Array(20).fill(0));
  const memoryHistoryRef = useRef(new Array(20).fill(0));
  const networkHistoryRef = useRef({ in: new Array(20).fill(0), out: new Array(20).fill(0) });

  const commandSets = [
    [
      { text: '$ git status', delay: 800, color: '#10b981' },
      { text: 'On branch main', delay: 300, color: '#cbd5e1' },
      { text: '$ npm run build', delay: 1000, color: '#10b981' },
      { text: '✓ Compiled successfully', delay: 600, color: '#22c55e' }
    ],
    [
      { text: '$ tail -f app.log', delay: 800, color: '#10b981' },
      { text: '[INFO] Server started', delay: 400, color: '#3b82f6' },
      { text: '[INFO] DB connected', delay: 300, color: '#22c55e' },
      { text: '[INFO] Ready for requests', delay: 500, color: '#06b6d4' }
    ]
  ];

  const processes = [
    'node server.js',
    'nginx master',
    'postgres main',
    'redis-server',
    'docker daemon',
    'kubectl proxy'
  ];

  // Terminal animation Logic
  useEffect(() => {
    let currentSet = 0;
    let currentCommand = 0;
    let timeoutId: any;

    const executeCommands = () => {
      const commandSet = commandSets[currentSet];
      const command = commandSet[currentCommand];

      setLeftTerminalLines(prev => [...prev, command].slice(-8));

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
  }, []);

  // System stats Logic
  useEffect(() => {
    const updateStats = () => {
      setRightSystemStats((prev) => {
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
          processes: processes.sort(() => 0.5 - Math.random()).slice(0, 4),
          temperature: 45 + Math.random() * 20,
          uptime: prev.uptime + 1
        };
      });
    };

    setRightSystemStats({
      cpu: 45 + Math.random() * 20,
      memory: 60 + Math.random() * 15,
      network: { in: 30 + Math.random() * 20, out: 25 + Math.random() * 15 },
      processes: processes.slice(0, 4),
      temperature: 55,
      uptime: 0
    });

    const interval = setInterval(updateStats, 2000);
    return () => clearInterval(interval);
  }, []);

  // Mouse follow effect
  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      
      <div className="absolute inset-0 z-0 opacity-80" 
           style={{ 
             backgroundImage: 'radial-gradient(ellipse at center, rgba(0, 255, 255, 0.05) 0%, rgba(0, 0, 0, 0.9) 70%)'
           }}
      />
      
      <div
        className="fixed w-64 h-64 rounded-full pointer-events-none z-20 transition-all duration-700 ease-out opacity-15 hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,255,0.2) 0%, rgba(0,255,255,0.05) 50%, transparent 80%)',
          transform: `translate(${mousePosition.x - 128}px, ${mousePosition.y - 128}px)`,
          filter: 'blur(30px)'
        }}
      />

      <div className="relative z-30 min-h-screen px-4 py-16 lg:px-8 lg:py-16 flex items-center justify-center">
        
        <div className="w-full h-full max-w-7xl mx-auto grid gap-6 md:gap-8 
                        lg:grid-cols-6 lg:grid-rows-[1.5fr_1fr_1fr] lg:h-[90vh]">

          <BentoBox className="lg:col-span-4 lg:row-span-2 flex flex-col justify-center items-center text-center">
            <h1 className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tighter mb-4 lg:mb-6">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
                ADNAN
              </span>
            </h1>
            <h2 className="text-xl md:text-3xl font-light tracking-[0.3em] text-cyan-300/90 uppercase mb-8">
              System Architect
            </h2>
            <p className="text-base md:text-lg text-slate-400/80 max-w-xl mx-auto leading-relaxed mb-12">
              Building scalable, high-performance backends and cutting-edge frontend experiences.
            </p>

            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <button className="px-10 py-4 bg-cyan-400 text-black font-bold rounded-lg hover:bg-cyan-300 transition-all duration-300 hover:scale-[1.03] shadow-lg shadow-cyan-500/30">
                Explore Projects
              </button>
              <button className="px-10 py-4 border border-cyan-500/30 text-cyan-300 font-semibold rounded-lg hover:border-cyan-400/80 hover:text-white transition-all duration-300 hover:scale-[1.03]">
                Connect
              </button>
            </div>
          </BentoBox>

          <BentoBox className="lg:col-span-2 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between text-cyan-400 font-mono text-sm mb-4">
                <span> RUNNING: <span className="animate-pulse">PORTFOLIO-V2.1</span></span>
                <span className="text-xs text-green-400">STATUS: OK</span>
            </div>
            <div className="space-y-2 overflow-hidden h-full">
              {leftTerminalLines.map((line, index) => (
                <div key={index} className="font-mono text-xs md:text-sm transition-all duration-500 opacity-90" style={{ color: line.color }}>
                  {line.text}
                </div>
              ))}
            </div>
          </BentoBox>

          <BentoBox className="lg:col-span-1 flex flex-col justify-between">
            <div className="text-cyan-300 font-mono text-sm flex items-center justify-between">
                <span>CPU</span>
                <span className="text-xl font-bold">{Math.round(rightSystemStats.cpu)}%</span>
            </div>
            <div className="h-16 mt-3">
              <MiniChart data={cpuHistoryRef.current} color="#00ffff" height={64} />
            </div>
            <div className="flex justify-between text-xs font-mono text-slate-400/80 mt-2">
                <span>8 cores</span>
                <span>Temp: {Math.round(rightSystemStats.temperature)}°C</span>
            </div>
          </BentoBox>
          
          <BentoBox className="lg:col-span-1 flex flex-col justify-between">
            <div className="text-purple-300 font-mono text-sm flex items-center justify-between">
                <span>MEMORY</span>
                <span className="text-xl font-bold">{Math.round(rightSystemStats.memory)}%</span>
            </div>
            <div className="h-16 mt-3">
              <MiniChart data={memoryHistoryRef.current} color="#a855f7" height={64} />
            </div>
            <div className="flex justify-between text-xs font-mono text-slate-400/80 mt-2">
                <span>{(rightSystemStats.memory * 0.16).toFixed(1)}GB</span>
                <span>/ 16GB used</span>
            </div>
          </BentoBox>

          <BentoBox className="lg:col-span-2">
            <div className="text-green-300 font-mono text-sm mb-4">NETWORK I/O</div>
            <div className="space-y-4">
              <div>
                <div className="text-xs font-mono text-slate-200/90 mb-1 flex items-center justify-between">
                  <span>↓ DOWNLOAD</span>
                  <span className="text-green-300 font-bold">{Math.round(rightSystemStats.network.in)} MB/s</span>
                </div>
                <div className="h-8">
                  <MiniChart data={networkHistoryRef.current.in} color="#22c55e" height={32} showFill={false} />
                </div>
              </div>
              <div>
                <div className="text-xs font-mono text-slate-200/90 mb-1 flex items-center justify-between">
                  <span>↑ UPLOAD</span>
                  <span className="text-green-300 font-bold">{Math.round(rightSystemStats.network.out)} MB/s</span>
                </div>
                <div className="h-8">
                  <MiniChart data={networkHistoryRef.current.out} color="#16a34a" height={32} showFill={false} />
                </div>
              </div>
            </div>
          </BentoBox>

          <BentoBox className="lg:col-span-2">
            <div className="text-yellow-300 font-mono text-sm mb-4">ACTIVE PROCESSES</div>
            <div className="space-y-3">
              {rightSystemStats.processes.map((process, index) => (
                <div key={index} className="flex items-center justify-between text-sm font-mono">
                  <span className="text-slate-200/90 truncate mr-3">{process}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full opacity-80 animate-pulse" />
                    <span className="text-green-300 text-xs">RUNNING</span>
                  </div>
                </div>
              ))}
            </div>
          </BentoBox>

          <BentoBox className="lg:col-span-2 flex flex-col justify-center items-center">
             <div className="text-orange-300 font-mono text-sm mb-3">KEY STACK</div>
             <div className="flex gap-4 opacity-80">
                <span className="text-2xl hover:text-cyan-400 transition">◬ Next.js</span>
                <span className="text-2xl hover:text-cyan-400 transition">🐳 Docker</span>
                <span className="text-2xl hover:text-cyan-400 transition">⚛️ R3F</span>
             </div>
          </BentoBox>
          
        </div>

      </div>

      <div className="absolute top-0 left-0 w-8 h-8 lg:w-12 lg:h-12 border-l border-t border-cyan-500/20 z-40" />
      <div className="absolute top-0 right-0 w-8 h-8 lg:w-12 lg:h-12 border-r border-t border-cyan-500/20 z-40" />
      <div className="absolute bottom-0 left-0 w-8 h-8 lg:w-12 lg:h-12 border-l border-b border-cyan-500/20 z-40" />
      <div className="absolute bottom-0 right-0 w-8 h-8 lg:w-12 lg:h-12 border-r border-b border-cyan-500/20 z-40" />
    </div>
  );
};

export default Hero;