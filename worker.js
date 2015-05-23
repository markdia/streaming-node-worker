/**
 * The Worker accepts work from dispatcher, registers its work-stream, talks through very thin adapter to Email Provider to make switching really easy
 */
"use strict";

/*
 Use Highland for streams
 */
import "highland.js";

class Worker {
    constructor(options) {
        this.id = options.id;
        this.work = new workItem;
        this.workStream = options.workStream;
        //end should come from workstream, but what if we need emergecny force quit
        this.hardQuitStream = options.hardQuitStream;
    }

    // get work from Queue
    startWorker() {
        //add yourself to workstream, workStream<-work

        //look for events (workItems) in Stream and process those

        //call new worker - pass in workStream and WorkerID from counter above

        //then start it
        this.workStream.each(workItem){
            processWorkItem(workItem);
        }

    }

    processWorkItem(workItem) {

    }

    stopWorker() {
        //listen for hardQuit or end WorkStream
    }
}