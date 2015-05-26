/**
 * The Worker accepts work from dispatcher, registers its work-stream, talks through very thin adapter to Email Provider to make switching really easy
 */
"use strict";

/*
 Use Highland for streams
 */
import "highland";

class Worker {
    constructor(options, workStream) {
        this.id = options.id;
        this.hardQuitStream = options.hardQuitStream;
        /*
        Part of me really wants to pass in workItem Validation object here in options to make the injectable
         */
        this.workStream = workStream;
    }

    // get work from Queue
    startWorker() {
        //look for events (workItems) in Stream and process those
        //call new worker - pass in workStream and WorkerID from counter above
        //then start it
        console.log('starting worker ' + this.id + ' to process work stream');
        this.workStream.each(this.processWorkItem);
        //todo: add in some support for errors and end stream events
    }

    processWorkItem(workItem) {
        console.log('processing a workItem ' + workItem.templateGUID + ' on worker');
    }

    stopWorker() {
        //listen for hardQuit or end WorkStream
        this.workStream.end();
    }
}

export default Worker;