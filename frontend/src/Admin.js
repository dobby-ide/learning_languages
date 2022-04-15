import React from 'react';
import axios from 'axios';

import { useState, useEffect } from 'react';
const Admin = () => {
  const [subject, setSubject] = useState([]);
  const url = 'http://localhost:3000/admin/subjects';
  useEffect(() => {
    retrievingData();
  }, []);
  const retrievingData = async () => {
    const data = await axios.get(url);

    setSubject(data.data);
    console.log(subject);
  };
  return (
    <div>
      {subject.map((singleSubject) => {
        return <div key={singleSubject.id}>{singleSubject.subject_name}</div>;
      })}
      <button onClick={retrievingData}></button>
    </div>
  );
};
export default Admin;
