/// <reference path="../../../node_modules/typescript/lib/lib.webworker.d.ts"/>.
declare var oboe;
importScripts('../../../node_modules/oboe/dist/oboe-browser.js');
let chunks = [];
let counter = 1;
this.addEventListener('message', (e) => {
    oboe(`/api/survey/${e.data}`)
      .node('{answers info}', (participant) => {
      chunks.push(participant);
      if (this.chunks.length == this.counter*100){
        this.counter++; 
        postMessage(chunks);
        chunks = [];
    }
  });
});
