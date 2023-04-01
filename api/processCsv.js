
import { FieldValue } from "firebase-admin/firestore"
import {dbConnect,Collections} from "./src/dbConnect.js"
import fs  from "fs";
import { parse } from "csv-parse";
const db = dbConnect()

// Start by clearing out all the Sessions in firebase
firebase.firestore().collection(collections.Sessions).listDocuments().then(docs => {
    docs.map((doc) => {
        doc.delete()
    })
})


/* 

Lookup example of a session object
    {
      "conferenceID": 1,
      "conferenceName": "SoFlo Dev Con 2023",
      "category": "MOBILE APP DEVELOPMENT",
      "topic": "KEYNOTE - Quantative Trading Platform Technology",
      "speakerID": "123",
      "speakernName": "Yael Mayfield From Schonfled",
      "speakerDescription": "Great guy. Great Guy.",
      "speakerSocial": [
        { "name": "LinkedIn", "uri": "https://linkedin.com/in/damianmontero" },
        { "name": "Twitter", "uri": "https://twitter.com/damianmontero" }
      ],
      "speakerPicture": "https://techhubsouthflorida.org/wp-content/uploads/2022/04/William-Hahn-Ph.D-500x500.png",
      "date": "04/16/2023",
      "startTime": "12:30PM",
      "talkLengthInMinutes": 50,
      "session": 1,
      "roomName": "Room 3000 (live) - Room 1124 (overflow)",
      "floor": "1",
      "status": "confirmed"
    }
*/

let TrackNames = [];
const TrackNamesOnLine = 4
let Sessions = []



// Parse the Tracks.csv file and pull out the Sessions, Speakers and Times
let LineNumber = TrackNamesOnLine;  // we start from line 2
fs.createReadStream("./tracks.csv")
  .pipe(parse({ delimiter: ",", from_line: TrackNamesOnLine }))
  .on("data", function (row) {
    if (LineNumber == 4) {
        // We are on the Track Names. Let's add them 
        //console.log("Track names",row)
        for (let i = 0;i < row.length;i++) {
                TrackNames.push(row[i])
            }
    }
    if (row[0]) { // We have sometime in the first column (first line of time) 
        if (row[0].indexOf("min") == -1 && row[0].indexOf("LUNCH") == -1) {
            console.log("Parsing: ",row)

            if (row[0].indexOf("-") == -1) {
                // We have the title of the session (i.e. SESSION 2 or "LUNCH")
                // Go through each column starting from the 3th (2) one
                Sessions = []; // reset the sesstions
                console.log("It's a time",row.length)
                for (let x =2; x<row.length;x++) {

                    // Get the Track Name by the column
                    const SessionsTrackName = TrackNames[x]
                   
                    console.log("working:",SessionsTrackName)
                    const newSession = { 
                        "conferenceID": 1,
                        "conferenceName": "SoFlo Dev Con 2023",
                        "category": SessionsTrackName,
                        "title": "", // dont' know this until the next line
                        "speakerID": "",
                        "speakernName": row[x],
                        "speakerDescription": "",
                        "speakerSocial": [
                        // { "name": "LinkedIn", "uri": "https://linkedin.com/in/damianmontero" },
                        // { "name": "Twitter", "uri": "https://twitter.com/damianmontero" }
                        ],
                        "speakerPicture": "",
                        "date": "04/15/2023",
                        "startTime": "",
                        "talkLengthInMinutes": 60,
                        "session": 1,
                        "roomName": "",
                        "floor": "",
                        "status": "confirmed"
                    }
                    Sessions.push(newSession)
                }

            } else {
                    // We have a time, and not the "15min" lines
                    // Go through each column starting from the 3th (2) one
                    // console.log("Sessions so far:",Sessions)
                    for (let x =2; x<row.length;x++) {
                        Sessions[x-2].title = row[9] // Description of talk/ session
                        let startTime = row[0]
                        Sessions[x-2].startTime = row[0] // Time of talk or session
                    }

                    // console.log("Sessions so far:",Sessions)
                    for (let x = 0; x < Sessions.length;x++) {
                        db.collection(Collections.Sessions).add(Sessions[x]) // While we are waiting for the promise...
                        .catch(err => {
                            console.log(err)
                            process.exit(1)
                        })
                    }

            }
            //console.log(row);
        }
    }
    LineNumber++;
  })
  .on("end",function() {

    console.log("TrackNames",TrackNames)
    console.log("Sessions", Sessions)
  })


