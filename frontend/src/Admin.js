import React from 'react';
import axios from 'axios';
import Card from './Card';
import { useState, useEffect } from 'react';
const Admin = () => {
  //using the form
  const [text, setText] = useState('');
  const [englishWord, setEnglishWord] = useState('');
  const [finnishWord, setFinnishWord] = useState('');
  const [tableInUse, setTableInUse] = useState('');
  //subject is the data retrieved from the table Subjects(subject_name)

  const [subject, setSubject] = useState([]);
  const [wordPairs, setWordPairs] = useState([]);
  const url = 'http://localhost:3000/admin/subjects';
  const onDeletingPairs = async (e) => {
    e.preventDefault();

    const idToDelete = e.currentTarget.id;
    const idToRefresh = e.currentTarget.name;
    const data = await axios.delete(
      `http://localhost:3000/admin/subjects/pairs?pairs=${idToDelete}`,
      {
        data: {
          pairs: idToDelete,
        },
      }
    );
    console.log(data);
    onShowingPairsAfterDeletion(idToDelete);
  };
  const onShowingPairsAfterDeletion = async (e) => {
    const parameter = e;
    console.log(parameter);
    const newWordPairs = [...wordPairs];
    const updatedPairs = newWordPairs.filter(
      (item) => item.id !== Number(parameter)
    );
    // setWordPairs([{ english: 'dog', finnish: 'koira' }]);
    console.log(updatedPairs);
    setWordPairs(updatedPairs);
  };

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
    onShowingSubjectAfterDeletion(id);
    console.log(data);
  };
  const onShowingSubjectAfterDeletion = (id) => {
    const parameter = id;
    console.log(parameter);
    const newSubjects = [...subject];
    const updatedSubjects = newSubjects.filter(
      (item) => item.id !== Number(parameter)
    );
    // setWordPairs([{ english: 'dog', finnish: 'koira' }]);
    console.log(newSubjects);
    setSubject(updatedSubjects);
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
  //WE WANT TO KNOW WHAT TABLE WE ARE WATCHING
  const storingSubjectName = (e) => {
    setTableInUse(e);
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
  //To CREATE a new PAIR
  const onCreatingPair = async (e) => {
    e.preventDefault();

    const data = await axios.post(
      'http://localhost:3000/admin/subjects/newpair',
      {
        english: englishWord,
        finnish: finnishWord,
        subject: tableInUse,
      }
    );

    retrievingUpdatedPairs(tableInUse, englishWord, finnishWord);
  };
  const retrievingUpdatedPairs = ({ tableInUse, english, finnish }) => {
    const updatePairs = [...wordPairs];
    console.log(updatePairs);
    updatePairs.push({ english: englishWord, finnish: finnishWord });
    setWordPairs(updatePairs);
  };
  const onEnglishWordInputValue = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setEnglishWord(e.target.value);
  };
  const onFinnishWordInputValue = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setFinnishWord(e.target.value);
  };
  //retrieves initial data to show the subjects
  useEffect(() => {
    retrievingData();
  }, []);
  const retrievingData = async () => {
    const data = await axios.get(url);

    setSubject(data.data);
  };
  console.log(wordPairs);
  return (
    <Card className="mainAdmin">
      <div className="subjectscontaineradmin">
        {subject.map((singleSubject) => {
          return (
            <div key={singleSubject.id}>
              <div className="subjectsadmin" onClick={onShowingPairs}>
                {singleSubject.subject_name}
              </div>
              <div className="deleteAsubject">
                <button
                  id={singleSubject.id}
                  onClick={onDeletingSubject}
                  className="delete-btn"
                >
                  x
                </button>
              </div>
            </div>
          );
        })}
        <form onSubmit={onCreatingSubject} className="creatingnewsubjectform">
          <label>new subject: </label>
          <input type="text" onChange={onInputValue}></input>
          <button type="submit">add a subject</button>
        </form>
      </div>
      <div className="separatoradmin"></div>
      <div className="mappingpairscontainer">
        {wordPairs.map((pairs) => {
          return (
            <div
              key={pairs.english}
              id={pairs.subject_id}
              className="adminpairscontainer"
            >
              <button
                name={pairs.subject_id}
                className="deletepairs"
                id={pairs.id}
                onClick={onDeletingPairs}
              >
                x
              </button>
              <div className="adminenglish">{pairs.english}</div>
              <div className="adminfinnish">{pairs.finnish}</div>
            </div>
          );
        })}
        {tableInUse !== '' ? (
          <form onSubmit={onCreatingPair}>
            <div className="addEnglishword">
              <label>english: </label>
              <input type="text" onChange={onEnglishWordInputValue}></input>
            </div>
            <div className="addFinnishword">
              <label>finnish: </label>
              <input type="text" onChange={onFinnishWordInputValue}></input>
            </div>
            <div className="addpair-btn">
              <button type="submit">add a word/pair</button>
            </div>
          </form>
        ) : null}
      </div>
    </Card>
  );
};
export default Admin;
