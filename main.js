"use strict";
//import packages

//setup vars from passed in flags or defaults
var numberOfWorkers = 4;

//load in Config file for AWS creds

function main() {
    console.log("starting dispatcher");
    StartDispatcher(numberOfWorkers);

    //start collector
    console.log("starting collector");

}