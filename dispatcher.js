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
        //another option may be to just fork the consumers with _().fork() to share backpressure
        var outboundWorkStreams = new Array;
        for (let i=0; i <= this.numberOfWorkers; i++) {
            console.log('creating and starting worker: ' + i.toString());
            outboundWorkStreams[i] = this.inboundWorkStream.fork();
            this.workers[i] = new Worker({
                id: i,
                hardQuitStream: false
            }, outboundWorkStreams[i]);
            this.workers[i].startWorker();
        }
    }
}

export default Dispatcher;