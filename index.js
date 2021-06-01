const express = require('express');
const bodyParser = require('body-parser')
const ngrok = require('ngrok')

async function main() {
  // create server
  const app = express();

  // being able to understand data send as as payload in post
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));


  // ****************************************************************
  // getting data from matrix
  // ****************************************************************
  app.post('/matrix', (req, res) => {

    let payload = req.body;

    console.log("---------- received MESSAGE from MATRIX -------------");
    // tell matrix that the message arrived
    res.sendStatus(200); 

    // print the received data
    console.log("---------- Summary -------------");
    console.log( payload );

    if ( payload.before && payload.before.fields ) {
      console.log("---------- Before Change Values -------------");
      for (var idx=0;idx<payload.before.fields.length;idx++) console.log( payload.before.fields [idx]);
    }
    if ( payload.after && payload.after.fields ) {
      console.log("---------- After Change Values -------------");
      for (var idx=0;idx<payload.after.fields.length;idx++) console.log( payload.after.fields [idx]);
    }

  });

  // ****************************************************************
  // start webserver
  // ****************************************************************
  app.get('/', (req, res) => {
    res.send("Test Server responding");
  });

  const PORT = 3000;
  app.listen(PORT, async () => {
    console.log('Server started on port '+PORT);
    const tunnel = await ngrok.connect(PORT); 
    console.log("Server reachable at "+tunnel);
  });  
}

(async function() {
  await main();
})();


