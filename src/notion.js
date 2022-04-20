import { Client } from "@notionhq/client"
import { secret, database_id} from "./secrets.js";


const notion = new Client({ auth: secret });

//import parser details
import {parseFile, CalendarEvent, events_arr} from './parser.js';
import {small_file} from "../tests/2Events.js";
//import {CalendarEvent} from './parser';

async function addItem(text, ddate) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: database_id },
      properties: {
        title: { 
          title:[
            {
              "text": {
                "content": text
              }
            }
          ]
        },
        "Due Date": {
          date: {
            "start": ddate,
            "end": null
          }
        }  
      },
    })
    console.log(response)
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error.body)
  }
}

function addAllEvents(){
  let ddate = "";
  events_arr.forEach((item, index) => {
    console.log("year : " + item.year);
    console.log("month : " + item.month);
    console.log("day : " + item.day);

    ddate = item.year;
    ddate = ddate + "-" + (item.day > 10 ? item.day : ("0"+ item.day));
    ddate = ddate + "-" + (item.month > 10 ? item.month : ("0"+item.month));
    let date1 = new Date(item.year, item.month-1, item.day); //month is 0-indexed -> 0 is january
    addItem(item.title, date1);
});
}

addAllEvents();
//module.exports = addAllEvents;
//2022-03-29T11:00:00.000-04:00