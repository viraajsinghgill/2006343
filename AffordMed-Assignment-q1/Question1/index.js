const express = require('express');
const axios = require('axios');
const app = express();
const port = 3002;


const companyName = 'Train Central';
const ownerName = 'viraaj';
const rollNo = '2006343';
const ownerEmail = 'viraajgill2@gmail.com';
const accessCode = 'oJnNPG';

let token;

async function getToken() {
    try {
      const registerResponse = await axios.post('http://20.244.56.144/train/register', {
        companyName,
        ownerName,
        rollNo,
        ownerEmail,
        accessCode,
      });
      const { clientID, clientSecret } = registerResponse.data;
      const authResponse = await axios.post('http://20.244.56.144/train/auth', {
        companyName,
        clientID,
        clientSecret,
        ownerName,
        ownerEmail,
        rollNo,
      });
      token = authResponse.data.access_token;
    } catch (error) {
      console.error(error);
    }
  }

  async function getAllTrains() {
    try {
      const response = await axios.get('http://20.244.56.144/train/trains', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  function filterAndSortTrains(trains) {
    trains = Object.values(trains);
    const currentTime = new Date();
    const twelveHoursLater = new Date(currentTime.getTime() + 12 * 60 * 60 * 1000);
    return trains.filter((train) => {
        const departureTime = new Date(
          currentTime.getFullYear(),
          currentTime.getMonth(),
          currentTime.getDate(),
          train.departureTime.Hours,
          train.departureTime.Minutes,
          train.departureTime.Seconds
        );
        departureTime.setMinutes(departureTime.getMinutes() + train.delayedBy);
        return (
          departureTime > currentTime &&
          departureTime < twelveHoursLater &&
          departureTime > new Date(currentTime.getTime() + 30 * 60 * 1000)
        );
      })
      .sort((a, b) => {
        if (a.price.sleeper !== b.price.sleeper) return a.price.sleeper - b.price.sleeper;
        if (a.seatsAvailable.sleeper !== b.seatsAvailable.sleeper)
          return b.seatsAvailable.sleeper - a.seatsAvailable.sleeper;
        const aDepartureTime = new Date(
          currentTime.getFullYear(),
          currentTime.getMonth(),
          currentTime.getDate(),
          a.departureTime.Hours,
          a.departureTime.Minutes,
          a.departureTime.Seconds
        );
        aDepartureTime.setMinutes(aDepartureTime.getMinutes() + a.delayedBy);
        const bDepartureTime = new Date(
          currentTime.getFullYear(),
          currentTime.getMonth(),
          currentTime.getDate(),
          b.departureTime.Hours,
          b.departureTime.Minutes,
          b.departureTime.Seconds
        );
        bDepartureTime.setMinutes(bDepartureTime.getMinutes() + b.delayedBy);
        return bDepartureTime - aDepartureTime;
      });
  }
  async function getTrainDetails(trainNumber) {
    try {
      const response = await axios.get(`http://20.244.56.144/train/trains/${trainNumber}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  
app.get('/', async (req, res) => {
  if (!token) await getToken();
  const trains = await getAllTrains();

  if (!Array.isArray(trains)) {
    return res.status(500).json({ error: 'Trains data is not in the correct format.',type: typeof trains });
  }

  const filteredAndSortedTrains = filterAndSortTrains(trains);
  res.json(filteredAndSortedTrains);
});

app.get('/:trainNumber', async (req, res) => {
  if (!token) await getToken();
  const trainNumber = req.params.trainNumber;
  const trainDetails = await getTrainDetails(trainNumber);
  res.json(trainDetails);
});

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
  });