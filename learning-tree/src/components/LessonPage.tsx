import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface LessonContent {
  id: string;
  title: string;
  content: string;
  xpPoints: number;
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  sections?: {
    title: string;
    content: string;
  }[];
  progress?: number;
  prerequisites?: string[];
}

const lessonData: Record<string, LessonContent> = {
  '1': {
    id: '1',
    title: 'Getting Started',
    content: 'Welcome to your learning journey! This is the first step to mastering new skills.',
    xpPoints: 50,
    estimatedTime: '10 mins',
    difficulty: 'Beginner',
    sections: [
      {
        title: 'Introduction',
        content: 'In this lesson, you will learn the fundamental concepts and get familiar with the learning platform.'
      },
      {
        title: 'Platform Overview',
        content: 'Navigate through our interactive learning tree, track your progress, and earn XP points as you complete lessons.'
      },
      {
        title: 'Next Steps',
        content: 'After completing this lesson, you\'ll be ready to tackle more advanced topics and start your learning journey.'
      }
    ],
    progress: 0
  },
  '2': {
    id: '2',
    title: 'Basic Concepts',
    content: 'Let\'s dive into the fundamental concepts...',
    xpPoints: 75,
    estimatedTime: '15 mins',
    difficulty: 'Beginner'
  },
  '3': {
    id: '3',
    title: 'First Project',
    content: 'Time to put your knowledge into practice...',
    xpPoints: 100,
    estimatedTime: '20 mins',
    difficulty: 'Intermediate'
  },
  '4': {
    id: '4',
    title: 'Advanced Topics',
    content: 'Ready for some advanced concepts?...',
    xpPoints: 150,
    estimatedTime: '30 mins',
    difficulty: 'Advanced'
  },
};

const LessonPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const lesson = lessonId ? lessonData[lessonId] : null;

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Lesson not found</h1>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Return to Learning Tree
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            ← Back to Tree
          </button>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
              {lesson.xpPoints} XP
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {lesson.estimatedTime}
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              {lesson.difficulty}
            </span>
          </div>
        </div>

        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{lesson.title}</h1>
          <div className="prose max-w-none mb-8">
            <p className="text-gray-600 text-lg">{lesson.content}</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${lesson.progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Sections */}
          <div className="space-y-6 mb-8">
            {lesson.sections?.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  <span className="text-primary mr-2">#{index + 1}</span>
                  {section.title}
                </h2>
                <p className="text-gray-600">{section.content}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 flex justify-between items-center">
            <div className="flex items-center gap-2 text-gray-600">
              <i className="fas fa-book-reader"></i>
              <span>Track your progress as you learn</span>
            </div>
            <button 
              onClick={() => {
                // Here you would typically handle lesson completion
                navigate('/');
              }}
              className="px-6 py-3 bg-gradient-to-r from-secondary to-primary text-white rounded-lg
                         hover:shadow-lg hover:scale-105 transform transition-all duration-300
                         flex items-center gap-2"
            >
              <span>Complete Lesson</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LessonPage;