import './App.css';
import Child from './Child';
import './Admin';
import Card from './Card';
import Admin from './Admin';
import Filter from './Filter';
import { useState } from 'react';
import Login from './Login';
import Switch from './Switch';
import Congratulations from './Congratulations';
function App() {
  console.log(process.env.NODE_ENV);
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
  //gets the current logged in name and score
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
  return (
    <Card className="Appjs">
      {secondChoice ? (
        <Filter
          className="filter"
          changeChildVisibility={onAdminVisibility}
          changeAdminVisibility={onChildVisibility}
          changeRegisterVisibility={onRegisterVisibility}
        ></Filter>
      ) : null}
      {congratsIsVisible ? (
        <Congratulations userscore={userScore} username={user} />
      ) : null}
      {registerIsVisible ? <Login logindata={usingLoginData} /> : null}
      {childIsVisible ? (
        <Admin firstlanguage={firstChoice} secondlanguage={secondChoice} />
      ) : null}
      {adminIsVisible ? (
        <Child
          firstChoice={firstChoice}
          secondChoice={secondChoice}
          username={user}
          userscore={userScore}
          back={backToHome}
          setUserScore={getUserScore}
        />
      ) : null}
      {!secondChoice ? (
        <Switch
          className="switch"
          onPassingFirstLanguage={onFirstLanguage}
          onPassingSecondLanguage={onSecondLanguage}
        ></Switch>
      ) : null}
    </Card>
  );
}

export default App;
