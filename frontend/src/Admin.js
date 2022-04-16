import React from 'react';
import axios from 'axios';
import Card from './Card';
import { useState, useEffect } from 'react';
const Admin = () => {
  //using the form
  const [text, setText] = useState('');
  //subject is the data retrieved from the table Subjects(subject_name)

  const [subject, setSubject] = useState([]);
  const [wordPairs, setWordPairs] = useState([]);
  const url = 'http://localhost:3000/admin/subjects';
const onDeletingSubject = async (e) => {
  e.preventDefault();
  const id = e.currentTarget.id;
  const data = await axios.delete(
    `http://localhost:3000/admin/subjects/subject?subject=${id}`,
    {
      data: {
        newsubject: e.currentTarget.id,
      },
    }
  );
  console.log(data);
  retrievingData();
};
const onShowingPairs = async (e) => {
  e.preventDefault();
  console.log(e.target.innerHTML);
  const parameter = e.target.innerHTML;
  const pairsOfSingleSubject = await axios.get(
    `http://localhost:3000/admin/subjects/subject?subject=${parameter}`
  );
  setWordPairs(pairsOfSingleSubject.data);
};
//READING INPUT FROM new subject form
const onInputValue = (e) => {
  e.preventDefault();
  console.log(e.target.value);
  setText(e.target.value);
};
const onCreatingSubject = async (e) => {
  e.preventDefault();
  const data = await axios.post(url, {
    newsubject: text,
  });
  console.log(data);
  retrievingData();
};

//retrieves initial data to show the subjects
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
          <div key={singleSubject.id}>
            <div className="subjects" onClick={onShowingPairs}>
              {singleSubject.subject_name}
            </div>
            <button id={singleSubject.id} onClick={onDeletingSubject}>
              x
            </button>
          </div>
        );
      })}
      <form onSubmit={onCreatingSubject}>
        <label>new subject: </label>
        <input type="text" onChange={onInputValue}></input>
        <button type="submit">add a subject</button>
      </form>
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
