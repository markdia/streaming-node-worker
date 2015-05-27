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
    _.log("creating collector");
    var collector = new Collector({
        queueSize: 10
    });

    _.log("creating dispatcher");
    var dispatcher = new Dispatcher({
        queueSize: 10,
        numberOfWorkers: 4
    }, collector.workStream);

    _.log("starting dispatcher");
    dispatcher.startDispatcher();
    dispatcher.distributeEvents();
    collector.getWork();

    for (let c=0; c < 100; c++) {
        let someDelay = Math.round(Math.random()*10000) + 1;
        setTimeout(function() {
            collector.getWork();
        }, someDelay);
    }

}

main();