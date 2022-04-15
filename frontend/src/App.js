import './App.css';
import axios from 'axios';

import { useState, useEffect } from 'react';
function App() {
  const [subject, setSubject] = useState([]);
  const url = 'http://localhost:3000/admin/subjects';
  useEffect(() => {
    retrievingData();
  }, []);
  const retrievingData = async () => {
    const data = await axios.get('http://localhost:3000/admin/subjects');

    setSubject(data.data);
    console.log(subject);
  };

  return (
    <div className="App">
      {subject.map((singleSubject) => {
        return <div>{singleSubject.subject_name}</div>;
      })}
      <button onClick={retrievingData}></button>
    </div>
  );
}

export default App;
