import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import TreeView from './TreeView';
import LessonPage from './components/LessonPage';
import 'reactflow/dist/style.css';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50"
        >
          <Routes>
            <Route path="/" element={<TreeView />} />
            <Route path="/lesson/:lessonId" element={<LessonPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </Router>
  );
}

export default App;
