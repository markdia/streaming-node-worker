"use strict";
//import packages
import Dispatcher from './dispatcher.js';
import Collector from './collector.js';

//setup vars from passed in flags or defaults
var numberOfWorkers = 4;
var _ = highland;

//load in Config file for AWS creds

function main() {
    var collector;
    console.log("starting dispatcher");
    var dispatcher = new Dispatcher({
        queueSize: 10
    });
    dispatcher.startDispatcher(numberOfWorkers);

    //start collector
    console.log("starting collector");
    collector = new Collector({
        queueSize: 10
    });
    collector.getWork();
}