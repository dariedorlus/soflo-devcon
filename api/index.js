import functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import {
  getAllSessions,
  getConferenceData,
  getAllTracks,
  getAllTimes,
} from './src/conference.js';

const app = express();
app.use(cors());

app.get('/test', (req, res) => {
  res.send('The leads api es connected');
});

//API points for talks
app.get('/api/conferences/:conferenceID', getConferenceData);
app.get('/conferences/:conferenceID', getConferenceData);

app.get('/api/sessions/:conferenceID', getAllSessions);
app.get('/sessions/:conferenceID', getAllSessions);

app.get('/api/times/:conferenceID', getAllTimes);
app.get('/times/:conferenceID', getAllTimes);

app.get('/api/tracks/:conferenceID', getAllTracks);
app.get('/tracks/:conferenceID', getAllTracks);

app.get('/', (req, res) => {
  res.send('Nope...');
});
app.get('/api', (req, res) => {
  res.send('Nope...');
});

export const api = functions.https.onRequest(app);
