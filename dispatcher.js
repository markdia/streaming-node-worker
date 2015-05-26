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
        this.numberOfWorkers = options.numberOfWorkers;
        //create inbound workstream from collector
        this.inboundWorkStream = inboundWorkStream;
        this.workers = new Array;
    }

    // get work from Queue
    startDispatcher() {
        //create all of our workers from 1 to numberOfWorkers - hold onto ID to pass in, each gets unique stream
        //another option may be to just fork the consumers with _().fork() to share backpressure
        var outboundWorkStreams = new Array;
        for (let i=0; i <= this.numberOfWorkers; i++) {
            console.log('creating and starting worker: ' + i.toString());
            outboundWorkStreams[i] = _();
            this.workers[i] = new Worker({
                id: i,
                hardQuitStream: false
            }, outboundWorkStreams[i]);
            this.workers[i].startWorker();
        }
    }

    dispatchWork() {
        // pipe inbound work event to outbound workstream
        // in a world with streams being buffered (vs a blocking channel)  we may need to do a check-in, check-out
        // if we want to keep the buffer size to a max.  Basically stating X amount of stuff in the buffer prior
        // to ask the collector to wait on pulling back more data from the Q
        let x = 0;

        this.inboundWorkStream.each(function(){
            if (x > this.numberOfWorkers) {
                x = 0;
            }
            this.workStream.pipe(workers[x].workStream);
            x++;
        });
    }
}