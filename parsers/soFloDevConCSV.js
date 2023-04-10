import {dbConnect,Collections} from "../api/src/dbConnect.js"
import fs  from "fs";
import { parse } from "csv-parse";
const db = dbConnect()

// SoFloDevCon
const ConferenceId = 1 // conference id
const TrackNamesOnLine = 4  // Session Names start on line 4 (5th one)
const SessionsStartsIn = 9 // sessions starts in row 7
const colSessionsStart = 2  // the sessions start on column 2 (3rd one)
const csvFileURI = "./soflodevcon.tsv" // name of soFloDevCon tracks file
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
let TimeSlots = []; // set
let SessionCount = 0;



// Screw the libraries. let's create our own to parse
var data = fs.readFileSync(csvFileURI)
    .toString() // convert Buffer to string
    .split('\n') // split string to lines
    .map(e => e.split("\t").map(e => e.trim())); // split each line to array

// Get the Track Names
TrackNames = data[TrackNamesOnLine-1]
//console.log("TrackNames",TrackNames)

// Get all Sessions
for (let q=SessionsStartsIn;q<data.length;q++) {

    const row = data[q];
    //console.log("row",row)


    if (row[0] && row[0].indexOf("min") == -1 ) {
            //console.log("Parsing: ",row)

            if (row[0].indexOf("-") == -1) {
                // We have the title of the session (i.e. SESSION 2 or "LUNCH")
                // Go through each column starting from the 3th (2) one
                Sessions = []; // reset the sesstions

  
                for (let x = colSessionsStart; x<row.length;x++) {

                    // Get the Track Name by the column
                    const SessionsTrackName = TrackNames[x]
                    const SpeakerName = row[x].trim() || "Nothing Scheduled"
                    //if (LineNumber == 8) {
                    //console.log("SpeakerName",SessionsTrackName,SpeakerName)

                    
                    const newSession = { 
                        "ConferenceId": ConferenceId,
                        "conferenceName": "SoFlo Dev Con 2023",
                        "category": SessionsTrackName,
                        "title": "", // dont' know this until the next line
                        "speakerID": "",
                        "speakerName": SpeakerName,
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
                    //}

                    Sessions.push(newSession)
   
                }
                //console.log("Length",Sessions.length)

            } else {
                    // We have a time, and not the "15min" lines
                    // Go through each column starting from the 3th (2) one
                    for (let x = colSessionsStart; x<(row.length);x++) {
                        
                        const currentX = x-colSessionsStart
                        let sessionTime = (row[0].substr(0,row[0].indexOf(" - "))).replace(" ","").replace("AM","").replace("PM","")
                        //console.log("sessionTime",sessionTime)
                        let firstpartOfTime = sessionTime.substr(0,sessionTime.indexOf(":"))
                        let secdondePartOfTime = sessionTime.substr(sessionTime.indexOf(":"))
                        firstpartOfTime = Number(firstpartOfTime) <= 7 ? Number(firstpartOfTime)+12 : "0"+firstpartOfTime
                        if (firstpartOfTime == "011") {
                            firstpartOfTime = "11"
                        }
                        //console.log("Sessions",currentX,Sessions)
                        // try {
                            Sessions[currentX].title = row[x] != "" ? row[x] : "Nothing Scheduled" // Description of talk/ session
                            Sessions[currentX].startTime = row[0] // firstpartOfTime + secdondePartOfTime  // Time of talk or session]
                            Sessions[currentX].TimeOrder = Number(firstpartOfTime)
                            Sessions[currentX].OfficialTime = row[0]  // Time of talk or session
                            if (firstpartOfTime + secdondePartOfTime == "08:00") {
                                Sessions[currentX].title = "WELCOME REMARKS"
                                Sessions[currentX].speakerName = "WELCOME REMARKS"
                            }
                            if (firstpartOfTime == "12:00") {
                                Sessions[currentX].title = "LUNCH"
                                Sessions[currentX].speakerName = "LUNCH"
                            }
                            if (!TimeSlots.find(x=> x?.time == Sessions[currentX].startTime ))
                            {
                                TimeSlots.push({time:Sessions[currentX].startTime, order: Number(firstpartOfTime), ConferenceId:ConferenceId})
                            }

                            //if (Sessions[currentX].speakerName !="Nothing Scheduled") {
                                SessionCount++
                                const docRef =  await db.collection(Collections.Sessions).add(Sessions[currentX])
                            //}
                        // } catch (ex) {
                        //     //console.error("currentX",currentX)
                        //     //throw ex
                        // }
                        
                        
                        

                    }

                    

            }
           
        
    }
  }


    // TrackNames
    TrackNames.map(trackName => { 
        if (trackName) {
            db.collection(Collections.Tracks).add({trackName: trackName, ConferenceId: ConferenceId}) // While we are waiting for the promise...
            .catch(err => {
                console.log(err)
                process.exit(1)
            })
           
        }
    })


    for (const timeslot of TimeSlots) {
        if (timeslot) {
            db.collection(Collections.Times).add(timeslot) // While we are waiting for the promise...
            .catch(err => {
                console.log(err)
                process.exit(1)
            })
        }
      }

    // clear the "nothing scheduled ones"
    let deletedCount = 0
    db.collection(Collections.Sessions).get().then(collection => {
        collection.docs.map((doc) => {
            if (doc.data().title == "Nothing Scheduled") {
                db.collection(Collections.Sessions).doc(doc.id).delete()
                deletedCount++
            }
        })
    })

    //console.log("TrackNames",TrackNames)
    //console.log("Sessions", Sessions)
    //console.log("TimeSlots",TimeSlots)
    console.log("Session Count",SessionCount)
    console.log("deleted",deletedCount)
   
    console.log("-=-=-=-=-=-=-=-=-=-=-=-=- DONE! -=-=-=-=-=-=-=-=-=-=-=-=- ")
