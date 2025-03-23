import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Lesson {
  id: string;
  title: string;
  icon: string;
  color: string;
  unlocked: boolean;
  xp: number;
  completionPercentage?: number;
  description?: string;
  requiredXP?: number;
}

const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Getting Started',
    icon: 'fa-robot',
    color: 'from-emerald-400 to-teal-400',
    unlocked: true,
    xp: 50,
    completionPercentage: 100,
    description: 'Begin your journey with fundamental concepts and platform basics',
    requiredXP: 0
  },
  {
    id: '2',
    title: 'Basic Concepts',
    icon: 'fa-book-open',
    color: 'from-teal-400 to-cyan-400',
    unlocked: true,
    xp: 75,
    completionPercentage: 60,
    description: 'Master fundamental programming concepts through interactive exercises',
    requiredXP: 50
  },
  {
    id: '3',
    title: 'First Project',
    icon: 'fa-code',
    color: 'from-cyan-400 to-sky-400',
    unlocked: false,
    xp: 100,
    completionPercentage: 0,
    description: 'Apply your knowledge by building a real-world project from scratch',
    requiredXP: 125
  },
  {
    id: '4',
    title: 'Advanced Topics',
    icon: 'fa-rocket',
    color: 'from-sky-400 to-blue-400',
    unlocked: false,
    xp: 150,
    completionPercentage: 0,
    description: 'Dive deep into advanced concepts and become a skilled developer',
    requiredXP: 225
  },
];

