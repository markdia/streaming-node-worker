/**
 * The Worker accepts work from dispatcher, registers its work-stream, talks through very thin adapter to Email Provider to make switching really easy
 */
"use strict";

/*
 Use Highland for streams
 */
import "highland";
import * as errors from './errors.js';
var _ = require("highland");

class Worker {
    constructor(options, workStream) {
        this.id = options.id;
        this.hardQuitStream = options.hardQuitStream;
        this.workStream = workStream;
    }

    // get work from Queue
    startWorker() {
        //look for events (workItems) in Stream and process those
        //call new worker - pass in workStream and WorkerID from counter above
        //then start it
        let errorStream = this.workStream.observe();
        errorStream.errors(function (err, push) {
            if (err) {
                throw new StreamingError(err);
            }
        });
        _.log('starting worker ' + this.id + ' to process work stream');
        this.workStream.each(this.processWorkItem);
        //todo: add in some support for errors and end stream events

    }

    processWorkItem(workItem) {
        let someDelay = Math.round(Math.random()*3000) + 1;
        setTimeout(function() {
            _.log('processing a workItem ' + workItem.templateGUID + ' on worker with delay ' + someDelay)
        }, someDelay);


    }

    stopWorker() {
        //listen for hardQuit or end WorkStream
        this.workStream.end();
    }
}

export default Worker;