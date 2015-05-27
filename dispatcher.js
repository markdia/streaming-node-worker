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
            _.log('creating and starting worker: ' + i.toString());
            outboundWorkStreams[i] = _();
            this.workers[i] = new Worker({
                id: i,
                hardQuitStream: false
            }, outboundWorkStreams[i]);
            this.workers[i].startWorker();
        }
    }

    distributeEvents() {
        let x = 0;
        this.inboundWorkStream.each((streamedItem) => {
                if (x >= this.numberOfWorkers) {
                    x=0;
                }
                this.workers[x].workStream.write(streamedItem);
                _.log('worker ' + x + ' working on: ' + streamedItem.templateGUID);
                x=x+1;
            }
        );
    }
}

export default Dispatcher;