import { Client } from "@notionhq/client"
import { secret, database_id} from "./secrets.js";
//import parser details
import {CalendarEvent} from './parser.js';
//import {CalendarEvent} from './parser';

const notion = new Client({ auth: secret });
//this function adds an individual item based on the given data
async function addItem(titleS, ddate, clasS, typeS) {
  try {
    //the following creates the page and returns the resulting response
    //this is used to store all the object IDs that is used to update the notion database
    const response = await notion.pages.create({
      parent: { database_id: database_id },
      properties: {
        title: { 
          title:[
            {
              "text": {
                "content": titleS
              }
            }
          ]
        },
        "Due Date": {
          date: {
            "start": ddate,
            "end": null
          }
        },
        "class":{
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": ""
              }
            },
            {
              "type": "text",
              "text": {
                "content": clasS
              }
            },
            
          ]
        },
        "Type":{
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": ""
              }
            },
            {
              "type": "text",
              "text": {
                "content": typeS
              }
            }
          ]
        }
      },
    })
    console.log(response)
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error.body)
  }
}

//this functions takes the parsed output from the parser and adds all the events
function addAllEvents(events_arr){
  let ddate = "";
  events_arr.forEach((item, index) => {
    //for reference
    console.log("year : " + item.year);
    console.log("month : " + item.month);
    console.log("day : " + item.day);

    //adding title and due date
    ddate = item.year;
    ddate = ddate + "-" + (item.day > 10 ? item.day : ("0"+ item.day));
    ddate = ddate + "-" + (item.month > 10 ? item.month : ("0"+item.month));
    let date1 = new Date(item.year, item.month-1, item.day); //month is 0-indexed -> 0 is january
       
    addItem(item.title, date1, item.class, item.type);
  }
);
}

//this function removes events that no longer should be in the calendar
async function removeEvent(id){


  const blockId = id;

  const response = await notion.blocks.delete({

    block_id: blockId,

  });

  console.log(response);


}

//removes all events
export async function remAllEvents(evendID){
  for await (const item of eventID){
    removeEvent(item)
  }
}

//running code
let ev1 = new CalendarEvent();
let ev2 = new CalendarEvent();
let ev3 = new CalendarEvent();

ev1.title = "event1";
ev1.year = 2022;
ev1.month = 4;
ev1.day = 17;
ev1.class = "Chem";
ev1.type = "TEST!"

ev1.description = "ev1T";
ev1.link = "ev1T";
ev1.uid = "ev1T";
ev1.startHour = 0;
ev1.startMinute = 0;
ev1.endHour = 0;
ev1.endMinute = 0;


ev2.title = "event2";
ev2.year = 2022;
ev2.month = 4;
ev2.day = 17;
ev2.class = "Math";
ev2.type = "QUIZ!";
ev2.description = "ev2T";
ev2.link = "ev2T";
ev2.uid = "ev2T";
ev2.startHour = 0;
ev2.startMinute = 0;
ev2.endHour = 0;
ev2.endMinute = 0;

ev3.title = "event3";
ev3.year = 2022;
ev3.month = 4;
ev3.day = 17;
ev3.class = "Sci";
ev3.type = "HW";
ev3.description = "ev3t";
ev3.link = "ev3t";
ev3.uid = "ev3t";
ev3.startHour = 0;
ev3.startMinute = 0;
ev3.endHour = 0;
ev3.endMinute = 0;

let events_arr = [ev1, ev2, ev3];

let result1;
chrome.storage.sync.get("option1", function(result) {
  selected.innerHTML = `${"option1"} = ` + result[`${"option1"}`];
});



addAllEvents(events_arr);

