/**
 * The Dispatcher is responsible for holding onto streams for each worker and "dispatching" work to them.
 */
"use strict";

/*
 Use Highland for streams
 */
import "highland";
import Worker from './worker.js';
var _ = require("highland");

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

    distributeEvents() {
        this.inboundWorkStream.each((streamedItem) => {
                this.workers[1].workStream.write(streamedItem);
            }
        );
    }
}

export default Dispatcher;