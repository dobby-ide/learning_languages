import './App.css';
import Child from './Child';
import './Admin';
import Card from './Card';
import Admin from './Admin';
import { AnimatePresence, motion } from 'framer-motion';
import Filter from './Filter';
import { useState } from 'react';
import Login from './Login';
import Switch from './Switch';
import Congratulations from './Congratulations';
const MotionCard = motion(Card);

function App() {
  console.log(process.env.NODE_ENV);
  const [answers, setAnswers] = useState();
  const [user, setUser] = useState('');
  const [userScore, setUserScore] = useState(0);

  const [childIsVisible, setChildIsVisible] = useState(false);
  const [adminIsVisible, setAdminIsVisible] = useState(false);
  const [registerIsVisible, setRegisterIsVisible] = useState(false);
  const [congratsIsVisible, setcongratsIsVisible] = useState(false);
  const [firstChoice, setFirstChoice] = useState('');
  const [secondChoice, setSecondChoice] = useState('');

  const getUserScore = (score) => {
    setUserScore(score);
  };

  const backToHome = () => {
    setAdminIsVisible(false);
    setcongratsIsVisible(true);
    setChildIsVisible(false);
    setRegisterIsVisible(false);
  };

  const onChildVisibility = () => {
    setChildIsVisible(true);
    setAdminIsVisible(false);
    setRegisterIsVisible(false);
    setcongratsIsVisible(false);
  };

  const onAdminVisibility = () => {
    setChildIsVisible(false);
    setAdminIsVisible(true);
    setRegisterIsVisible(false);
    setcongratsIsVisible(false);
  };

  const onRegisterVisibility = () => {
    setChildIsVisible(false);
    setAdminIsVisible(false);
    setRegisterIsVisible(true);
    setcongratsIsVisible(false);
  };

  // gets the current logged in name and score
  const usingLoginData = (user, score) => {
    setUserScore(score);
    setUser(user);
  };

  const onFirstLanguage = (language) => {
    console.log(language);
    setFirstChoice(language);
  };

  const onSecondLanguage = (language) => {
    console.log(language);
    setSecondChoice(language);
  };

  const onReceivingAnswers = (answers) => {
    console.log('inside app');
    console.log(answers);
    setAnswers(answers);
  };

  return (
    <AnimatePresence>
      <MotionCard
        className="Appjs"
        // initial={{ opacity: 0, x: -200, zIndex: 80 }}
        // animate={{ opacity: 1, x: 0, zIndex: 90 }} // Update animate prop
        // exit={{ opacity: 0 }}
        // transition={{ type: 'spring', stiffness: 100, damping: 5 }}
        key="motion-card" // Ensure unique key for AnimatePresence
      >
        <AnimatePresence>
          {secondChoice ? (
            <motion.div
              key="filter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Filter
                className="filter"
                changeChildVisibility={onAdminVisibility}
                changeAdminVisibility={onChildVisibility}
                changeRegisterVisibility={onRegisterVisibility}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {congratsIsVisible ? (
            <motion.div
              key="congrats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Congratulations
                userscore={userScore}
                username={user}
                answers={answers}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {registerIsVisible ? (
            <motion.div
              key="register"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Login logindata={usingLoginData} />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {childIsVisible ? (
            <motion.div
              key="admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Admin
                firstlanguage={firstChoice}
                secondlanguage={secondChoice}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>

        {adminIsVisible ? (
          <motion.div
            className="child_parent_div"
            key="child"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Child
              sendingAnswersToApp={onReceivingAnswers}
              firstChoice={firstChoice}
              secondChoice={secondChoice}
              username={user}
              userscore={userScore}
              back={backToHome}
              setUserScore={getUserScore}
            />
          </motion.div>
        ) : null}

        <AnimatePresence>
          {!secondChoice ? (
            <motion.div
              className="switchdiv"
              key="switch"
              initial={{ opacity: 0, y: -300, zIndex: 82 }}
              animate={{
                opacity: 1,
                y: 0,
                zIndex: 72,
                transition: {
                  type: 'spring',
                  stiffness: 200,
                  damping: 10,
                  duration: 0.5,
                },
              }}
              exit={{
                y: 500,
                opacity: 0,
                transition: {
                  type: 'just',
                  velocity: 400,
                  opacity: 0,
                },
              }}
              // transition={{
              //   type: 'spring',
              //   stiffness: 200,
              //   damping: 10,
              //   duration: 0.5,
              // }}
            >
              <Switch
                className="switch"
                onPassingFirstLanguage={onFirstLanguage}
                onPassingSecondLanguage={onSecondLanguage}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </MotionCard>
    </AnimatePresence>
  );
}

export default App;