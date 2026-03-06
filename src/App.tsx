
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bastard, ROSTER, Category, AFFIRMATIONS } from './constants';
import { Camera, Info, X, ShieldAlert, Target, Rocket, Heart, User, Sparkles } from 'lucide-react';

// --- Components ---

const TechStars = () => {
  const stars = useRef(Array.from({ length: 50 }).map(() => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    color: Math.random() > 0.7 ? '#ff00ff' : Math.random() > 0.4 ? '#00f2ff' : '#ffffff'
  })));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.current.map((star, i) => (
        <div
          key={i}
          className="absolute animate-glitch-star"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            animationDelay: `${star.delay}s`,
            boxShadow: `0 0 10px ${star.color}`
          }}
        />
      ))}
    </div>
  );
};

const BoxingGlove = ({ side, velocity }: { side: 'Left' | 'Right', velocity: number }) => {
  const isRight = side === 'Right';
  return (
    <div 
      className="transition-transform duration-75"
      style={{ 
        transform: `scale(${isRight ? -1 : 1}, 1) scale(${1 + velocity / 5})`,
      }}
    >
      <svg width="140" height="140" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_15px_rgba(0,242,255,0.5)]">
        {/* Pixel Art Boxing Glove - Inspired by provided image */}
        {/* Outline */}
        <path d="M10 6H22V7H24V8H25V10H26V20H25V22H24V23H22V24H10V23H8V22H7V20H6V14H7V12H8V10H9V8H10V6Z" fill="black"/>
        {/* Main Blue Body */}
        <path d="M11 7H21V8H23V9H24V11H25V19H24V21H23V22H11V21H10V22H9V21H8V20H7V15H8V13H9V11H10V8H11V7Z" fill="#0095FF"/>
        {/* Highlights */}
        <path d="M12 8H20V9H22V10H23V12H12V8Z" fill="#54C3FF"/>
        <path d="M11 9V11H10V13H9V15H8V19H9V20H10V19H11V18H12V11H11V9Z" fill="#54C3FF"/>
        {/* Shadows */}
        <path d="M12 21H22V20H23V19H24V12H23V11H22V10H21V9H20V10H19V11H18V12H17V13H16V14H15V15H14V16H13V17H12V21Z" fill="#007ACC" opacity="0.3"/>
        {/* Wrist Band */}
        <path d="M10 24H22V28H10V24Z" fill="black"/>
        <path d="M11 25H21V27H11V25Z" fill="#0095FF"/>
        <path d="M11 25H21V26H11V25Z" fill="#54C3FF"/>
      </svg>
    </div>
  );
};

// --- Sound System ---

let audioCtx: AudioContext | null = null;

const getAudioCtx = () => {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
};

const playSound = (type: 'light' | 'medium' | 'heavy' | 'critical' | 'final') => {
  const ctx = getAudioCtx();
  if (!ctx) return;
  
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const masterGain = ctx.createGain();
  masterGain.connect(ctx.destination);
  masterGain.gain.setValueAtTime(0.5, ctx.currentTime);

  const playThud = (freq: number, decay: number, volume: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + decay);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + decay);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start();
    osc.stop(ctx.currentTime + decay);
  };

  const playNoise = (freq: number, decay: number, volume: number, filterType: 'lowpass' | 'highpass' | 'bandpass' = 'lowpass') => {
    const bufferSize = ctx.sampleRate * decay;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.setValueAtTime(freq, ctx.currentTime);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + decay);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    noise.start();
  };

  switch (type) {
    case 'light':
      playThud(150, 0.1, 0.5);
      break;
    case 'medium':
      playThud(100, 0.2, 0.7);
      playNoise(1000, 0.1, 0.3, 'bandpass');
      break;
    case 'heavy':
      playThud(60, 0.4, 1.0);
      playNoise(500, 0.3, 0.5, 'lowpass');
      break;
    case 'critical':
      playNoise(3000, 0.05, 1.0, 'highpass'); // Crack
      setTimeout(() => playThud(40, 0.6, 1.2), 50); // Bass drop
      setTimeout(() => playNoise(800, 0.5, 0.2, 'bandpass'), 200); // Gasp
      break;
    case 'final':
      // Implosion
      const implosion = ctx.createOscillator();
      const impGain = ctx.createGain();
      implosion.frequency.setValueAtTime(100, ctx.currentTime);
      implosion.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.5);
      impGain.gain.setValueAtTime(1, ctx.currentTime);
      impGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
      implosion.connect(impGain);
      impGain.connect(masterGain);
      implosion.start();
      implosion.stop(ctx.currentTime + 0.5);
      
      // Explosion & Cheer
      setTimeout(() => {
        playNoise(2000, 1.5, 1.0, 'lowpass'); // Explosion
        [440, 554, 659, 880].forEach((f, i) => {
          setTimeout(() => playThud(f, 0.4, 0.3), i * 100);
        });
        playNoise(1200, 2.0, 0.4, 'bandpass'); // Cheer
      }, 600);
      break;
  }
};

