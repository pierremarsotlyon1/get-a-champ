import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import profil_sportif from '../reducers/profil_sportif';
import auth from '../reducers/auth';
import experience_professionnelle_sportif from '../reducers/experience_professionnelle_sportif';
import competition_sportif from '../reducers/competition_sportif';
import experience_sportif from '../reducers/experience_sportif';
import domainesConnaissanceSportif from '../reducers/domaine_connaissance_sportif';
import domainesConnaissance from '../reducers/domaine_connaissance';
import niveauDomaineConnaissance from '../reducers/niveau_domaine_connaissance';
import animationsFormationSportif from '../reducers/animations_formation_sportif';
import animationsIncentiveEvenementielSportif from '../reducers/animations_incentive_evenementiel';
import animationsConferenceSportif from '../reducers/animations_conference_sportif';
import thematiqueAnimationFormation from '../reducers/thematique_animation_formation';
import thematiqueAnimationIncentiveEvenementiel from '../reducers/thematique_animation_incentive_evenementiel';
import thematiqueAnimationConference from '../reducers/thematique_animation_conference';
import contratsMissionEntrepriseSportif from '../reducers/contrats_mission_entreprise_sportif';
import missionProduitImageSportif from '../reducers/mission_produit_image_sportif';
import sponsoringSportif from '../reducers/sponsoring_sportif';
import calendarSportif from '../reducers/calendar_sportif';
import langue from '../reducers/langue';
import niveauLangue from '../reducers/niveau_langue';
import langueSportif from '../reducers/langue_sportif';
import situationEntreprise from '../reducers/situation_entreprise';
import typeSponsoring from '../reducers/type_sponsoring';
import tailleEntreprise from '../reducers/taille_entreprise';
import profilEntreprise from '../reducers/profil_entreprise';
import rechercheSituationSportif from '../reducers/recherche_situation_sportif';
import toasts from '../reducers/toasts';
import ecole from '../reducers/ecole';
import searchSportifAnimationFormation from '../reducers/search_sportif_animation_formation';
import searchSportifAnimationConference from '../reducers/search_sportif_animation_conference';
import searchSportifAnimationIncentive from '../reducers/search_sportif_animation_incentive';
import searchSportifSponsoring from '../reducers/search_sponsoring';
import metier from '../reducers/metier';
import recrutementEntreprise from '../reducers/recrutement_entreprise';
import niveauxEtude from '../reducers/niveaux_etude';
import typeContrat from '../reducers/type_contrat';
import dimensionSportive from '../reducers/dimension_sportive';
import offreEmploiEntreprise from '../reducers/offre_emploi_entreprise';
import salaire from '../reducers/salaire';
import ipip from '../reducers/ipip';
import domaineCompetence from '../reducers/domaine_competence';
import domainesCompetenceSportif from '../reducers/domaine_competence_sportif';

import reduxReset from 'redux-reset'

const logger = createLogger();
const rootReducer = combineReducers(
  {
    auth,
    profil_sportif,
    experience_professionnelle_sportif,
    competition_sportif,
    experience_sportif,
    domainesConnaissanceSportif,
    domainesConnaissance,
    niveauDomaineConnaissance,
    animationsFormationSportif,
    animationsIncentiveEvenementielSportif,
    animationsConferenceSportif,
    thematiqueAnimationFormation,
    thematiqueAnimationIncentiveEvenementiel,
    thematiqueAnimationConference,
    contratsMissionEntrepriseSportif,
    missionProduitImageSportif,
    sponsoringSportif,
    calendarSportif,
    langue,
    niveauLangue,
    langueSportif,
    situationEntreprise,
    typeSponsoring,
    tailleEntreprise,
    profilEntreprise,
    rechercheSituationSportif,
    ecole,
    searchSportifAnimationFormation,
    searchSportifAnimationIncentive,
    searchSportifAnimationConference,
    searchSportifSponsoring,
    metier,
    recrutementEntreprise,
    niveauxEtude,
    typeContrat,
    dimensionSportive,
    offreEmploiEntreprise,
    salaire,
    ipip,
    domaineCompetence,
    domainesCompetenceSportif,
    toasts,
  }
);

const initialState = {};

export default function configureStore() {
  let store;

  if (module.hot) {
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(thunkMiddleware, logger),
      reduxReset(),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
  } else {
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(thunkMiddleware),
      reduxReset(),
      f=>f
    ));
  }

  return store;
}
