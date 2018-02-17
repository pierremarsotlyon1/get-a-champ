/**
 * Created by pierremarsot on 21/02/2017.
 */
const fs = require('fs');
const config = require('../../config_app');
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

client_local.ping({}, function (error) {
  if (error) {
    return false;
  }

  console.log('ping local');
  client_server.ping({}, function (error) {
    if (error) {
      return false;
    }
    console.log('ping distant');
    let count = 0;

    client_local.search({
      index: 'ipip',
      scroll: '99999s', // keep the search results "scrollable" for 30 seconds
      size: 1000,
    }, function getMoreUntilDone(error, response) {
      console.log(error);
      let bulk = [];

      if (!response.hits || !response.hits.hits)
        return false;
      for (const doc of response.hits.hits) {

        bulk.push({index: {_index: doc._index, _type: doc._type, _id: doc._id}});
        bulk.push(doc._source);
      }

      count += bulk.length / 2;
      console.log(count);
      client_server.bulk({
        body: bulk
      }, function (err, resp) {
        if (count >= response.hits.total) {
          return false;
        }
        else {
          client_local.scroll({
            scroll_id: response._scroll_id,
            scroll: '99999s'
          }, getMoreUntilDone);
        }
      });
    });
  });
});

/*
 client_local.ping({
 requestTimeout: 90000,
 }, function(error){
 if(error){
 return false;
 }

 let type_to_exclude = [
 "thematique_animation_conference",
 "thematique_animation_incentive_evenementiel",
 "thematique_animation_formation"
 ];

 let count = 0;

 client_local.search({
 index: 'sport',
 scroll: '30s', // keep the search results "scrollable" for 30 seconds
 }, function getMoreUntilDone(error, response) {
 let bulk = [];

 for(const doc of response.hits.hits){
 if(!doc || !doc._source){
 continue;
 }

 if(type_to_exclude.includes(doc._type)){
 continue;
 }

 if(doc._type === 'sportif'){
 const {_source} = doc;
 if(!_source){
 continue;
 }

 _source.animations_conference = [];
 _source.animations_formation = [];
 _source.animations_incentive_evenementiel = [];

 doc._source = _source;
 }

 bulk.push({ index:  { _index: 'new_sport', _type: doc._type, _id: doc._id } });
 bulk.push(doc._source);
 }

 count += bulk.length / 2;

 client_local.bulk({
 body: bulk
 }, function (err, resp) {
 if(count >= response.hits.total)
 {
 return false;
 }
 else
 {
 client_local.scroll({
 scrollId: response._scroll_id,
 scroll: '30s'
 }, getMoreUntilDone);
 }
 });
 });
 });
 */