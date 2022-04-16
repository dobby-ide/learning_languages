import React from 'react';
import axios from 'axios';
import Card from './Card';
import { useState, useEffect } from 'react';
const Admin = () => {
  const [subject, setSubject] = useState([]);
  const [wordPairs, setWordPairs] = useState([]);
  const url = 'http://localhost:3000/admin/subjects';
  const onShowingPairs = async (e) => {
    e.preventDefault();
    console.log(e.target.innerHTML);
    const parameter = e.target.innerHTML;
    const pairsOfSingleSubject = await axios.get(
      `http://localhost:3000/admin/subjects/subject?subject=${parameter}`
    );
    setWordPairs(pairsOfSingleSubject.data);
  };
  useEffect(() => {
    retrievingData();
  }, []);
  const retrievingData = async () => {
    const data = await axios.get(url);

    setSubject(data.data);
    console.log(subject);
  };
  console.log(wordPairs);
  return (
    <Card className="mainAdmin">
      <div className="subjectscontainer">
        {subject.map((singleSubject) => {
          return (
            <div
              key={singleSubject.id}
              className="subjects"
              onClick={onShowingPairs}
            >
              {singleSubject.subject_name}
            </div>
          );
        })}
        <button onClick={retrievingData}>add a subject</button>
      </div>
      <div className="separator"></div>
      <div className="mappingpairscontainer">
        {wordPairs.map((pairs) => {
          return (
            <div key={pairs.english} className="admin pairscontainer">
              <div className="admin english">{pairs.english}</div>
              <div className="admin finnish">{pairs.finnish}</div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
export default Admin;
