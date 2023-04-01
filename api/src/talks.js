
import { FieldValue } from "firebase-admin/firestore"
import {dbConnect,Collections} from "./dbConnect.js"
const db = dbConnect()


// Get All
export async function getAllTalks(req, res) {
  const documents = await db.collection(Collections.Sessions).get() //.orderBy('createdAt', 'desc').get()
  const talks = documents.docs.map(doc => ({ ...doc.data(), restId: doc.id }));
  res.send(talks)
}