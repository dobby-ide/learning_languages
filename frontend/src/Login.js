import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
//login or register as a user/Child functionalities
const Login = ({ logindata }) => {
  const url = '/login/users';
  const urlRegister = '/register/users';
  const [registrationIsValid, setRegistrationValid] = useState(true);
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccessLogin, setIsSuccessLogin] = useState(false);
  const [registerIsShort, setRegisterIsShort] = useState(false);
  //retrieves an initial state where we get some data from User table (used both for Login and Registration);
  useEffect(() => {
    retrievingData();
  }, []);
  const retrievingData = async () => {
    const data = await axios.get(url);
    setUsers(data.data);
    console.log(users);
  };
  console.log(users);
  const onUserName = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setUserName(e.target.value);
  };
  const onPassword = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setPassword(e.target.value);
  };
  const checklogin = (user, pass) => {
    for (let i in users) {
      if (userName === users[i].user && password === users[i].pass) {
        console.log('ACCess GRANTED');
        //then access granted.. username needs to be passed to App.js
        //and score too
        setIsSuccessLogin(true);
        logindata(users[i].user, users[i].score);
        return;
      }
      setIsSuccessLogin(false);
      logindata('', 0);
    }
  };
  const onLogin = (e) => {
    e.preventDefault();
    checklogin();
  };
  const register = async () => {
    if (userName.length < 3 || password.length < 3) {
      console.log('too short user or pass');
      setRegisterIsShort(true);
    } else {
      setRegisterIsShort(false);
      const data = await axios.post(urlRegister, {
        data: {
          newuser: userName,
          newpassword: password,
        },
      });
      console.log(data.data);
      if (data.data.code === 'ER_DUP_ENTRY') {
        setRegistrationValid(false);
        console.log(
          'USERNAME IS IN USE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
        );
      } else {
        setRegistrationValid(true);
      }
      retrievingData();
    }
  };
  const onRegister = (e) => {
    e.preventDefault();
    register();
  };
  return (
    <Card className="loginregistercard">
      <div className="randomshape"></div>
      <div className="register">
        New User, register.
        <form onSubmit={onRegister}>
          <label>user: </label>
          <input
            type="text"
            id="userName"
            onChange={onUserName}
            placeholder="username"
          ></input>
          <label>password: </label>
          <input
            type="text"
            id="password"
            onChange={onPassword}
            placeholder="password"
          ></input>
          <button type="submit">send</button>
        </form>
        {!registrationIsValid ? (
          <div>user name already exist</div>
        ) : registerIsShort ? (
          <div>too short user or pass(minimum 4)</div>
        ) : null}
      </div>
      <div className="login">
        Existing User, login:
        <form onSubmit={onLogin}>
          <label>user: </label>
          <input
            type="text"
            id="userName"
            onChange={onUserName}
            placeholder="username"
          ></input>
          <label>password: </label>
          <input
            type="text"
            id="password"
            onChange={onPassword}
            placeholder="password"
          ></input>
          <button type="submit">send</button>
          <div>{isSuccessLogin ? <p>successfully logged in</p> : null}</div>
        </form>
      </div>
    </Card>
  );
};
export default Login;
