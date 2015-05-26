"use strict";
//import packages

//import 'highland'; -- why won't import work here... goofing something up
var _ = require("highland");
import Dispatcher from './dispatcher.js';
import Collector from './collector.js';

//load in Config file for AWS creds

function main() {
    //setup vars from passed in flags or defaults
    var numberOfWorkers = 4;
    //var _ = highland;

    console.log("starting dispatcher");
    var dispatcher = new Dispatcher({
        queueSize: 10,
        numberOfWorkers: 4
    });
    dispatcher.startDispatcher(numberOfWorkers);
    dispatcher.dispatchWork();

    //start collector
    console.log("starting collector");
    var collector = new Collector({
        queueSize: 10
    });
    collector.getWork();
}

main();