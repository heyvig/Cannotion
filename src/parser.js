const request = require('request');

//Defining the CalendarEvent class
class CalendarEvent{
    title = "";
    
    //Four digit format
    year = 0;
    
    //Two digit format, so January 7th is 01 for the month and 07 for the day
    month = "";
    day = 0;
    
    //24 hour format to avoid handling of AM/PM
    hour = 0;
    minute = 0;
    
    class = "";
    description = "";
    link = "";

    //AKA Office Hours, Class, Assignment, Exam, Quiz, etc.
    type = "";

    //Additional backend info for differentiating events
    uid = "";

    constructor(){
    
    }

    reset(){
        this.title = "";
        this.class = "";
        this.type = "";
        this.description = ""; //Prob not doable anymore due to incredibly high amounts of gibberish
        this.link = "";
        this.uid = ""; //Probabily irrelevant now
        this.year = 0;
        this.month = "";
        this.day = 0;

        this.hour = 0;
        this.minute = 0;
    }
}

// const input = document.querySelector('input[type="file"]')
/*function parseFile(file){
    //Create container for events
    let events_arr = [];
    // console.log(input.files);
    //Create new calendar event
    let newEvent = new CalendarEvent();

    //Flag variables to allow for multi-line parts to be concatenated
    var checkNext = false;
    var appendURL = false;
    var appendSummary = false;

    const lines = file.split('\n').map(function(line){
        if(!(line.includes("END:VCALENDAR") || line == "")){
            
            if(checkNext){
                if(appendURL){
                    //Appending the 2nd line of the link
                    newEvent.link = newEvent.link + line.substring(1, line.length);
                    //Splicing the link together to form a link to the assignment rather than the calendar event
                    if(newEvent.link.includes("#assignment_")){
                        newEvent.link = newEvent.link.substring(0, 28) + "courses/" + newEvent.link.substring(61, 67) + "/assignments/" + newEvent.link.substring(99, 106);
                    }
                    else if(newEvent.link.includes("#calendar_event")){
                        newEvent.link = newEvent.link.substring(0, 28) + "courses/" + newEvent.link.substring(61, 67) + "/calendar_events/" + newEvent.link.substring(103, 110);
                    }

                    appendURL = false;
                    checkNext = false;
                }
                else if(appendSummary){
                    if(!line.includes("URL:")){
                        //Continuously appending the next line of the summary until reaching the next attribute
                        newEvent.title = newEvent.title + line.substring(1, line.length);
                    }
                    else{
                        //Updates the class (Ex. CEN3031) variable in the object
                        newEvent.class = newEvent.title.substring(newEvent.title.lastIndexOf("[") + 1, newEvent.title.length - 1);
                        
                        //Determines the type of event based of intormation in the title and updates the corresponding variable
                        if(newEvent.description.includes("[Click here to join Zoom Meeting:")){
                            if(newEvent.title.toLowerCase().includes("office hours")){
                                newEvent.type = "Office Hours";
                            }
                            else if(newEvent.title.toLowerCase().includes("discussion")){
                                newEvent.type = "Discussion";
                            }
                            else if(newEvent.title.toLowerCase().includes("lab")){
                                newEvent.type = "Lab";
                            }
                            else{
                                newEvent.type = "Class";
                            }

                            //Updating the link variable with the respective zoom link
                            newEvent.link = newEvent.description.substring(49, newEvent.description.length - 2);
                        }
                        else if(newEvent.title.toLowerCase().includes("exam") ||
                                newEvent.title.toLowerCase().includes("test") ||
                                newEvent.title.toLowerCase().includes("midterm") ||
                                newEvent.title.toLowerCase().includes("final")){
                            newEvent.type = "Exam";
                        }
                        else if(newEvent.title.toLowerCase().includes("quiz")){
                            newEvent.type = "Quiz";
                        }
                        else if(newEvent.uid.toLowerCase().includes("calendar-event")){
                            newEvent.type = "Event";
                        }
//***********************Are there any other types of events?
                        else{
                            newEvent.type = "Assignment";
                        }
                        appendSummary = false;
                        checkNext = false;
                    }
                }
                else if(!(line.includes("SEQUENCE:") || line.includes("LOCATION:") || line.includes("ALT-DESC"))){
                    //Continuously appending the next line of the description until reaching the next attribute
                    newEvent.description = newEvent.description + line.substring(1, line.length);
                }
                else{
                    checkNext = false;
                }
            }

            if(line.includes("UID:")){
                newEvent.uid = line.substring(4, line.length);
            }

            if(line.includes("DTSTART;VALUE=DATE:") || line.includes("DTSTART:")){
                var date = "";
                if(line.includes("DTSTART;VALUE=DATE:")){
                    date = line.substring(19, line.length);
                }
                else if(line.includes("DTSTART:")){
                    date = line.substring(8, line.length);
                }

                newEvent.year = parseInt(date.substring(0, 4));
                newEvent.month = parseInt(date.substring(4, 6));
                newEvent.day = parseInt(date.substring(6, 8));
                //Catch case for 11:59 PM due time, since it is
                //displayed as 000000 rather than 235900
                if(date.substring(9, line.length) == "000000"){
                    newEvent.startHour = 23;
                    newEvent.startMinute = 59;
                }
                else{
                    if(newEvent.month < 3 || (newEvent.month == 3 && newEvent.day < 13)){
                        if(parseInt(date.substring(9, 11)) < 4){
                            newEvent.startHour = parseInt(date.substring(9, 11)) + 19;
                        }
                        else{
                            newEvent.startHour = parseInt(date.substring(9, 11)) - 5;
                        }
                        newEvent.startMinute = parseInt(date.substring(11, 13));
                    }
                    else{
                        if(parseInt(date.substring(9, 11)) < 4){
                            newEvent.startHour = parseInt(date.substring(9, 11)) + 20;
                        }
                        else{
                            newEvent.startHour = parseInt(date.substring(9, 11)) - 4;
                        }
                        newEvent.startMinute = parseInt(date.substring(11, 13));
                    }
                }
            }

            if(line.includes("DTEND;VALUE=DATE:") || line.includes("DTEND:")){
                var date = ""
                if(line.includes("DTEND;VALUE=DATE:")){
                    date = line.substring(17, line.length);
                }
                else if(line.includes("DTEND:")){
                    date = line.substring(6, line.length);
                }
                //Catch case for 11:59 PM due time, since it is
                //displayed as 000000 rather than 235900
                if(date.substring(9, line.length) == "000000"){
                    newEvent.endHour = 23;
                    newEvent.endMinute = 59;
                }
                else{
                    if(newEvent.month < 3 || (newEvent.month == 3 && newEvent.day < 13)){
                        if(parseInt(date.substring(9, 11)) < 4){
                            newEvent.endHour = parseInt(date.substring(9, 11)) + 19;
                        }
                        else{
                            newEvent.endHour = (parseInt(date.substring(9, 11)) - 5);
                        }
                    }
                    else{
                        if(parseInt(date.substring(9, 11)) < 4){
                            newEvent.endHour = parseInt(date.substring(9, 11)) + 20;
                        }
                        else{
                            newEvent.endHour = (parseInt(date.substring(9, 11)) - 4);
                        }
                    }

                    newEvent.endMinute = parseInt(date.substring(11, 13));
                }
            }

            if(line.includes("DESCRIPTION:")){
                newEvent.description = line.substring(12, line.length);
                checkNext = true;
            }

            if(line.includes("SUMMARY:")){
                newEvent.title = line.substring(8, line.length);
                appendSummary = true;
                checkNext = true;
            }

            if(line.includes("URL:")){
                if(newEvent.type == "Office Hours" || newEvent.type == "Discussion" || newEvent.type == "Lab" || newEvent.type == "Class"){
                    newEvent.link = newEvent.description.substring(49, newEvent.description.length - 1);
                }
                else{
                    newEvent.link = line.substring(4, newEvent.description.length);
                    appendURL = true;
                    checkNext = true;
                }
            }

            if(line.includes("END:VEVENT")){
                //PUSH AKA COPY current event (NOT A POINTER) into collection
                events_arr.push(Object.assign({}, newEvent));
                //console.log(newEvent.title + " - " + newEvent.class);
                newEvent.reset();
            }
        }
        else{
            return;
        }
    })
    //COMMENTED OUT TO PREVENT EXCESSIVE PRINTING
    for(const element of events_arr){
        console.log(element.title + " - " + element.class + " - " + element.type);
        console.log(element.link);
        console.log(element.description);
        console.log("Date: " + element.month + "/" + element.day + "/" + element.year);
        console.log("From: " + element.startHour + ":" + element.startMinute + " to " + element.endHour + ":" + element.endMinute);
        console.log("\n");
    }
    if(events_arr.length > 0)
        return events_arr;
}*/

