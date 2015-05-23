/**
 * The Dispatcher is responsible for holding onto streams for each worker and "dispatching" work to them.
 */
"use strict";

/*
 Use Highland for streams
 */
import "highland.js";
var _ = highland;

class Dispatcher {
    constructor(options) {
        this.queueSize = options.queueSize;
        this.workStream = _();
    }

    // get work from Queue
    startDispatcher(numberOfWorkers) {
        //create a stream or a list of workers work streams

        //create all of our workers from 1 to numberOfWorkers - hold onto ID to pass in
        for (i=0; i<=numberOfWorkers; i++) {

        }

        //call new worker - pass in workStream and WorkerID from counter above

        //then start it
        this.workStream.each(workItem){
            dispatchWork(worker, workItem);
        }

    }

    dispatchWork(worker, workItem) {

    }
}