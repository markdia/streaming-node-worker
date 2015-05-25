/**
 * The Collector is responsible for talking to the queue, validating the job, and handing it off to the dispatcher
 */
"use strict";

class Collector {
    constructor(options) {
        this.queueSize = options.queueSize;
        this.workStream = _();
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