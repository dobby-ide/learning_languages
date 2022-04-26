import React from 'react';
import Card from './Card';
import axios from 'axios';
import { useEffect, useState } from 'react';
const Switch = ({ onPassingFirstLanguage, onPassingSecondLanguage }) => {
  const [firstChoice, setFirstChoice] = useState('');
  const [secondChoice, setSecondChoice] = useState('');
  let languages = ['english', 'finnish'];
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
    <Card className="cardswitch">
      <div></div>
      <div>
        <p>choose language you want to translate from:</p>
        <select onChange={selectFirstLanguage} className="dropdown">
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
      {firstChoice !== '' ? (
        <div>
          <p>choose language you want to translate into:</p>
          <select onChange={selectSecondLanguage}>
            {' '}
            <option defaultValue={'choose the second language'}></option>
            {newLanguages.map((language) => {
              return (
                <option key={language} value={language}>
                  {language}
                </option>
              );
            })}
          </select>
          <button onClick={sendingChoices} className="chooseLanguages-btn">
            ok
          </button>
        </div>
      ) : null}
    </Card>
  );
};
export default Switch;
