import './App.css';
import Child from './Child';
import './Admin';
import Card from './Card';
import Admin from './Admin';
import Filter from './Filter';
import { useState } from 'react';
import Login from './Login';
function App() {
  const [user, setUser] = useState('');
  const [userScore, setUserScore] = useState(0);

  const [childIsVisible, setChildIsVisible] = useState(false);
  const [adminIsVisible, setAdminIsVisible] = useState(false);
  const onChildVisibility = () => {
    setChildIsVisible(true);
    setAdminIsVisible(false);
  };
  const onAdminVisibility = () => {
    setChildIsVisible(false);
    setAdminIsVisible(true);
  };
  //gets the current logged in name and score
  const usingLoginData = (user, score) => {
    setUserScore(score);
    setUser(user);
  };
  return (
    <Card className="Appjs">
     
      <Login logindata={usingLoginData}></Login>
      <Filter
        className="filter"
        changeChildVisibility={onAdminVisibility}
        changeAdminVisibility={onChildVisibility}
      ></Filter>
      {childIsVisible ? <Admin /> : null}
      {adminIsVisible ? <Child username={user} userscore={userScore} /> : null}
    </Card>
  );
}

export default App;
