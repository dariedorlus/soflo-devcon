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

function logging(req, res, next) {
  let ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  functions.logger.log(req.method, "on", req.originalUrl,"from ip: ",ipAddress);
  next(); 
}


//API points for talks
app.get('/api/conferences/:conferenceID', logging, getConferenceData);
app.get('/conferences/:conferenceID', logging, getConferenceData);

app.get('/api/sessions/:conferenceID',logging,  getAllSessions);
app.get('/sessions/:conferenceID', logging, getAllSessions);

app.get('/api/times/:conferenceID',logging,  getAllTimes);
app.get('/times/:conferenceID', logging, getAllTimes);

app.get('/api/tracks/:conferenceID', logging, getAllTracks);
app.get('/tracks/:conferenceID', logging, getAllTracks);

app.get('/',logging, (req, res) => {
  res.send('Nope...');
});
app.get('/api',logging, (req, res) => {
  res.send('Nope...');
});

export const api = functions.https.onRequest(app);




