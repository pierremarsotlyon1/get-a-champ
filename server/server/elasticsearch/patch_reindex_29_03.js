`POST _reindex
{
  "source": {
  "index": "save_sport"
},
  "dest": {
  "index": "new_sport"
},
  "script": {
  "inline": "if (ctx._type == 'domaine_connaissance_sportif' || ctx._type == 'domaine_connaissance_sportif') {ctx.op = 'noop';} if(ctx._type == 'connaissance'){ctx._type = 'connaissance_metier';} if(ctx._type == 'niveau_domaine_connaissance'){ctx._type = 'niveau_domaine_connaissance_competence';} if(ctx._type == 'competence'){ctx._type = 'competence_metier';}",
    "lang": "painless"
}
}`