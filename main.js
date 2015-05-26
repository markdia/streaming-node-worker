"use strict";
//import packages

//import 'highland'; -- why won't import work here... goofing something up
var _ = require("highland");
import Dispatcher from './dispatcher.js';
import Collector from './collector.js';

//load in Config file for AWS creds

function main() {
    //setup vars from passed in flags or defaults
    //var _ = highland;

    //start collector
    console.log("creating collector");
    var collector = new Collector({
        queueSize: 10
    });

    console.log("creating dispatcher");
    var dispatcher = new Dispatcher({
        queueSize: 10,
        numberOfWorkers: 4
    }, collector.workStream);

    console.log("starting dispatcher");
    dispatcher.startDispatcher();

    collector.getWork();
}

main();