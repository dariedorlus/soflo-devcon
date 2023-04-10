import { dbConnect, Collections } from './dbConnect.js';
const db = dbConnect();

async function getCollection(collectionName, orderBy) {
  const documents = await db.collection(collectionName).orderBy(orderBy).get();
  const data = documents.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return data;
}

export async function getConferenceData(req, res) {
  const conferenceID = req.params.conferenceID;
  // todo. use this to parse the sessions by only those from this conference.
  const sessions = await getCollection(Collections.Sessions, 'timeOrder');
  const tracks = await getCollection(Collections.Tracks, 'trackName');
  const times = await getCollection(Collections.Times, 'order');
  res.send({ sessions, tracks, times });
}

export async function getAllSessions(req, res) {
  const conferenceID = req.params.conferenceID;
  // todo. use this to parse the sessions by only those from this conference.
  const sessions = await getCollection(Collections.Sessions, 'timeOrder');
  res.send(sessions);
}

export async function getAllTracks(req, res) {
  const conferenceID = req.params.conferenceID;
  // todo. use this to parse the sessions by only those from this conference.
  const tracks = await getCollection(Collections.Tracks, 'trackName');
  res.send(tracks);
}

export async function getAllTimes(req, res) {
  const conferenceID = req.params.conferenceID;
  // todo. use this to parse the sessions by only those from this conference.
  const times = await getCollection(Collections.Times, 'order');
  res.send(times);
}


