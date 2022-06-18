import React from 'react';
import Card from './Card';

import { useState } from 'react';

//SWITCH WILL SEND TO App.js THE TWO LANGUAGES CHOSEN (THIS IS THE "ENTRANCE" OF THE APPLICATION FOR ANY USE, so the whole application will be set up to work on two languages at a time)
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
    <Card className="switch">
      <div className="switch__main">
        <p className="switch__main-paragraph">
          choose language you want to translate from:
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
      {firstChoice !== '' ? (
        <div>
          <p className="switch__main-paragraph">
            choose language you want to translate into:
          </p>
          <select
            onChange={selectSecondLanguage}
            className="switch__dropdown dropdown-second"
          >
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
