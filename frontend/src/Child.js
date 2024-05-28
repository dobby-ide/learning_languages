import Card from './Card';
import { useAnimate, stagger, motion } from 'framer-motion';
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Challenge from './Challenge';
const staggerSubjectItems = stagger(0.1, { startDelay: 0.15 });
function Child({
  username,
  userscore,
  back,
  setUserScore,
  firstChoice,
  secondChoice,
  sendingAnswersToApp,
}) {
  let port = '';
  if (process.env.NODE_ENV === 'development') {
    port = 'http://localhost:3000';
  }
  const url = `${port}/admin/subjects`;
  const [subject, setSubject] = useState([]);
  const [tableInUse, setTableInUse] = useState('');
  const [wordPairs, setWordPairs] = useState([]);
  const [tablesInvisible, setTablesInvisible] = useState(false);

  const containerVariants = {
    hidden: { opacity: 1, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {},
    },
  };
  const demoVariants = {
    initial: {
      opacity: 0.4,
    },
    animate: {
      opacity: 1,
      transition: { duration: 0.2 },
    },
  };
  useEffect(() => {
    retrievingData();
  }, []);
  const answersToApp = (answers) => {
    sendingAnswersToApp(answers);
  };
  const storingSubjectName = (e) => {
    setTableInUse(e);
  };
  const onSettingNewScore = (score) => {
    setUserScore(score);
  };
  const backToApp = () => {
    back();
  };
  const onRemovingTables = () => {
    setTablesInvisible(true);
  };

  const onShowingPairs = async (e) => {
    e.preventDefault();
    console.log(e.target.innerHTML);

    storingSubjectName(e.target.innerHTML);

    const parameter = e.target.innerHTML;
    const pairsOfSingleSubject = await axios.get(
      `${port}/child/subjects/subject?subject=${parameter}&firstlanguage=${firstChoice}&secondlanguage=${secondChoice}`
    );
    setWordPairs(pairsOfSingleSubject.data);
  };

  //GET ALL SUBJECTS INTO STATE
  const retrievingData = async () => {
    const data = await axios.get(url);

    setSubject(data.data); //subject = [{id:1,subject_name:Animals},{id:2.......}]
  };

  console.log(wordPairs);
  return (
    <Card className="child">
      {username ? <div>Hello {username}</div> : null}

      <div className="child__subjectscontainer">
        {subject.map(
          (singleSubject, index) =>
            !tablesInvisible && (
              <motion.div
                initial={{ opacity: 0, translateX: -50 }}
                animate={{ opacity: 1, translateX: 0 }}
                key={singleSubject.id}
                className="child__subjects"
                onClick={onShowingPairs}
                transition={{ delay: index * 0.55, duration: 0.3 }}
              >
                {singleSubject.subject_name}
              </motion.div>
            )
        )}
      </div>

      {tableInUse !== '' ? (
        <div className="tableinusechild">Subject: {tableInUse}</div>
      ) : null}
      <Challenge
        answersToApp={answersToApp}
        firstChoice={firstChoice}
        secondChoice={secondChoice}
        settingScore={onSettingNewScore}
        back={backToApp}
        username={username}
        startingscore={userscore}
        subject={tableInUse}
        pairs={wordPairs}
        removeTables={onRemovingTables}
        className="challengeChild"
      />
    </Card>
  );
}

export default Child;
