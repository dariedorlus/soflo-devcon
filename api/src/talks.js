
import { FieldValue } from "firebase-admin/firestore"
import dbConnect from "./dbConnect.js"
const TalksCollection = 'Talks'
const db = dbConnect()


// Get All
export async function getAllTalks(req, res) {
  const documents = await db.collection(TalksCollection).get() //.orderBy('createdAt', 'desc').get()
  const talks = documents.docs.map(doc => ({ ...doc.data(), restId: doc.id }));
  res.send(talks)
}