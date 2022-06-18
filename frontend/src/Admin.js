import React from 'react';
import axios from 'axios';
import Card from './Card';
import { useState, useEffect } from 'react';
const Admin = ({ firstlanguage, secondlanguage }) => {
  //using the form
  let port = '';
  if (process.env.NODE_ENV === 'development') {
    port = 'http://localhost:3000';
  }
  const [text, setText] = useState('');
  const [firstWord, setFirstWord] = useState('');
  const [secondWord, setSecondWord] = useState('');
  const [tableInUse, setTableInUse] = useState('');
  //subject is the data retrieved from the table Subjects(subject_name)

  const [subject, setSubject] = useState([]);
  const [wordPairs, setWordPairs] = useState([]);

  const [patchWord, setPatchWord] = useState('');

  const onDeletingPairs = async (e) => {
    e.preventDefault();

    const firstWordtoDelete = e.currentTarget.id;
    const secondWordToDelete = e.currentTarget.name;
    const data = await axios.delete(
      `${port}/admin/subjects/pairs?firstword=${firstWordtoDelete}&secondword=${secondWordToDelete}&firstlanguage=${firstlanguage}&secondlanguage=${secondlanguage}`
    );
    console.log(data);
    onShowingPairsAfterDeletion(firstWordtoDelete, secondWordToDelete);
  };
  const onShowingPairsAfterDeletion = async (first, second) => {
    const parameter = first;
    console.log(parameter);
    const newWordPairs = [...wordPairs];
    const updatedPairs = newWordPairs.filter(
      (item) => item[firstlanguage] !== parameter
    );
    // setWordPairs([{ english: 'dog', finnish: 'koira' }]);
    console.log(updatedPairs);
    setWordPairs(updatedPairs);
  };

  const onDeletingSubject = async (e) => {
    e.preventDefault();
    const id = e.currentTarget.id;
    const data = await axios.delete(
      `${port}/admin/subjects/subject?subject=${id}`,
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
      `${port}/admin/subjects/subject?subject=${parameter}&firstlanguage=${firstlanguage}&secondlanguage=${secondlanguage}`
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
    const data = await axios.post(`${port}/admin/subjects`, {
      newsubject: text,
    });
    console.log(data);
    retrievingData();
  };
  //To CREATE a new PAIR
  const onCreatingPair = async (e) => {
    e.preventDefault();

    const data = await axios.post(`${port}/admin/subjects/newpair`, {
      firstlanguage: firstlanguage,
      secondlanguage: secondlanguage,
      subject: tableInUse,
      firstword: firstWord,
      secondword: secondWord,
    });

    retrievingUpdatedPairs();
  };
  const retrievingUpdatedPairs = () => {
    console.log(tableInUse);
    const updatePairs = [...wordPairs];
    console.log(updatePairs);
    updatePairs.push({
      [firstlanguage]: firstWord,
      [secondlanguage]: secondWord,
    });
    setWordPairs(updatePairs);
  };
  const onEnglishWordInputValue = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setFirstWord(e.target.value);
  };
  const onFinnishWordInputValue = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setSecondWord(e.target.value);
  };
  //retrieves initial data to show the subjects
  useEffect(() => {
    retrievingData();
  }, []);
  const retrievingData = async () => {
    const data = await axios.get(`${port}/admin/subjects`);

    setSubject(data.data);
  };

  const patchSingleWord = (e) => {
    e.preventDefault();
    const word = e.target.value;
    setPatchWord(word);
  };

  const sendPatch = async (e) => {
    console.log(e.currentTarget.name);
    const existingWord = e.currentTarget.name;
    const languageTable = e.currentTarget.id;
    let theOtherLanguage = '';
    if (languageTable === firstlanguage) {
      theOtherLanguage = secondlanguage;
    } else {
      theOtherLanguage = firstlanguage;
    }

    const data = await axios.post(`${port}/put`, {
      newword: patchWord,
      existingword: existingWord,
      languageToPatch: languageTable,
      firstlanguage: firstlanguage,
      secondlanguage: secondlanguage,
      theotherlanguage: theOtherLanguage,
    });

    //IMPLEMENT CODE HERE
    let updatingWordPairs = wordPairs;
    let newWordPairs = updatingWordPairs.push({
      firstlanguage: existingWord,
      secondlanguage: patchWord,
    });

    setWordPairs(newWordPairs);
  };
  const placeholder = `add the ${secondlanguage} word`;
  console.log(wordPairs);
  console.log(firstlanguage);

  ////////////////////////RETURN///////////////////////////////////
  return (
    <Card className="mainAdmin">
      <div className="subjectscontaineradmin">
        {subject.map((singleSubject) => {
          return (
            <div key={singleSubject.id} className="adminsubject-container">
              <div className="subjectsadmin" onClick={onShowingPairs}>
                {singleSubject.subject_name}
              </div>
              <div className="deleteAsubject">
                <button
                  id={singleSubject.id}
                  onClick={onDeletingSubject}
                  className="delete-btn"
                >
                  &times;
                </button>
              </div>
            </div>
          );
        })}
        <form onSubmit={onCreatingSubject} className="admin__subjectform">
          <label>new subject: </label>
          <input
            type="text"
            onChange={onInputValue}
            className="admin__subjectform--input"
          ></input>
          <button type="submit" className="admin__subjectform--btn">
            create
          </button>
        </form>
      </div>
      <div className="mappingpairscontainer">
        {wordPairs.map((pairs) => {
          return (
            <div
              key={pairs[firstlanguage]}
              id={pairs[secondlanguage]}
              className="mappingpairscontainer__grid"
            >
              {pairs[firstlanguage] && pairs[secondlanguage] ? (
                <button
                  name={pairs[secondlanguage]}
                  className="mappingpairscontainer__grid--deletebtn"
                  id={pairs[firstlanguage]}
                  onClick={onDeletingPairs}
                >
                  x
                </button>
              ) : (
                <div className="deletepairs"></div>
              )}
              <div className="admin__firstlanguageword">
                {pairs[firstlanguage]}
              </div>
              {pairs[secondlanguage] ? (
                <div className="admin__secondlanguageword">
                  {pairs[secondlanguage]}
                </div>
              ) : (
                <div className="admin__secondlanguage input">
                  <input
                    type="text"
                    onChange={patchSingleWord}
                    placeholder={placeholder}
                  ></input>
                  <button
                    onClick={sendPatch}
                    name={pairs[firstlanguage]}
                    id={secondlanguage}
                  >
                    ok
                  </button>
                </div>
              )}
            </div>
          );
        })}
        {tableInUse !== '' ? (
          <div className="admin__addpairs--form_grid">
            <form onSubmit={onCreatingPair} className="admin__addpairs--form">
              <div className="admin__addpairs--form_firstlanguage">
                <label>{firstlanguage} </label>
                <input
                  type="text"
                  onChange={onEnglishWordInputValue}
                  className="admin__addpairs--form--input"
                ></input>
              </div>
              <div className="admin__addpairs--form_secondlanguage">
                <label>{secondlanguage} </label>
                <input
                  type="text"
                  onChange={onFinnishWordInputValue}
                  className="admin__addpairs--form--input"
                ></input>
              </div>
              <div className="addpair-div">
                <button type="submit" className="addpair-div_btn">
                  add a word/pair
                </button>
              </div>
            </form>
          </div>
        ) : null}
      </div>
    </Card>
  );
};
export default Admin;
