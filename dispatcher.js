/**
 * The Dispatcher is responsible for holding onto streams for each worker and "dispatching" work to them.
 */
"use strict";

/*
 Use Highland for streams
 */
import "highland.js";
import Worker from './worker.js';

class Dispatcher {
    constructor(options) {
        this.queueSize = options.queueSize;
        //create inbound workstream from collector
        this.workStream = _();
    }

    // get work from Queue
    startDispatcher(numberOfWorkers) {
        //create all of our workers from 1 to numberOfWorkers - hold onto ID to pass in, each gets unique stream
        var outboundWorkStreams = new Array;
        var workers = new Array;
        for (var i=0; i <= numberOfWorkers; i++) {
            outboundWorkStreams[i] = _();
            workers[i] = new Worker({
                id: i,
                hardQuitStream: false
            }, outboundWorkStreams[i]);
        }

        //call new worker - pass in workStream and WorkerID from counter above

        //then start it
        this.workStream.each(workItem) {
            dispatchWork(worker, workItem);
        }

    }

    dispatchWork(worker, workItem) {

    }
}