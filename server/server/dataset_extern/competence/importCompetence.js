let cheerio = require('cheerio');
var fetchUrl = require("fetch").fetchUrl;
const elasticsearch = require('elasticsearch');
const client_local = new elasticsearch.Client({
  host: 'http://somar:logitech03@localhost:9200',
  //log: 'trace'
});

fetchUrl("http://www.360-feedback.be/FR/sliders/competenties-en-360-feedback.html", function(error, meta, body){
  if(error){
    console.log(error);
    return false;
  }

  body = body.toString();
  console.log(body);
  if(body){
    let $ = cheerio.load(body);
    const tableXpath = ".item-page table tbody tr td";
    let bulk = [];
    $(tableXpath).each(function(i, elem) {
      const competence = $(this).text();
      if(competence && competence.length > 0){
        console.log(competence);
        const tab = competence.split('. ');
        if(tab && tab.length === 2){
          bulk.push({
            index: {
              _index: 'sport',
              _type: 'domaine_competence',
              _id: tab[0]
            }
          });
          bulk.push({
            nom_domaine_competence: tab[1]
          });
        }
      }
    });

    if(bulk.length > 0){
      client_local.bulk({
        body: bulk
      }, function (err, resp) {
        return false;
      });
    }
  }
});