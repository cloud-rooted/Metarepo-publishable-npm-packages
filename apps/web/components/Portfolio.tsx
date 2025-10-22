"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
  SiNextdotjs,
  SiPrisma,
  SiTypescript,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiCloudflare,
  SiSupabase,
  SiC,
  SiGooglecloud,
  SiBlockchaindotcom,
  SiBlender,
  SiApachekafka,
  SiGithub,
} from "react-icons/si";
import {
  FaServer,
  FaDatabase,
  FaReact,
  FaNode,
  FaCode,
  FaJava,
  FaPython,
  FaBook,
  FaDocker,
} from "react-icons/fa";
import { MdApi } from "react-icons/md";
import { GiBrain, GiJetFighter } from "react-icons/gi";
import { BiGitBranch } from "react-icons/bi";

// Advanced Sci-Fi Sound System with Realistic Effects
const useSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = () => {
    if (!audioContextRef.current && typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  // Sci-fi tech selection sound (like energy shield activation)
  const playSelect = () => {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Create complex sound with multiple oscillators
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    const gain2 = ctx.createGain();
    const masterGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(filter);
    gain2.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    osc1.type = 'sine';
    osc2.type = 'sine';
    filter.type = 'bandpass';
    filter.frequency.value = 1500;
    filter.Q.value = 5;

    // Deep bass with harmonic
    osc1.frequency.setValueAtTime(150, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.12);
    osc2.frequency.setValueAtTime(450, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.12);
    
    gain1.gain.setValueAtTime(0.2, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
    gain2.gain.setValueAtTime(0.15, ctx.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
    masterGain.gain.setValueAtTime(0.3, ctx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

    osc1.start(ctx.currentTime);
    osc2.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.12);
    osc2.stop(ctx.currentTime + 0.12);
  };

  // Sci-fi hover sound (like radar ping)
  const playHover = () => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    filter.type = 'bandpass';
    filter.frequency.value = 2000;
    filter.Q.value = 10;
    
    osc.frequency.setValueAtTime(1800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(2200, ctx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  };

  // Sci-fi inspect sound (like holographic display activation)
  const playInspect = () => {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Multi-layered activation sound
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    const gain2 = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(filter);
    gain2.connect(filter);
    filter.connect(ctx.destination);

    osc1.type = 'sine';
    osc2.type = 'triangle';
    filter.type = 'lowpass';
    filter.frequency.value = 3000;

    osc1.frequency.setValueAtTime(300, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.25);
    osc2.frequency.setValueAtTime(600, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.25);
    
    gain1.gain.setValueAtTime(0.2, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
    gain2.gain.setValueAtTime(0.1, ctx.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

    osc1.start(ctx.currentTime);
    osc2.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.25);
    osc2.stop(ctx.currentTime + 0.25);
  };

  // Sci-fi category switch (like computer interface beep)
  const playCategorySwitch = () => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    filter.type = 'bandpass';
    filter.frequency.value = 1200;
    filter.Q.value = 8;

    osc.frequency.setValueAtTime(1000, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.08);
    
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
  };

  return {
    playSelect,
    playHover,
    playInspect,
    playCategorySwitch
  };
};

const skills = {
  frontend: [
    { name: "React", icon: <FaReact />, level: 93, rarity: "legendary" },
    { name: "Next.js", icon: <SiNextdotjs />, level: 94, rarity: "legendary" },
    { name: "TypeScript", icon: <SiTypescript />, level: 78, rarity: "epic" },
    { name: "JavaScript", icon: <SiJavascript />, level: 87, rarity: "epic" },
    { name: "HTML/CSS", icon: <FaCode />, level: 80, rarity: "epic" },
    { name: "TailwindCSS", icon: <SiTailwindcss />, level: 90, rarity: "legendary" },
  ],
  backend: [
    { name: "Node.js", icon: <FaNode />, level: 70, rarity: "rare" },
    { name: "BunJS", icon: "🧄", level: 95, rarity: "legendary" },
    { name: "HonoJS", icon: "🔥", level: 87, rarity: "epic" },
    { name: "Elysia", icon: "🏝️", level: 60, rarity: "rare" },
    { name: "Java", icon: <FaJava />, level: 24, rarity: "common" },
    { name: "Python", icon: <FaPython />, level: 90, rarity: "legendary" },
    { name: "C", icon: <SiC />, level: 85, rarity: "epic" },
  ],
  database: [
    { name: "MongoDB", icon: <SiMongodb />, level: 75, rarity: "epic" },
    { name: "D1 Database", icon: <SiCloudflare />, level: 95, rarity: "legendary" },
    { name: "Supabase", icon: <SiSupabase />, level: 85, rarity: "epic" },
    { name: "NeonDB", icon: <SiPostgresql />, level: 60, rarity: "rare" },
    { name: "Drizzle ORM", icon: <FaDatabase />, level: 95, rarity: "legendary" },
    { name: "Prisma ORM", icon: <SiPrisma />, level: 55, rarity: "rare" },
  ],
  infrastructure: [
    { name: "Cloudflare", icon: <SiCloudflare />, level: 90, rarity: "legendary" },
    { name: "Docker", icon: <FaDocker />, level: 82, rarity: "epic" },
    { name: "Redis", icon: <FaServer />, level: 75, rarity: "epic" },
    { name: "GitHub Actions", icon: <SiGithub />, level: 86, rarity: "epic" },
    { name: "CI/CD Pipelines", icon: <BiGitBranch />, level: 74, rarity: "rare" },
    { name: "Apache Kafka", icon: <SiApachekafka />, level: 58, rarity: "rare" },
    { name: "Google Cloud", icon: <SiGooglecloud />, level: 40, rarity: "common" },
    { name: "API Development", icon: <MdApi />, level: 95, rarity: "legendary" },
    { name: "Blockchain", icon: <SiBlockchaindotcom />, level: 40, rarity: "common" },
    { name: "AI Integration", icon: <GiBrain />, level: 75, rarity: "epic" },
    { name: "Web Hosting", icon: <FaServer />, level: 90, rarity: "legendary" },
  ],
  ai_ml: [
    { name: "RAG Systems", icon: <GiBrain />, level: 85, rarity: "epic" },
    { name: "LangChain", icon: "🦜", level: 80, rarity: "epic" },
    { name: "Deep Learning", icon: <GiBrain />, level: 75, rarity: "epic" },
    { name: "NLTK", icon: <FaBook />, level: 78, rarity: "epic" },
    { name: "ML Algorithms", icon: <GiBrain />, level: 82, rarity: "epic" },
    { name: "Python Desktop Apps", icon: <FaPython />, level: 88, rarity: "legendary" },
  ],
  devtools: [
    { name: "Terminal/CLI", icon: "💻", level: 92, rarity: "legendary" },
    { name: "Git", icon: <BiGitBranch />, level: 90, rarity: "legendary" },
    { name: "VS Code", icon: <FaCode />, level: 95, rarity: "legendary" },
    { name: "Blender", icon: <SiBlender />, level: 45, rarity: "common" },
  ],
};

const rarityColors = {
  legendary: {
    border: "border-yellow-500/30",
    bg: "bg-yellow-500/5",
    text: "text-yellow-400",
    glow: "shadow-yellow-500/20",
    progressBg: "bg-yellow-500/10",
    progressBar: "bg-gradient-to-r from-yellow-600/80 to-yellow-400/80",
  },
  epic: {
    border: "border-purple-500/30",
    bg: "bg-purple-500/5",
    text: "text-purple-400",
    glow: "shadow-purple-500/20",
    progressBg: "bg-purple-500/10",
    progressBar: "bg-gradient-to-r from-purple-600/80 to-purple-400/80",
  },
  rare: {
    border: "border-blue-500/30",
    bg: "bg-blue-500/5",
    text: "text-blue-400",
    glow: "shadow-blue-500/20",
    progressBg: "bg-blue-500/10",
    progressBar: "bg-gradient-to-r from-blue-600/80 to-blue-400/80",
  },
  common: {
    border: "border-gray-500/30",
    bg: "bg-gray-500/5",
    text: "text-gray-400",
    glow: "shadow-gray-500/20",
    progressBg: "bg-gray-500/10",
    progressBar: "bg-gradient-to-r from-gray-600/80 to-gray-400/80",
  },
};

// Tech Arsenal Card with 3D View (No Equip Logic - Portfolio Display)
const WeaponCard = ({ skill, index, onSelect, isSelected }: { skill: any; index: number; onSelect: () => void; isSelected: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState(0);
  const colors = rarityColors[skill.rarity as keyof typeof rarityColors];
  const sound = useSound();
  const rotationInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isSelected) {
      // Auto-rotate when selected
      rotationInterval.current = setInterval(() => {
        setRotation(prev => (prev + 2) % 360);
      }, 30);
    } else {
      if (rotationInterval.current) {
        clearInterval(rotationInterval.current);
      }
      setRotation(0);
    }
    return () => {
      if (rotationInterval.current) clearInterval(rotationInterval.current);
    };
  }, [isSelected]);

  const handleClick = () => {
    sound.playSelect();
    onSelect();
  };

  const handleHover = () => {
    sound.playHover();
    setIsHovered(true);
  };

  return (
    <div
      className={`group relative transform cursor-pointer rounded-xl border backdrop-blur-sm transition-all duration-300 ${
        isSelected 
          ? `scale-105 ${colors.border} ${colors.bg} shadow-lg z-20` 
          : isHovered 
            ? `scale-102 ${colors.border} ${colors.bg} shadow-md` 
            : `${colors.border} ${colors.bg} hover:scale-102`
      }`}
      onClick={handleClick}
      onMouseEnter={handleHover}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      <div className="relative p-5">
        {/* Rarity Badge */}
        <div className={`absolute -right-2 -top-2 rounded-full border ${colors.border} bg-black px-2 py-1 text-xs font-bold uppercase ${colors.text} z-10`}>
          {skill.rarity}
        </div>

        {/* Viewing Indicator */}
        {isSelected && (
          <div className="absolute -left-2 -top-2 rounded-full border border-cyan-500/50 bg-cyan-500/10 px-2 py-1 text-xs font-bold uppercase text-cyan-400 z-10">
            VIEWING
          </div>
        )}

        {/* Subtle corner accents */}
        <div className={`absolute left-0 top-0 h-3 w-3 border-l border-t ${colors.border} opacity-0 transition-opacity ${isHovered || isSelected ? 'opacity-50' : ''}`} />
        <div className={`absolute right-0 top-0 h-3 w-3 border-r border-t ${colors.border} opacity-0 transition-opacity ${isHovered || isSelected ? 'opacity-50' : ''}`} />
        <div className={`absolute bottom-0 left-0 h-3 w-3 border-b border-l ${colors.border} opacity-0 transition-opacity ${isHovered || isSelected ? 'opacity-50' : ''}`} />
        <div className={`absolute bottom-0 right-0 h-3 w-3 border-b border-r ${colors.border} opacity-0 transition-opacity ${isHovered || isSelected ? 'opacity-50' : ''}`} />

        {/* 3D Rotating Icon */}
        <div 
          className={`mb-4 flex items-center justify-center text-6xl ${colors.text} transition-all duration-300`}
          style={{
            transform: `perspective(1000px) rotateY(${rotation}deg) ${isHovered || isSelected ? 'scale(1.15)' : 'scale(1)'}`,
            filter: isSelected ? 'drop-shadow(0 0 8px currentColor)' : isHovered ? 'drop-shadow(0 0 4px currentColor)' : 'none',
          }}
        >
          {skill.icon}
        </div>

        {/* Tech Name */}
        <h4 className={`mb-3 text-center font-mono text-sm font-bold uppercase transition-colors ${isSelected ? 'text-cyan-400' : 'text-white'}`}>
          {skill.name}
        </h4>

        {/* Level Display */}
        <div className="mb-2 flex items-center justify-between font-mono text-xs">
          <span className="text-gray-400">LVL</span>
          <span className={`font-bold ${colors.text}`}>{skill.level}</span>
        </div>

        {/* Progress Bar */}
        <div className={`relative h-2 w-full overflow-hidden rounded-full ${colors.progressBg}`}>
          <div
            className={`h-full ${colors.progressBar} transition-all duration-1000 ease-out relative`}
            style={{
              width: isHovered || isSelected ? `${skill.level}%` : '0%',
            }}
          >
            {/* Subtle shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* Stats Display */}
        {(isHovered || isSelected) && (
          <div className={`mt-3 rounded border ${colors.border} bg-black/60 p-2 text-center font-mono text-xs transition-all duration-300 animate-fadeIn`}>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <div className="text-gray-400">XP</div>
                <div className={colors.text}>{skill.level * 100}</div>
              </div>
              <div>
                <div className="text-gray-400">PWR</div>
                <div className={colors.text}>{Math.floor(skill.level * 1.2)}</div>
              </div>
              <div>
                <div className="text-gray-400">EFF</div>
                <div className={colors.text}>{Math.min(99, skill.level + 5)}%</div>
              </div>
            </div>
          </div>
        )}

        {/* Inspect Prompt */}
        {isHovered && !isSelected && (
          <div className="mt-2 text-center font-mono text-xs text-cyan-400/70">
            [CLICK TO VIEW]
          </div>
        )}

        {/* Selected Prompt */}
        {isSelected && (
          <div className="mt-2 text-center font-mono text-xs text-cyan-400">
            [PRESS I TO INSPECT]
          </div>
        )}
      </div>
    </div>
  );
};

const CategoryTab = ({ category, isActive, onClick, icon }: any) => {
  const sound = useSound();
  
  const handleClick = () => {
    sound.playCategorySwitch();
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => !isActive && sound.playHover()}
      className={`group relative flex items-center gap-3 rounded-lg border-2 px-6 py-4 font-mono text-sm font-bold uppercase transition-all duration-300 ${
        isActive
          ? 'border-cyan-500 bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/50 scale-105'
          : 'border-cyan-500/20 bg-black/40 text-gray-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-300 hover:scale-105'
      }`}
    >
      <span className="text-2xl">{icon}</span>
      <span>{category}</span>
      {isActive && (
        <>
          <div className="absolute -right-1 -top-1 h-3 w-3 animate-ping rounded-full bg-cyan-400" />
          <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-cyan-400" />
        </>
      )}
    </button>
  );
};

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [selectedWeapon, setSelectedWeapon] = useState<any>(null);
  const [inspectMode, setInspectMode] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const sound = useSound();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const categories = {
    frontend: { icon: '⚔️', label: 'FRONTEND' },
    backend: { icon: '🛡️', label: 'BACKEND' },
    database: { icon: '💾', label: 'DATABASE' },
    infrastructure: { icon: '🚀', label: 'INFRASTRUCTURE' },
    ai_ml: { icon: '🧠', label: 'AI/ML' },
    devtools: { icon: '🔧', label: 'DEV TOOLS' },
  };

  // Background music control with persistent state
  useEffect(() => {
    if (typeof window !== 'undefined' && !audioRef.current) {
      audioRef.current = new Audio('/call_of_duty.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.15; // Low ambient volume
      
      // Auto-play on first user interaction
      const startMusic = () => {
        if (audioRef.current && !isMusicPlaying) {
          audioRef.current.play().then(() => {
            setIsMusicPlaying(true);
          }).catch(() => {
            // Ignore autoplay errors
          });
        }
      };

      // Start music on any user interaction
      document.addEventListener('click', startMusic, { once: true });
      
      return () => {
        document.removeEventListener('click', startMusic);
      };
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      } else {
        audioRef.current.play();
        setIsMusicPlaying(true);
      }
    }
  };

  // Keyboard controls for inspect mode
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'i' && selectedWeapon) {
        sound.playInspect();
        setInspectMode(true);
      }
      if (e.key === 'Escape' && inspectMode) {
        setInspectMode(false);
      }
      // Toggle music with 'M' key
      if (e.key.toLowerCase() === 'm') {
        toggleMusic();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedWeapon, inspectMode, sound, isMusicPlaying]);

  return (
    <div className="relative min-h-screen w-full">
      {/* Music Control Button - Responsive */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border-2 border-cyan-500/50 bg-black/80 backdrop-blur-sm transition-all hover:scale-110 hover:border-cyan-500 hover:bg-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/50 active:scale-95"
        title={isMusicPlaying ? 'Press M to Mute' : 'Press M to Play Music'}
        aria-label={isMusicPlaying ? 'Mute Music' : 'Play Music'}
      >
        {!isMusicPlaying ? (
          <svg className="h-5 w-5 md:h-6 md:w-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="h-5 w-5 md:h-6 md:w-6 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
          </svg>
        )}
      </button>
      
      {/* Hero Section */}
      <div className="relative z-10 min-h-screen bg-transparent">
        <div className="container mx-auto px-6 py-24 lg:px-12">
          
          {/* Story Section - The Origin */}
          <div className="mx-auto mt-32 max-w-5xl">
            <div className="mb-16 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
              <h2 className="font-mono text-sm tracking-widest text-cyan-400">THE ORIGIN STORY</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
            </div>

            <div className="space-y-12">
              {/* Chapter 1 */}
              <div className="group relative rounded-2xl border border-cyan-500/10 bg-black/40 p-8 backdrop-blur-sm transition-all hover:border-cyan-500/30 lg:p-12">
                <div className="absolute -left-4 top-8 flex h-8 w-8 items-center justify-center rounded-full border-2 border-cyan-500 bg-black font-mono text-xs text-cyan-400">
                  01
                </div>
                <h3 className="mb-6 text-2xl font-bold text-white lg:text-3xl">
                  The Hardware Prodigy
                </h3>
                <p className="leading-relaxed text-gray-300 lg:text-lg">
                  It all began at <span className="font-semibold text-cyan-400">ten years old</span>, armed with nothing but curiosity 
                  and a screwdriver. While other kids played video games, I was dismantling them. Home electronic circuits became 
                  my playground—building, experimenting, occasionally blowing fuses (much to my parents` dismay). Some devices came 
                  back to life under my hands; others... well, let`s just say they contributed to my education in spectacular fashion. 
                  Every spark, every failed circuit, every triumphant LED that finally blinked to life—these were my first lessons 
                  in <span className="font-semibold text-purple-400">problem-solving and persistence</span>.
                </p>
              </div>

              {/* Chapter 2 */}
              <div className="group relative rounded-2xl border border-purple-500/10 bg-black/40 p-8 backdrop-blur-sm transition-all hover:border-purple-500/30 lg:p-12">
                <div className="absolute -left-4 top-8 flex h-8 w-8 items-center justify-center rounded-full border-2 border-purple-500 bg-black font-mono text-xs text-purple-400">
                  02
                </div>
                <h3 className="mb-6 text-2xl font-bold text-white lg:text-3xl">
                  The Software Awakening
                </h3>
                <p className="leading-relaxed text-gray-300 lg:text-lg">
                  At <span className="font-semibold text-purple-400">fifteen</span>, something shifted. Hardware was fascinating, 
                  but I craved something more—something that could think, learn, adapt. Robots captured my imagination, and suddenly 
                  I needed to understand the invisible force that breathed life into silicon and steel: <span className="font-semibold text-cyan-400">code</span>. 
                  I dove headfirst into software, treating it like I did those early circuits—breaking things, fixing them, 
                  learning why they broke in the first place. Every bug was a puzzle. Every working feature was a victory. 
                  The transition from hardware to software wasn`t a departure; it was an evolution.
                </p>
              </div>

              {/* Chapter 3 */}
              <div className="group relative rounded-2xl border border-cyan-500/10 bg-black/40 p-8 backdrop-blur-sm transition-all hover:border-cyan-500/30 lg:p-12">
                <div className="absolute -left-4 top-8 flex h-8 w-8 items-center justify-center rounded-full border-2 border-cyan-500 bg-black font-mono text-xs text-cyan-400">
                  03
                </div>
                <h3 className="mb-6 text-2xl font-bold text-white lg:text-3xl">
                  The Curious Engineer
                </h3>
                <p className="leading-relaxed text-gray-300 lg:text-lg">
                  Today, I`m that same curious kid—just with better tools and bigger challenges. I`ve graduated from blown fuses 
                  to <span className="font-semibold text-purple-400">production systems</span> that serve real users. I build, 
                  experiment, debug, deploy, and yes, occasionally break things (but now with proper rollback strategies). My 
                  playground has expanded to include <span className="font-semibold text-cyan-400">AI/ML algorithms, distributed 
                  systems, microservices, DevOps pipelines</span>, and everything in between. I architect backends, optimize 
                  costs, manage monorepos, configure deployments, and research endlessly. Every project is an experiment. 
                  Every deployment is a lesson. And just like that ten-year-old taking apart electronics, I`m still driven by 
                  one fundamental question: <span className="italic text-white">`How does this work—and how can I make it better?`</span>
                </p>
              </div>
            </div>
          </div>

          {/* Tech Arsenal Section - COD Style */}
          <div className="mx-auto mt-32 max-w-7xl">
            <div className="mb-16 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
              <h2 className="flex items-center gap-3 font-mono text-sm tracking-widest text-yellow-400">
                <GiJetFighter className="text-2xl" />
                TECH ARSENAL
                <GiJetFighter className="text-2xl" />
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
            </div>

            {/* HUD Header */}
            <div className="mb-8 rounded-xl border-2 border-cyan-500/30 bg-black/60 p-6 backdrop-blur-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-cyan-500 bg-cyan-500/10">
                    <span className="text-3xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">LOADOUT SELECTION</h3>
                    <p className="font-mono text-sm text-cyan-400">Select category to view arsenal</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-gray-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                  </span>
                  ALL SYSTEMS ONLINE
                </div>
              </div>
            </div>

            {/* Category Tabs - Weapon Selection */}
            <div className="mb-8 flex flex-wrap gap-4">
              {Object.entries(categories).map(([key, value]) => (
                <CategoryTab
                  key={key}
                  category={value.label}
                  icon={value.icon}
                  isActive={activeCategory === key}
                  onClick={() => setActiveCategory(key)}
                />
              ))}
            </div>

            {/* Skills Grid - Weapon Cards */}
            <div className="rounded-2xl border-2 border-cyan-500/20 bg-black/40 p-8 backdrop-blur-sm">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-mono text-lg font-bold uppercase text-white">
                  {categories[activeCategory as keyof typeof categories].icon}{' '}
                  {categories[activeCategory as keyof typeof categories].label} ARSENAL
                </h3>
                <div className="font-mono text-sm text-gray-400">
                  {skills[activeCategory as keyof typeof skills].length} WEAPONS
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {skills[activeCategory as keyof typeof skills].map((skill, index) => (
                  <WeaponCard 
                    key={`${activeCategory}-${skill.name}`}
                    skill={skill} 
                    index={index}
                    onSelect={() => setSelectedWeapon(skill)}
                    isSelected={selectedWeapon?.name === skill.name}
                  />
                ))}
              </div>
            </div>

            {/* Stats Summary */}
            <div className="mt-8 grid gap-4 md:grid-cols-4">
              <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4 text-center backdrop-blur-sm">
                <div className="mb-2 text-3xl">🏆</div>
                <div className="font-mono text-2xl font-bold text-yellow-400">
                  {skills[activeCategory as keyof typeof skills].filter(s => s.rarity === 'legendary').length}
                </div>
                <div className="text-xs text-gray-400">LEGENDARY</div>
              </div>
              <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-4 text-center backdrop-blur-sm">
                <div className="mb-2 text-3xl">💎</div>
                <div className="font-mono text-2xl font-bold text-purple-400">
                  {skills[activeCategory as keyof typeof skills].filter(s => s.rarity === 'epic').length}
                </div>
                <div className="text-xs text-gray-400">EPIC</div>
              </div>
              <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4 text-center backdrop-blur-sm">
                <div className="mb-2 text-3xl">⭐</div>
                <div className="font-mono text-2xl font-bold text-blue-400">
                  {skills[activeCategory as keyof typeof skills].filter(s => s.rarity === 'rare').length}
                </div>
                <div className="text-xs text-gray-400">RARE</div>
              </div>
              <div className="rounded-lg border border-gray-500/30 bg-gray-500/5 p-4 text-center backdrop-blur-sm">
                <div className="mb-2 text-3xl">🎯</div>
                <div className="font-mono text-2xl font-bold text-gray-400">
                  {Math.round(skills[activeCategory as keyof typeof skills].reduce((acc, s) => acc + s.level, 0) / skills[activeCategory as keyof typeof skills].length)}
                </div>
                <div className="text-xs text-gray-400">AVG LEVEL</div>
              </div>
            </div>
          </div>

          {/* Tech Inspect Modal - Responsive */}
          {inspectMode && selectedWeapon && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-fadeIn p-4 overflow-y-auto">
              <div className="relative max-w-4xl w-full my-8">
                <button
                  onClick={() => setInspectMode(false)}
                  className="absolute -top-8 md:-top-12 right-0 text-gray-400 hover:text-white transition-colors font-mono text-xs md:text-sm"
                >
                  [ESC] CLOSE
                </button>

                <div className="relative rounded-2xl border-2 border-cyan-500/50 bg-black/80 p-4 md:p-8 backdrop-blur-sm">
                  <div className="absolute -inset-1 animate-pulse rounded-2xl bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-cyan-500/30 blur-sm" />
                  
                  <div className="relative">
                    <div className="mb-6 md:mb-8 text-center">
                      <h2 className="text-2xl md:text-4xl font-bold text-cyan-400 mb-2 font-mono">TECH INSPECTION</h2>
                      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                      <div className="flex items-center justify-center">
                        <div 
                          className="text-[120px] md:text-[200px] animate-[spin_10s_linear_infinite]"
                          style={{
                            filter: 'drop-shadow(0 0 20px currentColor)',
                            color: rarityColors[selectedWeapon.rarity as keyof typeof rarityColors].text.replace('text-', ''),
                          }}
                        >
                          {selectedWeapon.icon}
                        </div>
                      </div>

                      <div className="space-y-4 md:space-y-6">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{selectedWeapon.name}</h3>
                          <div className={`inline-block px-2 md:px-3 py-1 rounded-full border-2 ${rarityColors[selectedWeapon.rarity as keyof typeof rarityColors].border} ${rarityColors[selectedWeapon.rarity as keyof typeof rarityColors].bg} ${rarityColors[selectedWeapon.rarity as keyof typeof rarityColors].text} font-mono text-xs md:text-sm font-bold uppercase`}>
                            {selectedWeapon.rarity}
                          </div>
                        </div>

                        <div className="space-y-3 md:space-y-4 font-mono">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm md:text-base">LEVEL</span>
                            <span className="text-xl md:text-2xl font-bold text-cyan-400">{selectedWeapon.level}</span>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-2 text-sm md:text-base">
                              <span className="text-gray-400">EXPERIENCE</span>
                              <span className="text-cyan-400">{selectedWeapon.level * 100} XP</span>
                            </div>
                            <div className="h-2 md:h-3 bg-gray-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 animate-pulse"
                                style={{ width: `${selectedWeapon.level}%` }}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 md:gap-4 pt-2 md:pt-4">
                            <div className="border border-cyan-500/30 bg-cyan-500/10 p-2 md:p-3 rounded-lg">
                              <div className="text-gray-400 text-xs mb-1">POWER</div>
                              <div className="text-lg md:text-2xl font-bold text-cyan-400">{Math.floor(selectedWeapon.level * 1.2)}</div>
                            </div>
                            <div className="border border-purple-500/30 bg-purple-500/10 p-2 md:p-3 rounded-lg">
                              <div className="text-gray-400 text-xs mb-1">EFFICIENCY</div>
                              <div className="text-lg md:text-2xl font-bold text-purple-400">{Math.min(99, selectedWeapon.level + 5)}%</div>
                            </div>
                            <div className="border border-yellow-500/30 bg-yellow-500/10 p-2 md:p-3 rounded-lg">
                              <div className="text-gray-400 text-xs mb-1">SCOPE</div>
                              <div className="text-lg md:text-2xl font-bold text-yellow-400">{Math.floor(selectedWeapon.level * 0.8)}</div>
                            </div>
                            <div className="border border-green-500/30 bg-green-500/10 p-2 md:p-3 rounded-lg">
                              <div className="text-gray-400 text-xs mb-1">SPEED</div>
                              <div className="text-lg md:text-2xl font-bold text-green-400">{Math.floor(selectedWeapon.level * 0.9)}</div>
                            </div>
                          </div>

                          <div className="pt-3 md:pt-4">
                            <div className="text-gray-400 text-xs md:text-sm mb-2">FEATURES</div>
                            <div className="space-y-1.5 md:space-y-2">
                              <div className="flex items-center gap-2 text-xs md:text-sm">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                                <span className="text-gray-300">Performance Optimized</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs md:text-sm">
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                                <span className="text-gray-300">Production Ready</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs md:text-sm">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                                <span className="text-gray-300">Scalable Architecture</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                      <button 
                        onClick={() => setInspectMode(false)}
                        className="px-4 md:px-6 py-2 md:py-3 border-2 border-cyan-500 bg-cyan-500/20 text-cyan-400 rounded-lg font-mono text-sm md:text-base font-bold hover:bg-cyan-500/30 transition-all hover:scale-105 active:scale-95"
                      >
                        CLOSE INSPECTION
                      </button>
                      <button 
                        onClick={() => setInspectMode(false)}
                        className="px-4 md:px-6 py-2 md:py-3 border-2 border-gray-500 bg-gray-500/20 text-gray-400 rounded-lg font-mono text-sm md:text-base font-bold hover:bg-gray-500/30 transition-all hover:scale-105 active:scale-95"
                      >
                        BACK TO ARSENAL
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Current Focus Section */}
          <div className="mx-auto mt-32 max-w-5xl pb-24">
            <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent p-8 backdrop-blur-sm lg:p-12">
              <h2 className="mb-6 text-center text-3xl font-bold text-white lg:text-4xl">
                Currently Building & Researching
              </h2>
              <p className="text-center text-lg leading-relaxed text-gray-300">
                My journey continues with <span className="font-semibold text-cyan-400">Electroplix</span>, where 
                I`m building scalable solutions and experimenting with cutting-edge technologies. Every day brings 
                new challenges, new learnings, and new opportunities to push the boundaries of what`s possible. 
                From configuring distributed systems to optimizing deployment costs, from writing ML algorithms to 
                architecting microservices—I`m constantly <span className="font-semibold text-purple-400">learning, 
                building, and shipping</span>.
              </p>
              
              <div className="mt-8 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-6 py-3 font-mono text-sm text-cyan-400">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-500"></span>
                  </span>
                  EXPERIMENTING IN PRODUCTION
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Portfolio;