const Arena = ({ bastard, onComplete }: { bastard: Bastard, onComplete: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [handPos, setHandPos] = useState({ x: -1000, y: -1000 });
  const [handSide, setHandSide] = useState<'Left' | 'Right'>('Right');
  const [velocity, setVelocity] = useState(0);
  const [health, setHealth] = useState(100);
  const [isDestroyed, setIsDestroyed] = useState(false);
  
  // Physics state
  const [angle, setAngle] = useState(0);
  const [angularVelocity, setAngularVelocity] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [rotationVelocity, setRotationVelocity] = useState(0);
  
  const [particles, setParticles] = useState<{ id: number, x: number, y: number, vx: number, vy: number, emoji: string, size: number }[]>([]);
  const [hits, setHits] = useState<{ id: number, x: number, y: number, text: string }[]>([]);
  const [isLaunching, setIsLaunching] = useState(false);
  
  const lastPos = useRef({ x: 0, y: 0, time: Date.now() });
  const lastHitTime = useRef(0);
  const pinataRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(null);

  // Constants
  const GRAVITY = 0.005;
  const DAMPING = 0.985;
  const ROT_DAMPING = 0.97;
  const STRING_LENGTH = window.innerHeight * 0.35;

  // MediaPipe Setup
  useEffect(() => {
    const setupMediaPipe = async () => {
      if (!videoRef.current) return;

      try {
        const HandsObj = (window as any).Hands;
        const CameraObj = (window as any).Camera;

        if (!HandsObj || !CameraObj) {
          console.error('MediaPipe scripts not loaded.');
          return;
        }

        const hands = new HandsObj({
          locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
        });

        hands.setOptions({
          maxNumHands: 1,
          modelComplexity: 0,
          minDetectionConfidence: 0.6,
          minTrackingConfidence: 0.5
        });

        hands.onResults((results: any) => {
          if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            const wrist = results.multiHandLandmarks[0][0];
            const x = (1 - wrist.x) * window.innerWidth;
            const y = wrist.y * window.innerHeight;
            
            if (results.multiHandedness && results.multiHandedness.length > 0) {
              const label = results.multiHandedness[0].label;
              setHandSide(label === 'Left' ? 'Right' : 'Left');
            }

            const now = Date.now();
            const dt = now - lastPos.current.time;
            if (dt > 0) {
              const dx = x - lastPos.current.x;
              const dy = y - lastPos.current.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const v = dist / dt;
              setVelocity(v);
            }
            
            lastPos.current = { x, y, time: now };
            setHandPos({ x, y });
          }
        });

        const camera = new CameraObj(videoRef.current, {
          onFrame: async () => {
            await hands.send({ image: videoRef.current! });
          },
          width: 640,
          height: 480
        });
        
        camera.start();
      } catch (err) {
        console.error('MediaPipe failed to start:', err);
      }
    };

    setupMediaPipe();
  }, []);

  // Physics Loop
  const updatePhysics = useCallback(() => {
    // Pendulum physics
    setAngularVelocity(v => {
      const acceleration = -GRAVITY * Math.sin(angle);
      return (v + acceleration) * DAMPING;
    });
    setAngle(a => a + angularVelocity);

    // Rotation physics
    setRotationVelocity(v => v * ROT_DAMPING);
    setRotation(r => r + rotationVelocity);

    // Particles
    setParticles(prev => prev.map(p => ({
      ...p,
      x: p.x + p.vx,
      y: p.y + p.vy,
      vy: p.vy + (isLaunching ? -0.5 : 0.2),
      vx: p.vx * (isLaunching ? 1.02 : 0.99)
    })).filter(p => p.y < window.innerHeight + 100 && p.y > -500));

    setHits(prev => prev.filter(h => Date.now() - h.id < 500));

    requestRef.current = requestAnimationFrame(updatePhysics);
  }, [angle, angularVelocity, rotationVelocity, isLaunching]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [updatePhysics]);

  // Collision Detection
  useEffect(() => {
    if (isDestroyed || isLaunching) return;

    const checkCollision = () => {
      if (!pinataRef.current) return;
      const rect = pinataRef.current.getBoundingClientRect();
      const padding = 20;
      
      if (
        handPos.x > rect.left - padding && 
        handPos.x < rect.right + padding && 
        handPos.y > rect.top - padding && 
        handPos.y < rect.bottom + padding
      ) {
        const now = Date.now();
        if (now - lastHitTime.current > 150 && velocity > 0.5) {
          handleHit();
          lastHitTime.current = now;
        }
      }
    };

    checkCollision();
  }, [handPos, velocity, isDestroyed, isLaunching]);

  const handleHit = () => {
    const force = Math.min(velocity * 10, 25);
    const damage = force;
    
    setHealth(prev => {
      const next = Math.max(0, prev - damage);
      if (next === 0 && !isDestroyed) {
        triggerDestruction();
      }
      return next;
    });

    // Apply impulse to physics
    const hitDirection = handPos.x > window.innerWidth / 2 ? -1 : 1;
    setAngularVelocity(v => v + (hitDirection * force * 0.01));
    setRotationVelocity(v => v + (Math.random() - 0.5) * force * 5);

    // Hits text & Sounds
    let hitText = "THUD";
    if (force > 18) {
      hitText = "CRITICAL!!!";
      playSound('critical');
    } else if (force > 12) {
      hitText = "POW!!";
      playSound('heavy');
    } else if (force > 5) {
      hitText = "CRACK!";
      playSound('medium');
    } else {
      playSound('light');
    }

    setHits(prev => [...prev, { id: Date.now(), x: handPos.x, y: handPos.y, text: hitText }]);

    // Spawn particles
    const newParticles = Array.from({ length: Math.floor(force / 2) + 1 }).map(() => ({
      id: Math.random(),
      x: handPos.x,
      y: handPos.y,
      vx: (Math.random() - 0.5) * force,
      vy: (Math.random() - 0.5) * force,
      emoji: force > 10 ? bastard.pinataEmoji : "✨",
      size: Math.random() * 20 + 10
    }));
    setParticles(prev => [...prev, ...newParticles]);
  };

  const triggerDestruction = () => {
    setIsDestroyed(true);
    playSound('final');
    setTimeout(() => {
      setIsLaunching(true);
      const explosion = Array.from({ length: 100 }).map(() => ({
        id: Math.random(),
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 40,
        vy: (Math.random() - 1) * 40,
        emoji: Math.random() > 0.5 ? bastard.pinataEmoji : "💥",
        size: Math.random() * 40 + 20
      }));
      setParticles(prev => [...prev, ...explosion]);

      setTimeout(() => {
        onComplete();
      }, 3000);
    }, 1000);
  };

  // Calculate piñata position based on angle
  const pinataX = window.innerWidth / 2 + Math.sin(angle) * STRING_LENGTH;
  const pinataY = Math.cos(angle) * STRING_LENGTH;

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-1000 ${isLaunching ? 'bg-black' : 'bg-[#0A0E1A]'}`}>
      {/* Stars in space mode */}
      {isLaunching && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 200 }).map((_, i) => (
            <div 
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 2 + 'px',
                height: Math.random() * 2 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                opacity: Math.random(),
              }}
            />
          ))}
        </div>
      )}

      {/* Video feed (hidden but active) */}
      <video ref={videoRef} className="hidden" playsInline muted />

      {/* Chain/String */}
      {!isLaunching && (
        <div 
          className="absolute top-0 left-1/2 w-[4px] origin-top pointer-events-none"
          style={{ 
            height: `${STRING_LENGTH}px`,
            transform: `translateX(-50%) rotate(${angle * (180 / Math.PI)}deg)`,
            background: 'repeating-linear-gradient(to bottom, #555 0px, #555 10px, #333 10px, #333 20px)',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)'
          }}
        >
          {/* Anchor point */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-arcade-blue rounded-full shadow-[0_0_10px_#00f2ff]" />
        </div>
      )}

      {/* Piñata */}
      <AnimatePresence>
        {!isLaunching && (
          <motion.div
            ref={pinataRef}
            animate={{ 
              x: pinataX,
              y: pinataY,
              rotate: rotation,
              scale: isDestroyed ? 0 : 1 + (100 - health) / 200
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.5 }}
            className="absolute left-0 top-0 w-64 h-64 flex items-center justify-center cursor-none pointer-events-none"
            style={{ transform: 'translate(-50%, 0)' }}
          >
            <div className="relative">
              <span className="text-9xl filter drop-shadow-2xl select-none">
                {bastard.pinataEmoji}
              </span>
              {/* Damage cracks */}
              {health < 70 && <div className="absolute inset-0 border-4 border-black/20 rounded-full scale-110 rotate-45" />}
              {health < 40 && <div className="absolute inset-0 border-4 border-black/40 rounded-full scale-125 -rotate-12" />}
              {health < 20 && <div className="absolute inset-0 border-8 border-red-500/20 rounded-full scale-150" />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Particles */}
      {particles.map(p => (
        <div 
          key={p.id}
          className="absolute pointer-events-none select-none"
          style={{ 
            left: p.x, 
            top: p.y, 
            fontSize: p.size,
            transform: `translate(-50%, -50%) rotate(${p.vx * 10}deg)`
          }}
        >
          {p.emoji}
        </div>
      ))}

      {/* Hit Text */}
      {hits.map(h => (
        <motion.div
          key={h.id}
          initial={{ opacity: 1, scale: 0.5, y: 0 }}
          animate={{ opacity: 0, scale: 2, y: -100 }}
          className="absolute font-archivo text-white text-4xl pointer-events-none select-none z-50"
          style={{ left: h.x, top: h.y }}
        >
          {h.text}
        </motion.div>
      ))}

      {/* UI Overlay */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-md px-6 pointer-events-none">
        <div className="bg-black/50 backdrop-blur-md p-4 border border-white/10 rounded-lg">
          <div className="flex justify-between items-end mb-2">
            <span className="font-mono text-white text-xs uppercase tracking-widest">Target: {bastard.name}</span>
            <span className="font-mono text-white text-xs">{Math.ceil(health)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-arcade-blue shadow-[0_0_10px_#00f2ff]"
              initial={{ width: '100%' }}
              animate={{ width: `${health}%` }}
            />
          </div>
          <p className="font-mono text-[10px] text-white/40 mt-2 text-center uppercase">
            {health > 80 ? "Warm up those fists." : health > 50 ? "Keep swinging!" : health > 20 ? "They're cracking!" : "FINISH THEM."}
          </p>
        </div>
      </div>

      {/* Boxing Glove Cursor */}
      <div 
        className="absolute pointer-events-none z-[100]"
        style={{ 
          left: handPos.x, 
          top: handPos.y, 
        }}
      >
        <BoxingGlove side={handSide} velocity={velocity} />
      </div>

      {/* Launch Text */}
      <AnimatePresence>
        {isLaunching && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-[200]"
          >
            <h2 className="font-archivo text-6xl md:text-9xl text-white mb-4 italic neon-text">KABOOM!</h2>
            <p className="font-mono text-xl md:text-3xl text-white max-w-2xl">
              {bastard.name} is vaporized! The universe is slightly cleaner now.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


const ThankYou = ({ onRestart }: { onRestart: () => void }) => {
  const [affirmation, setAffirmation] = useState("");
  
  useEffect(() => {
    setAffirmation(AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)]);
  }, []);

  return (
    <div className="min-h-screen arcade-grid flex flex-col items-center justify-center p-6 text-center text-white relative overflow-hidden">
      <TechStars />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full bg-black/80 p-8 md:p-12 border-4 border-white shadow-[0_0_50px_rgba(255,0,255,0.2)] backdrop-blur-md relative z-10"
      >
        <Sparkles className="mx-auto mb-6 text-arcade-pink animate-pulse" size={64} />
        <h2 className="font-archivo text-3xl md:text-6xl mb-8 uppercase leading-tight neon-text-pink italic">
          {affirmation}
        </h2>
        <button 
          onClick={onRestart}
          className="arcade-button group"
        >
          <span className="group-hover:neon-text transition-all">SMASH ANOTHER?</span>
        </button>
      </motion.div>
    </div>
  );
};

const AboutPage = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-[200] bg-[#E6E9EF] flex items-center justify-center p-6">
    <div className="max-w-2xl w-full bg-white p-12 border-4 border-black shadow-2xl relative">
      <button onClick={onClose} className="absolute top-4 right-4 hover:rotate-90 transition-transform">
        <X size={32} />
      </button>
      <h2 className="font-archivo text-5xl mb-8 uppercase">The Creators</h2>
      <div className="space-y-8 font-mono">
        <div>
          <h3 className="text-2xl font-bold text-[#0055FF]">ANDI</h3>
          <p className="text-gray-600 uppercase">Chief Bastard Curator & Moral Compass</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-[#0055FF]">CARLY</h3>
          <p className="text-gray-600 uppercase">Piñata Architect & Physics Wrangler</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-[#0055FF]">MARTON</h3>
          <p className="text-gray-600 uppercase">Hand-Tracking Wizard & Justice Enforcer</p>
        </div>
      </div>
      <p className="mt-12 font-mono text-xs text-gray-400 uppercase leading-relaxed">
        Built for the weary humans who just need to swing at something that deserves it.
        No bastards were harmed in the making of this game. Unfortunately.
      </p>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [gameState, setGameState] = useState<'landing' | 'gallery' | 'arena' | 'thanks'>('landing');
  const [selectedBastard, setSelectedBastard] = useState<Bastard | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [isRequestingCamera, setIsRequestingCamera] = useState(false);
  const [filter, setFilter] = useState<Category>(Category.ALL);

  const filteredRoster = ROSTER.filter(b => filter === Category.ALL || b.category === filter);

  useEffect(() => {
    const saved = localStorage.getItem('bastards_smashed');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  useEffect(() => {
    if (gameState === 'arena' || gameState === 'landing') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [gameState]);

  const handleStart = async () => {
    setIsRequestingCamera(true);
    try {
      // Request camera permission explicitly
      await navigator.mediaDevices.getUserMedia({ video: true });
      // Small delay to let user read the message
      setTimeout(() => {
        setGameState('gallery');
        setIsRequestingCamera(false);
      }, 2500);
    } catch (err) {
      console.error("Camera permission denied", err);
      // Still move forward but maybe show warning? 
      // User request just says show message and request.
      setGameState('gallery');
      setIsRequestingCamera(false);
    }
  };
  const handleSelect = (b: Bastard) => {
    setSelectedBastard(b);
    setGameState('arena');
  };
  const handleComplete = () => {
    const newScore = highScore + 1;
    setHighScore(newScore);
    localStorage.setItem('bastards_smashed', newScore.toString());
    setGameState('thanks');
  };
  const handleRestart = () => {
    setSelectedBastard(null);
    setGameState('gallery');
  };

  return (
    <div className="font-mono selection:bg-[#ff00ff] selection:text-white bg-black min-h-screen relative">
      <div className="scanlines" />
      
      {gameState !== 'landing' && (
        <header className="fixed top-0 left-0 right-0 z-50 p-4 grid grid-cols-3 items-center bg-black/80 border-b border-white/10 backdrop-blur-sm">
          <div className="hidden md:block font-mono text-[10px] uppercase text-arcade-blue">
            Bastards Smashed: <span className="text-white font-bold">{highScore}</span>
          </div>
          <div className="md:hidden" />
          <div className="font-archivo text-[3.5vw] sm:text-sm md:text-xl tracking-tighter uppercase font-bold neon-text text-center">
            CONSTELLATION OF BASTARDS
          </div>
          <div className="flex justify-end items-center">
            <button 
              onClick={() => setShowAbout(true)}
              className="font-mono text-xs hover:text-arcade-pink cursor-pointer transition-colors border border-white/20 px-2 py-1"
            >
              [ABOUT]
            </button>
          </div>
        </header>
      )}
      
      <AnimatePresence mode="wait">
        {gameState === 'landing' && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen arcade-grid flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            <TechStars />
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-4xl mx-auto relative z-10 flex flex-col items-center">
              <h1 className="font-archivo text-[12vw] sm:text-8xl md:text-9xl mb-4 tracking-tighter leading-none neon-text italic text-center">
                CONSTELLATION<br/>OF BASTARDS
              </h1>
              <p className="font-mono text-xl md:text-2xl mb-12 text-arcade-pink uppercase tracking-widest font-bold">
                A respite for weary humans
              </p>
              <div className="space-y-8">
                <button onClick={handleStart} className="arcade-button group">
                  <span className="group-hover:neon-text transition-all">READY TO SMASH A BASTARD?</span>
                </button>
                <p className="font-mono text-[10px] text-white/40 uppercase tracking-[0.3em]">
                  requires a webcam, a fist, and some righteous anger
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {gameState === 'gallery' && (
          <motion.div key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen arcade-grid pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="font-archivo text-4xl md:text-6xl mb-8 text-center uppercase neon-text italic">
                Select Your Target
              </h2>
              
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {Object.values(Category).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`font-mono text-[10px] px-4 py-2 border-2 transition-all uppercase cursor-pointer ${
                      filter === cat 
                        ? 'bg-arcade-blue text-black border-white shadow-[2px_2px_0px_#ff00ff]' 
                        : 'bg-black text-white border-white/40 hover:border-white hover:shadow-[2px_2px_0px_#00f2ff]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4">
                {filteredRoster.map(bastard => (
                  <motion.div
                    key={bastard.id}
                    onClick={() => setSelectedBastard(bastard)}
                    className="arcade-card group flex flex-col items-center justify-center text-center aspect-square"
                  >
                    <span className="text-4xl mb-2 group-hover:scale-125 transition-transform">
                      {bastard.pinataEmoji}
                    </span>
                    <span className="font-mono text-[9px] leading-tight uppercase font-bold text-white/80 group-hover:text-white">
                      {bastard.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {selectedBastard && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
                  <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} className="bg-black max-w-md w-full p-8 border-4 border-white shadow-[0_0_50px_rgba(0,242,255,0.3)]">
                    <h3 className="font-archivo text-4xl mb-2 uppercase leading-none neon-text">
                      {selectedBastard.name}
                    </h3>
                    <p className="font-mono text-xs text-arcade-pink mb-6 uppercase font-bold">
                      {selectedBastard.category}
                    </p>
                    <div className="font-mono text-lg mb-8 border-l-4 border-arcade-blue pl-4 py-2 text-white/90 italic">
                      "{selectedBastard.description}"
                    </div>
                    <div className="flex flex-col gap-4">
                      <button onClick={() => handleSelect(selectedBastard)} className="arcade-button w-full">
                        Fists clenched? Let's go!
                      </button>
                      <button 
                        onClick={() => setSelectedBastard(null)} 
                        className="font-mono text-xs text-white/60 hover:text-white uppercase tracking-widest border border-white/20 hover:border-white px-4 py-2 transition-all cursor-pointer"
                      >
                        [ BACK TO ROSTER ]
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {gameState === 'arena' && selectedBastard && (
          <motion.div key="arena" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Arena bastard={selectedBastard} onComplete={handleComplete} />
          </motion.div>
        )}

        {gameState === 'thanks' && (
          <motion.div key="thanks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ThankYou onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isRequestingCamera && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-md w-full p-12 border-4 border-arcade-blue bg-black shadow-[0_0_50px_rgba(0,242,255,0.3)] text-center"
            >
              <div className="mb-8 flex justify-center">
                <Camera className="text-arcade-blue animate-pulse" size={48} />
              </div>
              <h2 className="font-archivo text-3xl md:text-4xl text-white uppercase tracking-tighter leading-none mb-6 neon-text">
                SYSTEM<br/>INITIALIZING
              </h2>
              <p className="font-mono text-xl text-white uppercase tracking-widest leading-relaxed">
                Turn on your camera.<br/>
                Make a fist.<br/>
                Get ready to punch.
              </p>
              <div className="mt-10 flex justify-center">
                <div className="w-24 h-1 bg-arcade-blue animate-pulse" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAbout && (
          <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-6 arcade-grid">
            <div className="max-w-2xl w-full bg-black p-12 border-4 border-white shadow-[0_0_100px_rgba(255,0,255,0.2)] relative">
              <button onClick={() => setShowAbout(false)} className="absolute top-4 right-4 text-white/40 hover:text-white hover:rotate-90 transition-all">
                <X size={32} />
              </button>
              <h2 className="font-archivo text-5xl mb-8 uppercase neon-text-pink italic">The Creators</h2>
              <div className="space-y-8 font-mono">
                <div className="border-l-2 border-arcade-blue pl-4">
                  <h3 className="text-2xl font-bold text-arcade-blue">ANDI</h3>
                  <p className="text-white/60 uppercase text-xs">Chief Bastard Curator & Moral Compass</p>
                </div>
                <div className="border-l-2 border-arcade-pink pl-4">
                  <h3 className="text-2xl font-bold text-arcade-pink">CARLY</h3>
                  <p className="text-white/60 uppercase text-xs">Piñata Architect & Physics Wrangler</p>
                </div>
                <div className="border-l-2 border-arcade-green pl-4">
                  <h3 className="text-2xl font-bold text-green-400">MARTON</h3>
                  <p className="text-white/60 uppercase text-xs">Hand-Tracking Wizard & Justice Enforcer</p>
                </div>
              </div>
              <p className="mt-12 font-mono text-[10px] text-white/30 uppercase leading-relaxed tracking-widest">
                Built for the weary humans who just need to swing at something that deserves it.
                No bastards were harmed in the making of this game. Unfortunately.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
