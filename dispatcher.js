/**
 * The Dispatcher is responsible for holding onto streams for each worker and "dispatching" work to them.
 */
"use strict";

/*
 Use Highland for streams
 */
import "highland";
import Worker from './worker.js';

class Dispatcher {
    constructor(options, inboundWorkStream) {
        this.queueSize = options.queueSize;
        //create inbound workstream from collector
        this.workStream = inboundWorkStream;
    }

    // get work from Queue
    startDispatcher(numberOfWorkers) {
        //create all of our workers from 1 to numberOfWorkers - hold onto ID to pass in, each gets unique stream
        //another option may be to just fork the consumers with _().fork() to share backpressure
        var outboundWorkStreams = new Array;
        var workers = new Array;
        for (var i=0; i <= numberOfWorkers; i++) {
            console.log('starting worker: ' + i);
            outboundWorkStreams[i] = _();
            workers[i] = new Worker({
                id: i,
                hardQuitStream: false
            }, outboundWorkStreams[i]);
        }

        //call new worker - pass in workStream and WorkerID from counter above

        //then start it
        this.workStream.each(dispatchWork)

    }

    dispatchWork(workItem) {
        //pipe inbound work event to outbound workstream
        this.workStream.pipe(outboundWorkStreams[1]);

    }
}