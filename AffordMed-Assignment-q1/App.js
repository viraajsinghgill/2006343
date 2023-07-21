import React, { useState } from 'react';
import Axios from 'axios';
const App = () => {
  const [trains, setTrains] = useState('All');

  const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODk5MzQ1MTgsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiZDg4ODM1ODItNjA5Ny00NDZlLTkyNDQtZTIyYzRiOGQ4N2Q4Iiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IjIwMDYzNDMifQ.hrdSDIhiLNUpFiMk8wPsYL9wO3qscHRspq82L6CHC9o'; 
  const headers = {
  Authorization: `Bearer ${access_token}`,
};
try {
  const url = 'http://20.244.56.144/train/trains';
  const response =  Axios.get(url, { headers });
  console.log(response.data);
  setTrains([...trains,response.data]);
}
catch(err){
  alert("Server Error!");
}
  return (
    <div style={{backgroundColor:'orchid', height:'100%'}}>
      <center>
      <h1>Train Schedule</h1>
      </center>
      {trains.map((i) => (
          <p>{i}</p>))}
    </div>
      )
};
export default App;