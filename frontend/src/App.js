import './App.css';
import Child from './Child';
import './Admin';
import Card from './Card';
import Admin from './Admin';
import Filter from './Filter';
import { useState } from 'react';
import Login from './Login';
import Congratulations from './Congratulations';
function App() {
  const [user, setUser] = useState('');
  const [userScore, setUserScore] = useState(0);

  const [childIsVisible, setChildIsVisible] = useState(false);
  const [adminIsVisible, setAdminIsVisible] = useState(false);
  const [registerIsVisible, setRegisterIsVisible] = useState(false);
  const [congratsIsVisible, setcongratsIsVisible] = useState(false);
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
  return (
    <Card className="Appjs">
      <Filter
        className="filter"
        changeChildVisibility={onAdminVisibility}
        changeAdminVisibility={onChildVisibility}
        changeRegisterVisibility={onRegisterVisibility}
      ></Filter>
      {congratsIsVisible ? <Congratulations userscore={userScore} username={user}/> : null}
      {registerIsVisible ? <Login logindata={usingLoginData} /> : null}
      {childIsVisible ? <Admin /> : null}
      {adminIsVisible ? (
        <Child
          username={user}
          userscore={userScore}
          back={backToHome}
          setUserScore={getUserScore}
        />
      ) : null}
    </Card>
  );
}

export default App;
