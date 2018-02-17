var mongoose     = require('mongoose')
  , mongoosastic = require('mongoosastic')
  , Schema       = mongoose.Schema;

const Sportif = new Schema({
  nom: String,
  prenom: String,
  password: Keyword,
  email: Keyword,
  activated: Boolean
});

Sportif.plugin(mongoosastic, {
    index: 'sport',
    type: 'sportif',
});