import {dbConnect,Collections} from "../src/dbConnect.js"
import fs  from "fs";
import { parse } from "csv-parse";
const db = dbConnect()

// SoFloDevCon
const TrackNamesOnLine = 4 // Session Names start on line 4 (5th one)
const colSessionsStart = 2 // the sessions start on column 2 (3rd one)
const csvFileURI = "./tracks.csv" // name of soFloDevCon tracks file
const dateOfEvent = "2023-04-15"

function ClearCollection(collection) {
    db.collection(collection).listDocuments().then(docs => {
        docs.map((doc) => {
            doc.delete()
        })
    })
}

// Start by clearing out all the Sessions in firebase
ClearCollection(Collections.Times)
ClearCollection(Collections.Tracks)
ClearCollection(Collections.Sessions)


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
let Sessions = []
let TimeSlots = new Set(); // set



// Parse the Tracks.csv file and pull out the Sessions, Speakers and Times
let LineNumber = TrackNamesOnLine;  // we start from line 2
fs.createReadStream(csvFileURI)
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
            //console.log("Parsing: ",row)

            if (row[0].indexOf("-") == -1) {
                // We have the title of the session (i.e. SESSION 2 or "LUNCH")
                // Go through each column starting from the 3th (2) one
                Sessions = []; // reset the sesstions
                //console.log("It's a time",row.length)
                for (let x = colSessionsStart; x<row.length;x++) {

                    // Get the Track Name by the column
                    const SessionsTrackName = TrackNames[x]
                   
                    const newSession = { 
                        "conferenceID": 1,
                        "conferenceName": "SoFlo Dev Con 2023",
                        "category": SessionsTrackName,
                        "title": "", // dont' know this until the next line
                        "speakerID": "",
                        "speakerName": row[x],
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
                        "roomName": "TBD",
                        "floor": "TBD",
                        "status": "confirmed"
                    }
                    Sessions.push(newSession)
                }

            } else {
                    // We have a time, and not the "15min" lines
                    // Go through each column starting from the 3th (2) one
                    // console.log("Sessions so far:",Sessions)
                    for (let x =2; x<row.length;x++) {
                        Sessions[x-2].title = row[x] // Description of talk/ session
                        if (row[0]) {
                            let sessionTime = (row[0].substr(0,row[0].indexOf(" - "))).replace(" ","").replace("AM","").replace("PM","")
                            //console.log("sessionTime",sessionTime)
                            let firstpartOfTime = sessionTime.substr(0,sessionTime.indexOf(":"))
                            let secdondePartOfTime = sessionTime.substr(sessionTime.indexOf(":"))
                            firstpartOfTime = Number(firstpartOfTime) <= 7 ? Number(firstpartOfTime)+12 : "0"+firstpartOfTime
                            if (firstpartOfTime == "011") {
                                firstpartOfTime = "11"
                            }
                            const dateString = dateOfEvent  + " " + firstpartOfTime + secdondePartOfTime 
                            console.log("firstpartOfTime",firstpartOfTime)
                            const startTime = new Date(Date.parse(dateOfEvent))
                     
                           
                            //console.log("startTime",startTime)
                            Sessions[x-2].startTime = firstpartOfTime + secdondePartOfTime  // Time of talk or session
                            if (firstpartOfTime + secdondePartOfTime == "08:00") {
                                Sessions[x-2].title = "WELCOME REMARKS"
                            }
                            if (firstpartOfTime == "12:00") {
                                Sessions[x-2].title = "LUNCH"
                            }
                            TimeSlots.add(firstpartOfTime + secdondePartOfTime)
                        }
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

    // TrackNames
    TrackNames.map(trackName => {
        db.collection(Collections.Tracks).add({trackName: trackName}) // While we are waiting for the promise...
        .catch(err => {
            console.log(err)
            process.exit(1)
        })
    })


    for (const timeslot of TimeSlots) {
        console.log("timeslot")
        db.collection(Collections.Times).add({time:timeslot}) // While we are waiting for the promise...
        .catch(err => {
            console.log(err)
            process.exit(1)
        })
      }

    //console.log("TrackNames",TrackNames)
    //console.log("Sessions", Sessions)
    console.log("TimeSlots",TimeSlots)
  })