// const input = document.querySelector('input[type="file"]')
function parseAtomFile(file){
    //Create container for events
    let events_arr = [];
    request("https://ufl.instructure.com/feeds/calendars/user_BkaffhCJl6Sh6F30F7EJ0RvsAWA8arHizxJ4xMus.atom", function(error, response, html){
        if(!error && response.statusCode == 200){
            //Create new calendar event
            let newEvent = new CalendarEvent();

            const lines = html.split('\n').map(function(line){
                if(!(line.includes("</feed>"))){
            
                    if(line.includes("<title>")){
                        if(line.includes("Calendar Event:")){
                            if(line.toLowerCase().includes("office hours")){
                                newEvent.type = "Office Hours";
                            }
                            else if(line.toLowerCase().includes("discussion")){
                                newEvent.type = "Discussion";
                            }
                            else if(line.toLowerCase().includes("lab")){
                                newEvent.type = "Lab";
                            }
                            else if(line.toLowerCase().includes("exam") ||
                                    line.toLowerCase().includes("test") ||
                                    line.toLowerCase().includes("midterm") ||
                                    line.toLowerCase().includes("final")){
                                newEvent.type = "Exam";
                            }
                            else if(line.toLowerCase().includes("quiz")){
                                newEvent.type = "Quiz";
                            }
                            else{
                                newEvent.type = "Event";  //CHECK EVENTS LATER TO SEE IF THEY HAVE A ZOOM LINK, IF SO, MAKE THEM CLASS TYPE
                            }
                        }
                        else if(line.includes("Assignment:")){
                            newEvent.type = "Assignment";
                        }
                        
                        newEvent.title = line.substring(line.indexOf(":") + 2, line.lastIndexOf("<"));
                    }

                    if(line.includes("<published>")){
                        newEvent.year = line.substring(line.indexOf(">") + 1, line.indexOf(">") + 5);
                    }

                    if(line.includes("<link") && !line.includes("rel=\"self\"")){
                        if(!(newEvent.type == "Office Hours" || newEvent.type == "Discussion" || newEvent.type == "Lab" || newEvent.type == "Class")){
                            newEvent.link = line.substring(line.indexOf("http://"), line.lastIndexOf("\"/>"));
                            
                            if(newEvent.type == "Event"){
                                newEvent.link = "https" + newEvent.link.substring(4, newEvent.link.indexOf("instructure.com/") + 16) + "courses/" + newEvent.link.substring(35, 41) + "/calendar_events/" + newEvent.link.substring(89, 96);
                            }
                        }
                    }
                    
                    if(line.includes("<name>")){
                        newEvent.class = line.substring(line.indexOf(">") + 1, line.lastIndexOf("<"));
                    }

                    if(line.includes("<content type")){
                        if(line.includes("zoom.us/")){
                            newEvent.link = line.substring(line.indexOf("https://"), line.indexOf("https://") + 33);
                            
                            if(newEvent.type == "Event"){
                                newEvent.type = "Class";
                            }
                        }

                        if(newEvent.type == "Office Hours" || newEvent.type == "Discussion" || newEvent.type == "Lab" || newEvent.type == "Class" || newEvent.type == "Event"){
                            newEvent.month = line.substring(line.indexOf(">") + 1, line.indexOf(">") + 4);
                            newEvent.day = parseInt(line.substring(line.indexOf(">") + 5, line.indexOf(">") + 7));
                        }
                        else{
                            newEvent.month = line.substring(line.indexOf(">") + 6, line.indexOf(">") + 9);
                            newEvent.day = parseInt(line.substring(line.indexOf(">") + 10, line.indexOf(">") + 12));
                        }

                        if(line.substring(0, 41).includes(" at ") || line.substring(0, 41).includes(" by ")){
                            var time;
                            if(line.substring(0, 41).includes(" at ")){
                                time = line.substring(line.indexOf(" at ") + 4, line.indexOf(" at ") + 11);
                            }
                            else{
                                time = line.substring(line.indexOf(" by ") + 4, line.indexOf(" by ") + 11);
                            }

                            if(time.includes(":")){
                                if(time.includes("am")){
                                    if(time.includes(" ")){
                                        newEvent.hour = parseInt(time.substring(1, 2));
                                        newEvent.minute = parseInt(time.substring(3, 5));
                                    }
                                    else{
                                        newEvent.hour = parseInt(time.substring(0, 2));
                                        newEvent.minute = parseInt(time.substring(3, 5));
                                    }
                                    
                                    if(newEvent.hour == 12){
                                        newEvent.hour = 0;
                                    }
                                }
                                else if(time.includes("pm")){
                                    if(time.includes(" ")){
                                        newEvent.hour = parseInt(time.substring(1, 2)) + 12;
                                        newEvent.minute = parseInt(time.substring(3, 5));
                                    }
                                    else{
                                        newEvent.hour = parseInt(time.substring(0, 2)) + 12;
                                        newEvent.minute = parseInt(time.substring(3, 5));
                                    }
                                }
                            }
                            else{
                                newEvent.minute = 0;

                                if(time.includes("am")){
                                    if(time.includes(" ")){
                                        newEvent.hour = parseInt(time.substring(1, 2));
                                    }
                                    else{
                                        newEvent.hour = parseInt(time.substring(0, 2));
                                    }

                                    if(newEvent.hour == 12){
                                        newEvent.hour = 0;
                                    }
                                }
                                else if(time.includes("pm")){
                                    if(time.includes(" ")){
                                        newEvent.hour = parseInt(time.substring(1, 2)) + 12;
                                    }
                                    else{
                                        newEvent.hour = parseInt(time.substring(0, 2)) + 12;
                                    }
                                }
                            }
                        }
                    }

                    if(line.includes("</entry>")){
                        //PUSH AKA COPY current event (NOT A POINTER) into collection
                        events_arr.push(Object.assign({}, newEvent));
                        //console.log(newEvent.title + " - " + newEvent.class);
                        newEvent.reset();
                    }
                }
                else{
                    return;
                }
            });
        }
        else{
            console.log("Error loading page");
        }


        //console.log(events_arr[events_arr.length-5].title + " | " + events_arr[events_arr.length-5].class + " | " + events_arr[events_arr.length-5].type);
        //console.log(events_arr[events_arr.length-5].link);
        //console.log("Date: " + events_arr[events_arr.length-5].month + " " + events_arr[events_arr.length-5].day + ", " + events_arr[events_arr.length-5].year);
        //console.log("From: " + events_arr[events_arr.length-5].hour + ":" + events_arr[events_arr.length-5].minute);
        //COMMENTED OUT TO PREVENT EXCESSIVE PRINTING
        for(const element of events_arr){
            console.log(element.title + " | " + element.class + " | " + element.type);
            console.log(element.link);
            console.log("Date: " + element.month + " " + element.day + ", " + element.year);
            console.log("From: " + element.hour + ":" + element.minute);
            console.log("\n");
        }
    });
    
    /*if(events_arr.length > 0)
        return events_arr;*/
}

parseAtomFile();

module.exports = parseAtomFile;
//module.exports = parseFile;