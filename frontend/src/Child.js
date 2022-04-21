import Card from './Card';
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Challenge from './Challenge';
function Child({ username, userscore }) {
  const url = 'http://localhost:3000/admin/subjects';
  const [subject, setSubject] = useState([]);
  const [tableInUse, setTableInUse] = useState('');
  const [wordPairs, setWordPairs] = useState([]);
  useEffect(() => {
    retrievingData();
  }, []);
  const storingSubjectName = (e) => {
    setTableInUse(e);
  };
  const onShowingPairs = async (e) => {
    e.preventDefault();
    console.log(e.target.innerHTML);
    storingSubjectName(e.target.innerHTML);

    const parameter = e.target.innerHTML;
    const pairsOfSingleSubject = await axios.get(
      `http://localhost:3000/admin/subjects/subject?subject=${parameter}`
    );
    setWordPairs(pairsOfSingleSubject.data);
  };
  //GET ALL SUBJECTS INTO STATE
  const retrievingData = async () => {
    const data = await axios.get(url);

    setSubject(data.data); //subject = [{id:1,subject_name:Animals},{id:2.......}]
    console.log(subject);
  };
  return (
    <Card className="Child">
      {username ? <div>Hello {username}</div> : null}
      <div className="text">Available:</div>
      <div className="subjectscontainer">
        {subject.map((singleSubject) => {
          return (
            <div key={singleSubject.id}>
              <div className="subjects" onClick={onShowingPairs}>
                {singleSubject.subject_name}
              </div>
            </div>
          );
        })}
      </div>

      {tableInUse !== '' ? (
        <div className="tableinusechild">Subject: {tableInUse}</div>
      ) : null}
      <Challenge
      startingscore={userscore}
        subject={tableInUse}
        pairs={wordPairs}
        className="challengeChild"
      />
    </Card>
  );
}

export default Child;