const TreeView: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredLesson, setHoveredLesson] = useState<string | null>(null);
  const [pathHeight, setPathHeight] = useState(800); // Default height

  useEffect(() => {
    const updateHeight = () => {
      setPathHeight(window.innerHeight);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const getWavePosition = (progress: number) => {
    const wave1 = Math.sin(progress * Math.PI * 2) * Math.sin(progress * Math.PI);
    const wave2 = Math.sin(progress * Math.PI * 1.5) * Math.cos(progress * Math.PI * 0.5);
    const combinedWave = (wave1 + wave2) * 0.5;
    return combinedWave;
  };

  const generatePath = () => {
    const height = pathHeight;
    const centerX = 100;
    const amplitude = 45;
    const segments = 30;
    const points = [];
    
    // Generate smooth wave points with natural easing
    for (let i = 0; i <= segments; i++) {
      const progress = i / segments;
      const y = height * progress;
      const x = centerX + getWavePosition(progress) * amplitude;
      points.push([x, y]);
    }
    
    // Create SVG path using cubic bezier curves
    let path = `M ${points[0][0]} ${points[0][1]}`;
    
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const midX = (current[0] + next[0]) / 2;
      const midY = (current[1] + next[1]) / 2;
      
      // Control points for smooth curves
      const cp1x = current[0] + (midX - current[0]) / 2;
      const cp1y = current[1];
      const cp2x = next[0] - (next[0] - midX) / 2;
      const cp2y = next[1];
      
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next[0]} ${next[1]}`;
    }
    
    return path;
  };

  const pathDefinition = generatePath();

  return (
    <div className="min-h-screen bg-[#E8F5F0] p-8">
      {/* Mountain Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-50/30 to-emerald-100/40" />
      
      {/* Header */}
      <div className="relative max-w-4xl mx-auto mb-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400/90 to-teal-400/90 flex items-center justify-center shadow-lg backdrop-blur-sm">
              <i className="fas fa-graduation-cap text-2xl text-white/90"></i>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Learning Journey</h1>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-star text-yellow-400 mr-1.5"></i>
                  <span>Total XP: 275</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-crown text-purple-400 mr-1.5"></i>
                  <span>VIP Member</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tree View */}
      <div className="relative max-w-3xl mx-auto px-8">
        <div className="relative flex flex-col items-center space-y-40">
          {/* Wavy Path Background */}
          <div className="absolute top-0 left-1/2 w-[50%] min-w-[300px] h-full -translate-x-1/2 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="pathGradient" gradientTransform="rotate(90)">
                  <stop offset="0%" stopColor="rgb(52, 211, 153)" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="rgb(45, 212, 191)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="rgb(34, 211, 238)" stopOpacity="0.2" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <path
                d={pathDefinition}
                className="fill-none stroke-[40] stroke-[url(#pathGradient)] filter blur-xl animate-pulse-slow"
              />
            </svg>
          </div>

          {/* Wavy Path Line */}
          <div className="absolute top-0 left-1/2 w-[50%] min-w-[300px] h-full -translate-x-1/2">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGradient" gradientTransform="rotate(90)">
                  <stop offset="0%" stopColor="#34D399" />
                  <stop offset="50%" stopColor="#2DD4BF" />
                  <stop offset="100%" stopColor="#22D3EE" />
                </linearGradient>
              </defs>
              <path
                d={pathDefinition}
                className="fill-none stroke-[3] stroke-[url(#lineGradient)] filter drop-shadow-lg"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  filter: 'drop-shadow(0 0 3px rgba(45, 212, 191, 0.3))'
                }}
              />
              <circle cx="48" cy="0" r="3" className="fill-emerald-400 filter drop-shadow-lg animate-pulse-slow" />
              <circle cx="48" cy="100%" r="3" className="fill-cyan-400 filter drop-shadow-lg animate-pulse-slow" />
            </svg>
          </div>

          {lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              className="relative z-10 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <motion.div
                onClick={() => lesson.unlocked && navigate(`/lesson/${lesson.id}`)}
                onHoverStart={() => setHoveredLesson(lesson.id)}
                onHoverEnd={() => setHoveredLesson(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={lesson.unlocked ? { scale: 0.95 } : {}}
                className="relative flex justify-center items-center"
                style={{
                  transform: `translate(${getWavePosition((index + 1) / lessons.length) * 90}px)`,
                  marginTop: index === 0 ? '0' : 'auto'
                }}
              >
                {/* Progress Ring */}
                {lesson.unlocked && lesson.completionPercentage !== undefined && (
                  <svg className="absolute -inset-6 w-[calc(100%+48px)] h-[calc(100%+48px)] rotate-[-90deg]">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      className="fill-none stroke-gray-200/50"
                      strokeWidth="2"
                    />
                    <circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      className={`fill-none stroke-primary transition-all duration-1000 ease-out drop-shadow-lg`}
                      strokeWidth="2"
                      strokeDasharray={`${lesson.completionPercentage * 2.827} 282.7`}
                    />
                  </svg>
                )}

                {/* Lesson Node */}
                <div className={`group relative w-24 h-24 rounded-full mx-auto 
                  bg-gradient-to-br ${lesson.color}
                  flex flex-col items-center justify-center
                  shadow-lg transition-all duration-500 ease-out
                  ${lesson.unlocked ? 'cursor-pointer hover:shadow-2xl' : 'opacity-40 cursor-not-allowed filter grayscale'}
                  border-[3px] border-white/60 backdrop-blur-sm
                  hover:border-white
                `}>
                  {/* XP Badge */}
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full px-3 py-0.5 text-[10px] font-bold shadow-lg">
                    {lesson.xp} XP
                  </div>

                  {/* Icon */}
                  <i className={`fas ${lesson.icon} text-3xl text-white drop-shadow-md group-hover:scale-110 transition-transform duration-300`}></i>

                  {/* Lock Overlay */}
                  {!lesson.unlocked && (
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] rounded-full flex items-center justify-center">
                      <i className="fas fa-lock text-white/90 text-2xl drop-shadow-lg"></i>
                    </div>
                  )}
                </div>

                {/* Hover Info Card */}
                <div className={`absolute left-full ml-6 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-white/20 w-64 opacity-0 translate-x-2 pointer-events-none transition-all duration-300 ease-out
                  ${hoveredLesson === lesson.id ? 'opacity-100 translate-x-0' : ''}`}>
                  <h3 className="font-bold text-gray-800 mb-2">{lesson.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{lesson.description}</p>
                  <div className="space-y-2">
                    {!lesson.unlocked ? (
                      <div className="flex items-center text-gray-500 text-sm">
                        <i className="fas fa-lock text-xs mr-1.5"></i>
                        <span>Required XP: {lesson.requiredXP}</span>
                      </div>
                    ) : lesson.completionPercentage === 100 ? (
                      <div className="flex items-center text-emerald-600 text-sm">
                        <i className="fas fa-check-circle text-xs mr-1.5"></i>
                        <span>Completed</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-primary text-sm">
                        <i className="fas fa-book-reader text-xs mr-1.5"></i>
                        <span>In Progress - {lesson.completionPercentage}%</span>
                      </div>
                    )}
                    <div className="flex items-center text-yellow-600 text-sm">
                      <i className="fas fa-star text-xs mr-1.5"></i>
                      <span>Earn {lesson.xp} XP</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TreeView;