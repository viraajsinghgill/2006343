const express = require('express');
const app = express();
const cors = require('cors');

const port = 4000;
app.use(cors({
    origin:'http://localhost:3000'
}));


const alltrains = [
    {
      "trainName": "Chennai Exp",
      "trainNumber": "2344",
      "departureTime": {
        "Hours": 21,
        "Minutes": 35,
        "Seconds": 0
      },
      "seatsAvailable": {
        "sleeper": 3,
        "AC": 1
      },
      "price": {
        "sleeper": 2,
        "AC": 5
      },
      "delayedBy": 15
    },
    {
      "trainName": "Hyderabad Exp",
      "trainNumber": "2341",
      "departureTime": {
        "Hours": 23,
        "Minutes": 55,
        "Seconds": 0
      },
      "seatsAvailable": {
        "sleeper": 6,
        "AC": 7
      },
      "price": {
        "sleeper": 554,
        "AC": 1854
      },
      "delayedBy": 5
    }
  ]

app.get('/train/trains',(req,res) => {
    res.send(alltrains);
})


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
