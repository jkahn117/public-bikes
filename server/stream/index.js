'use strict'

/**

 DynamoDB Stream processor for public-bikes sample application.

 author: jkahn@
 date: Jan 2017

 */

//----
const redis    = require('redis');

const removeRecord = (client, recordId) => {
  return new Promise( (resolve, reject) => {

    client.send_command('ZREM',
      [ 'public-bikes:stations',
        recordId ], (error, reply) => {
          if (error) {
            reject(error);
          }
          else {
            console.log("Removed entry from cache: " + reply);
            resolve(reply);
          }
        });

  });
};

//----
const updateRecord = (client, key, record) => {
  return new Promise( (resolve, reject) => {

    client.send_command('GEOADD',
      [ 'public-bikes:stations',
        record.longitude.N,
        record.latitude.N,
        key ], (error, reply) => {
          if (error) {
            reject(error);
          }
          else {
            console.log("Inserted new entry in cache for " + key + " { lat:" + record.latitude.N + ", lon: " + record.longitude.N + " }" );
            resolve(reply);
          }
        });

  });
};

//----
exports.handler = (event, context, callback) => {

  var client = redis.createClient({ host: process.env.ELASTICACHE_HOST,
                                    port: process.env.ELASTICACHE_PORT })

  client.on("error", (error) => {
    console.error("[ERROR - Redis client] " + error);
  });

  Promise.all( event.Records.map( (record) => {
    var key = record.dynamodb.Keys.uuid.S;

    if (record.eventName == "REMOVE") {
      return removeRecord(client, key);
    }
    else {
      return updateRecord(client, key, record.dynamodb.NewImage);  
    }

  })).then( () => {

    client.quit(); // be sure to quit or function will not return
    console.log("Processed " + event.Records.length + " records");

  }).catch( (error) => {

    console.error("[ERROR - stream#handler]: " + error);

  });;

};


