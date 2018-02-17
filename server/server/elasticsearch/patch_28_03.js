/**
 * Created by pierremarsot on 21/02/2017.
 */
const fs = require('fs');
const elasticsearch = require('elasticsearch');
const client_local = new elasticsearch.Client({
  host: 'http://somar:logitech03@localhost:9200',
  requestTimeout: 990000,
  //log: 'trace'
});

//thematique_animation_incentive_evenementiel

const client_server = new elasticsearch.Client({
  //host: 'http://somar:logitech03@localhost:9200',
  host: 'http://37.187.23.89:9200',
  requestTimeout: 990000,
  //log: 'trace'
});

client_local.ping({

}, function(error){
  if(error){
    return false;
  }

  client_server.ping({

  }, function(error){
    if(error){
      return false;
    }

    let count = 0;

    client_local.search({
      index: 'sport',
      type: ["salaire"],
      scroll: '9999s', // keep the search results "scrollable" for 30 seconds
    }, function getMoreUntilDone(error, response) {
      let bulk = [];

      for(const doc of response.hits.hits){
        bulk.push({ index:  { _index: 'sport', _type: doc._type, _id: doc._id } });
        bulk.push(doc._source);
      }

      count += bulk.length / 2;

      client_server.bulk({
        body: bulk
      }, function (err, resp) {
        if(count >= response.hits.total)
        {
          return true;
        }
        else
        {
          client_local.scroll({
            scrollId: response._scroll_id,
            scroll: '9999s'
          }, getMoreUntilDone);
        }
      });
    });
  });
});