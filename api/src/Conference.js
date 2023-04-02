
import { FieldValue } from "firebase-admin/firestore"
import {dbConnect,Collections} from "./dbConnect.js"
const db = dbConnect()

async function getCollection(collectionName,orderBy) {
  const documents = await db.collection(collectionName).orderBy(orderBy).get()
  const data = documents.docs.map(doc => ({ ...doc.data(), restId: doc.id }));
  return data
}

export async function getConferenceData(req, res) {
  const conferenceID = req.params.conferenceID 
  // todo. use this to parse the sessions by only those from this conference.
  const sessions = await getCollection(Collections.Sessions,'startTime')
  const tracks = await getCollection(Collections.Tracks,'trackName')
  const times = await getCollection(Collections.Times,'time')
  res.send({sessions,tracks,times})
}

export async function getAllTracks(req, res) {
  const tracks = await getCollection(Collections.Tracks,'trackName')
  res.send(tracks)
}


export async function getAllTimes(req, res) {
  const times = await getCollection(Collections.Times,'time')
  res.send(times)
}

export async function getAllSessions(req, res) {
  const sessions = await getCollection(Collections.Sessions,'startTime')
  res.send(sessions)
}