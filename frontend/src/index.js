import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AnimatePresence, motion } from 'framer-motion';

ReactDOM.render(
  <React.StrictMode>
    <AnimatePresence>
      <motion.div
        className="entrypoint"
        key="app-motion-wrapper"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 5 }}
      >
        <App />
      </motion.div>
    </AnimatePresence>
  </React.StrictMode>,
  document.getElementById('root')
);
