/**
 * The Collector is responsible for talking to the queue, validating the job, and handing it off to the dispatcher
 */
"use strict";

import "highland";
var _ = require("highland");

class Collector {
    constructor(options) {
        this.queueSize = options.queueSize;
        this.workStream = _();
    }

    // get work from Queue
    getWork() {
        console.log("getting work from Q with Collector");
        //make async call to Q and push work with it
        this.pushWork();
    }

    //do a quick sanity check that work request makes sense
    validateWorkRequest() {

    }

    // push work onto workStream
    pushWork() {
        console.log('pushing work to workstream');
        //this is pretty much just faked up garbage
        let someNumber = 450;
        for (let i = 1; i < someNumber; i++) {
            this.workStream.write({ emailRecipient: "thisguy@email.com", templateGUID: i });
        }
    }

    checkWorkStreamSize() {
        let x = 0;
        var elementCount = this.workStream.scan1(function(x){
            x++;
        });
        console.log("workstream size is: " + elementCount.toString());
        return elementCount;
    }
}

export default Collector;