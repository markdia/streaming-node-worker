/**
 * The Collector is responsible for talking to the queue, validating the job, and handing it off to the dispatcher
 */
"use strict";

/*
Use Highland for streams
 */
import "highland.js";

class Collector {
    constructor(options) {
        this.queueSize = options.queueSize;
        this.workStream = new highland;
    }

    // get work from Queue
    getWork() {

    }

    //do a quick sanity check that work request makes sense
    validateWorkRequest() {

    }

    // push work onto workStream
    pushWork() {

    }
}