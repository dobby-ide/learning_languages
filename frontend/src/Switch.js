import React from 'react';
import Card from './Card';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

//SWITCH WILL SEND TO App.js THE TWO LANGUAGES CHOSEN (THIS IS THE "ENTRANCE" OF THE APPLICATION FOR ANY USE, so the whole application will be set up to work on two languages at a time)

const MotionCard = motion(Card);

const Switch = ({ onPassingFirstLanguage, onPassingSecondLanguage }) => {
  const [firstChoice, setFirstChoice] = useState('');
  const [secondChoice, setSecondChoice] = useState('');
  let languages = ['english', 'finnish', 'italian'];
  let newLanguages = languages.filter((language) => language !== firstChoice);

  const selectFirstLanguage = (e) => {
    console.log(e.target.value);
    setFirstChoice(e.target.value);
  };

  const selectSecondLanguage = (e) => {
    console.log(e.target.value);
    setSecondChoice(e.target.value);
  };

  const sendingChoices = (e) => {
    e.preventDefault();
    onPassingFirstLanguage(firstChoice);
    onPassingSecondLanguage(secondChoice);
  };

  return (
    <AnimatePresence>
      <MotionCard className="switch">
        <div className="switch__main">
          <p className="switch__main-paragraph">
            Choose language you want to translate from:
          </p>
          <select
            onChange={selectFirstLanguage}
            className="switch__dropdown dropdown-first"
          >
            <option defaultValue={'choose the first language'}></option>
            {languages.map((language) => {
              return (
                <option key={language} value={language}>
                  {language}
                </option>
              );
            })}
          </select>
        </div>
        <AnimatePresence>
          {firstChoice !== '' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <p className="switch__main-paragraph">
                Choose language you want to translate into:
              </p>
              <select
                onChange={selectSecondLanguage}
                className="switch__dropdown dropdown-second"
              >
                <option defaultValue={'choose the second language'}></option>
                {newLanguages.map((language) => {
                  return (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  );
                })}
              </select>
              <motion.button
                onClick={sendingChoices}
                className="chooseLanguages-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                OK
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </MotionCard>
    </AnimatePresence>
  );
};

export default Switch;
