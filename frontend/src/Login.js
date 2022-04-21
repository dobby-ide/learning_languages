import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
//login or register as a user/Child functionalities
const Login = ({ logindata }) => {
  const url = 'http://localhost:3000/login/users';
  const urlRegister = 'http://localhost:3000/register/users';
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
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
        logindata(users[i].user, users[i].score);
      }
      console.log(users[i]);
    }
  };
  const onLogin = (e) => {
    e.preventDefault();
    checklogin();

    console.log(e.target);
  };
  const register = async () => {
    const data = await axios.post(urlRegister, {
      data: {
        newuser: userName,
        newpassword: password,
      },
    });
    retrievingData();
  };
  const onRegister = (e) => {
    e.preventDefault();
    register();
  };
  return (
    <Card>
      <div className="register">
        PLEASE REGISTER:
        <form onSubmit={onRegister}>
          <label>user</label>
          <input type="text" id="userName" onChange={onUserName}></input>
          <label>password</label>
          <input type="text" id="password" onChange={onPassword}></input>
          <button type="submit">send</button>
        </form>
      </div>
      <div className="login">
        or login:
        <form onSubmit={onLogin}>
          <label>user</label>
          <input type="text" id="userName" onChange={onUserName}></input>
          <label>password</label>
          <input type="text" id="password" onChange={onPassword}></input>
          <button type="submit">send</button>
        </form>
      </div>
    </Card>
  );
};
export default Login;
