import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { service_account } from './secrets.js';

export const Collections = {
  Sessions: 'Sessions',
  Conferences: 'Conferences',
  Times: 'Times',
  Tracks: 'Tracks',
  Speakers: 'Speakers',
};

export function dbConnect() {
  // check if NOT connected
  if (!getApps().length) {
    // connect
    initializeApp({
      credential: cert(service_account),
    });
  }
  // return db-connection
  return getFirestore();
}
