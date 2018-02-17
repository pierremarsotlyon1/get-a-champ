/**
 * Created by pierremarsot on 29/03/2017.
 */
const fs = require('fs');
var asyncMutex = require('async-mutex').Mutex;
const mutex = new asyncMutex();
const elasticsearch = require('elasticsearch');
const client_local = new elasticsearch.Client({
  host: 'http://somar:logitech03@localhost:9200',
  //log: 'trace'
});

const content = fs.readFileSync(__dirname + '/dataset.txt').toString();
if (content && content.length > 0) {
  const skills = content.split('\n');
  if (skills && skills.length > 0) {
    let bulk = [];
    let index = 1;
    for (let skill of skills) {
      skill = skill.trim();
      if (!skill || skill.length === 0) {
        continue;
      }

      bulk.push({
        index: {
          _index: 'sport',
          _type: 'domaine_connaissance',
          _id: index
        }
      });
      bulk.push({
        nom_domaine_connaissance: skill,
      });

      index++;
    }

    while (bulk.length > 0) {
      const removed = bulk.splice(0, 4000);
      if (removed) {
        mutex
          .acquire()
          .then((release) => {
            client_local.bulk({
              body: removed
            }, function (err, resp) {
              release();
            });
          });
      }
    }
  }
}