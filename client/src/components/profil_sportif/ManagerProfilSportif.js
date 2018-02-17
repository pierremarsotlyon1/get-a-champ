/**
 * Created by pierremarsot on 21/01/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import Geosuggest from 'react-geosuggest';
import InputMask from 'react-input-mask';
import {MASK_NUMERO_SS} from '../../utils/ManagerMask';

import '../../assets/geosuggest/geosuggest.css';

import {
  get_profil_sportif,
  update_profil_sportif,
  get_situation_sportif,
  load_categorie_sportif,
  get_centres_interet,
  search_sport,
} from '../../actions/profil_sportif';

import {
  load_situation_entreprise,
} from '../../actions/situation_entreprise';

import {
  load_recherche_situation_sportif,
} from '../../actions/recherche_situation_sportif';

import {
  disableDatesAfterToday,
} from '../../utils/DatePicker';

import moment from 'moment';
import {defineDateTimeFormat} from '../../utils/DatePicker';

const DateTimeFormat = defineDateTimeFormat();

class ManagerProfilSportif extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profil_sportif: undefined,
    };
  }

  componentDidMount() {
    const {
      profil_sportif,
      categories_sportif,
      situation_sportif,
      centres_interet,
      situations_entreprise,
      recherches_situations_sportif,
    } = this.props;

    if (!categories_sportif || categories_sportif.length === 0) {
      this.props.dispatch(load_categorie_sportif());
    }
    if (!situation_sportif || situation_sportif.length === 0) {
      this.props.dispatch(get_situation_sportif());
    }
    if (!centres_interet || centres_interet.length === 0) {
      this.props.dispatch(get_centres_interet());
    }
    if (!situations_entreprise || situations_entreprise.length === 0) {
      this.props.dispatch(load_situation_entreprise());
    }

    if (!recherches_situations_sportif || recherches_situations_sportif.length === 0) {
      this.props.dispatch(load_recherche_situation_sportif());
    }

    /*if (!profil_sportif) {
      this.props.dispatch(get_profil_sportif());
    }
    else {
      this.affectProfilSportif(profil_sportif);
    }*/
    this.props.dispatch(get_profil_sportif());
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.profil_sportif && nextProps.profil_sportif) {
      this.affectProfilSportif(nextProps.profil_sportif);
    }
  }

  affectProfilSportif = (profil_sportif) => {
    if (profil_sportif) {
      let tab_centres_interets_sportif = [];
      if (profil_sportif.centres_interets_sportif && profil_sportif.centres_interets_sportif.length > 0) {
        for (const x of profil_sportif.centres_interets_sportif) {
          tab_centres_interets_sportif.push(x._id);
        }
      }

      let situation_entreprise_sportif = undefined;
      if (profil_sportif.situation_entreprise_sportif) {
        situation_entreprise_sportif = profil_sportif.situation_entreprise_sportif._id;
      }

      let tab_recherche_situation_sportif = [];
      if (profil_sportif.recherche_situation_sportif && profil_sportif.recherche_situation_sportif.length > 0) {
        profil_sportif.recherche_situation_sportif.forEach((recherche_situation_sportif) => {
          if (!recherche_situation_sportif._id) {
            return false;
          }

          tab_recherche_situation_sportif.push(recherche_situation_sportif._id);
        });
      }

      const new_profil_sportif = {
        nom_sportif: profil_sportif.nom_sportif,
        prenom_sportif: profil_sportif.prenom_sportif,
        date_naissance_sportif: profil_sportif.date_naissance_sportif
          ? new Date(profil_sportif.date_naissance_sportif)
          : undefined,
        lieu_naissance_sportif: profil_sportif.lieu_naissance_sportif
          ? {
            placeId: profil_sportif.lieu_naissance_sportif._id,
            label: profil_sportif.lieu_naissance_sportif.nom,
            location: {
              lat: profil_sportif.lieu_naissance_sportif.location.lat,
              lng: profil_sportif.lieu_naissance_sportif.location.lon,
            }
          }
          : undefined,
        numero_ss_sportif: profil_sportif.numero_ss_sportif,
        current_sport_sportif: profil_sportif.current_sport_sportif
          ? {
            value: profil_sportif.current_sport_sportif._id,
            text: profil_sportif.current_sport_sportif.nom_sport,
          }
          : undefined,
        categorie_sportif: profil_sportif.categorie_sportif
          ? profil_sportif.categorie_sportif._id
          : undefined,
        situation_sportif: profil_sportif.situation_sportif
          ? profil_sportif.situation_sportif._id
          : undefined,
        centres_interets_sportif: tab_centres_interets_sportif,
        situation_entreprise_sportif: situation_entreprise_sportif,
        recherche_situation_sportif: tab_recherche_situation_sportif,
      };

      this.setState({
        profil_sportif: new_profil_sportif
      });
    }
  };

  changeNomSportif = (event) => {
    const nom_sportif = event.target.value;
    const {profil_sportif} = this.state;
    if (nom_sportif) {
      profil_sportif.nom_sportif = nom_sportif;
    }
    else {
      profil_sportif.nom_sportif = undefined;
    }

    this.setState({
      profil_sportif: profil_sportif
    });
  };

  changePrenomSportif = (event) => {
    const prenom_sportif = event.target.value;
    const {profil_sportif} = this.state;
    if (prenom_sportif) {
      profil_sportif.prenom_sportif = prenom_sportif;
    }
    else {
      profil_sportif.prenom_sportif = undefined;
    }

    this.setState({
      profil_sportif: profil_sportif
    });
  };

  changeDateNaissanceSportif = (event, date) => {
    const {profil_sportif} = this.state;
    if (date) {
      profil_sportif.date_naissance_sportif = date;
    }
    else {
      profil_sportif.date_naissance_sportif = undefined;
    }

    this.setState({
      profil_sportif: profil_sportif
    });
  };

  changeLieuNaissanceSportif = (geosuggest) => {
    const {profil_sportif} = this.state;
    if (geosuggest) {
      profil_sportif.lieu_naissance_sportif = geosuggest;
    }
    else {
      profil_sportif.lieu_naissance_sportif = undefined;
    }

    this.setState({
      profil_sportif: profil_sportif
    });
  };

  changeSportSportif = (sport) => {
    const {profil_sportif} = this.state;

    if (sport && sport.value) {
      profil_sportif.current_sport_sportif = sport;
    }
    else {
      profil_sportif.current_sport_sportif = undefined;
    }

    this.setState({
      profil_sportif: profil_sportif
    });
  };

  changeCategorieSportSportif = (event, key, value) => {
    const {profil_sportif} = this.state;
    profil_sportif.categorie_sportif = value;

    this.setState({
      profil_sportif: profil_sportif
    });
  };

  changeSituationSportif = (event, key, value) => {
    const {profil_sportif} = this.state;
    if (value) {
      profil_sportif.situation_sportif = value;
    }
    else {
      profil_sportif.situation_sportif = undefined;
    }

    this.setState({
      profil_sportif: profil_sportif
    });
  };

  changeSituationEntreprise = (event, key, value) => {
    const {profil_sportif} = this.state;
    if (value) {
      profil_sportif.situation_entreprise_sportif = value;
    }
    else {
      profil_sportif.situation_entreprise_sportif = undefined;
    }

    this.setState({
      profil_sportif: profil_sportif
    });
  };

  changeCentreInteretSportif = (event, index, values) => {
    const {profil_sportif} = this.state;
    profil_sportif.centres_interets_sportif = values;

    this.setState({
      profil_sportif: profil_sportif
    });
  };

  changeNumeroSsSportif = (event) => {

    const numero_ss_sportif = event.target.value;
    const {profil_sportif} = this.state;
    if (numero_ss_sportif) {
      profil_sportif.numero_ss_sportif = numero_ss_sportif;
    }
    else {
      profil_sportif.numero_ss_sportif = undefined;
    }

    this.setState({
      profil_sportif: profil_sportif
    });
  };

  handleRechercheSituationSportif = (id) => {
    const {profil_sportif} = this.state;
    if (!profil_sportif) {
      return false;
    }

    if (!profil_sportif.recherche_situation_sportif) {
      profil_sportif.recherche_situation_sportif = [];
    }

    const indexOf = profil_sportif.recherche_situation_sportif.indexOf(id);
    if (indexOf < 0) {
      profil_sportif.recherche_situation_sportif.push(id);
    }
    else {
      profil_sportif.recherche_situation_sportif.splice(indexOf, 1);
    }

    this.setState({
      profil_sportif: profil_sportif
    });
  };

  getSport = (input) => {
    if (!input) {
      const {profil_sportif} = this.state;
      profil_sportif.current_sport_sportif = undefined;

      this.setState({
        profil_sportif: profil_sportif
      });

      return false;
    }

    this.props.dispatch(search_sport(input));
  };

  updateProfil = (event) => {
    event.preventDefault();

    const profil_sportif = this.state.profil_sportif;
    let new_profil_sportif = {
      nom_sportif: profil_sportif.nom_sportif,
      prenom_sportif: profil_sportif.prenom_sportif
    };

    if (profil_sportif.date_naissance_sportif) {
      new_profil_sportif.date_naissance_sportif = moment(profil_sportif.date_naissance_sportif).format('YYYY-MM-DD');
    }

    if (profil_sportif.lieu_naissance_sportif) {
      new_profil_sportif.lieu_naissance_sportif = {
        _id: profil_sportif.lieu_naissance_sportif.placeId,
        nom: profil_sportif.lieu_naissance_sportif.label,
        location: {
          lat: profil_sportif.lieu_naissance_sportif.location.lat,
          lon: profil_sportif.lieu_naissance_sportif.location.lng,
        },
      };
    }

    if (profil_sportif.numero_ss_sportif) {
      new_profil_sportif.numero_ss_sportif = profil_sportif.numero_ss_sportif;
    }

    if (profil_sportif.current_sport_sportif) {
      new_profil_sportif.current_sport_sportif = {
        _id: profil_sportif.current_sport_sportif.value,
        nom_sport: profil_sportif.current_sport_sportif.label,
      }
    }

    if (profil_sportif.categorie_sportif) {
      const {categories_sportif} = this.props;
      if (categories_sportif) {
        for (const c of categories_sportif) {
          if (c._id === profil_sportif.categorie_sportif) {
            new_profil_sportif.categorie_sportif = {
              _id: c._id,
              nom: c._source.nom_categorie_sportif,
            };
            break;
          }
        }
      }
    }

    if (profil_sportif.situation_sportif) {
      //On récup le situation sportive
      const {situation_sportif} = this.props;
      if (situation_sportif && situation_sportif.length > 0) {
        let situation;
        for (const s of situation_sportif) {
          if (s._id === profil_sportif.situation_sportif) {
            situation = s;
            break;
          }
        }

        if (situation) {
          new_profil_sportif.situation_sportif = {
            _id: situation._id,
            nom: situation._source.nom_situation_sportif,
          }
        }
      }
    }

    if (profil_sportif.centres_interets_sportif) {
      new_profil_sportif.centres_interets_sportif = [];
      const {centres_interet} = this.props;
      if (centres_interet) {
        for (const id_centre_interet of profil_sportif.centres_interets_sportif) {
          for (const centre_interet of centres_interet) {
            if (id_centre_interet === centre_interet._id) {
              new_profil_sportif.centres_interets_sportif.push({
                _id: centre_interet._id,
                nom: centre_interet._source.nom_centre_interet,
              });
              break;
            }
          }
        }
      }
    }

    if (profil_sportif.situation_entreprise_sportif) {
      //On récup le situation sportive
      const {situations_entreprise} = this.props;
      if (situations_entreprise && situations_entreprise.length > 0) {
        let situation;
        for (const s of situations_entreprise) {
          if (s._id === profil_sportif.situation_entreprise_sportif) {
            situation = s;
            break;
          }
        }

        if (situation) {
          new_profil_sportif.situation_entreprise_sportif = {
            _id: situation._id,
            nom_situation_entreprise: situation._source.nom_situation_entreprise,
          }
        }
      }
    }

    if (profil_sportif.recherche_situation_sportif && profil_sportif.recherche_situation_sportif.length > 0) {

      new_profil_sportif.recherche_situation_sportif = profil_sportif.recherche_situation_sportif;
    }

    this.props.dispatch(update_profil_sportif(new_profil_sportif));
  };

  render() {
    const {
      search_sports,
      categories_sportif,
      situation_sportif,
      centres_interet,
      situations_entreprise,
      recherches_situations_sportif,
    } = this.props;

    const {
      profil_sportif
    } = this.state;

    let situations_entreprise_local = [];
    for (const situation_entreprise of situations_entreprise) {
      situations_entreprise_local.push(
        <MenuItem key={situation_entreprise._id} value={situation_entreprise._id}
                  primaryText={situation_entreprise._source.nom_situation_entreprise}/>
      );
    }

    let recherches_situations_sportif_local = [];
    if (profil_sportif && recherches_situations_sportif && recherches_situations_sportif.length > 0) {
      const sportif_have_recherche_situation_sportif =
        profil_sportif.recherche_situation_sportif
        && profil_sportif.recherche_situation_sportif.length > 0;

      for (const recherche_situation_sportif of recherches_situations_sportif) {
        let find = false;
        if (sportif_have_recherche_situation_sportif) {
          find = profil_sportif.recherche_situation_sportif.includes(recherche_situation_sportif._id);
        }

        recherches_situations_sportif_local.push(
          <Checkbox
            key={recherche_situation_sportif._id}
            label={recherche_situation_sportif._source.nom_recherche_situation_sportif}
            checked={find}
            onCheck={() => this.handleRechercheSituationSportif(recherche_situation_sportif._id)}
          />
        );
      }
    }

    let situation_sportif_local = [];
    for (const s of situation_sportif) {
      if (!s || !s._source) {
        continue;
      }

      situation_sportif_local.push(
        <MenuItem key={s._id} value={s._id} primaryText={s._source.nom_situation_sportif}/>
      );
    }

    let centres_interet_local = [];
    if (profil_sportif) {
      for (const c of centres_interet) {
        if (!c || !c._source || !c._id) {
          continue;
        }

        centres_interet_local.push(
          <MenuItem
            key={c._id}
            insetChildren={true}
            value={c._id}
            checked={profil_sportif.centres_interets_sportif && profil_sportif.centres_interets_sportif.includes(c._id)}
            primaryText={c._source.nom_centre_interet}
          />
        );
      }
    }

    let categories_sportif_local = [];
    if (categories_sportif) {
      for (const c of categories_sportif) {
        if (!c || !c._id || !c._source) {
          continue;
        }

        categories_sportif_local.push(
          <MenuItem key={c._id} value={c._id} primaryText={c._source.nom_categorie_sportif}/>
        );
      }
    }

    let search_sports_local = [];
    for (const sport of search_sports) {
      if (!sport || !sport._id || !sport._source) {
        continue;
      }

      search_sports_local.push({
        value: sport._id,
        text: sport._source.nom_sport,
      });
    }

    return (
      <div id="manager-profil-sportif">
        {
          !profil_sportif
            ?
            <div className="row">
              <div className="col-md-12">
                <div className="alert alert-info">
                  Chargement de vos données en cours ...
                </div>
              </div>
            </div>
            :
            <div className="row">
              <div className="col-md-3">
                <div className="boxed boxed--md boxed--border">
                  <div className="text-block text-center">
                    <img alt="avatar" src="/assets/img/avatar-round-3.png" className="image--sm"/>
                    <span className="h5">{profil_sportif.nom_sportif} {profil_sportif.prenom_sportif}</span>
                    <p>
                      {
                        !(profil_sportif.current_sport_sportif)
                          ?
                          <div className="text-info">
                            Vous n'avez pas ajouté votre sport actuel
                          </div>
                          :
                          <span>
                                  Sport actuel : {profil_sportif.current_sport_sportif.text}
                                </span>
                      }
                    </p>
                  </div>
                  <hr/>
                  <div className="text-block">
                    <ul className="menu-vertical">
                      <li>
                        <a href="#"
                           data-toggle-class=".account-tab:not(.hidden);hidden|#account-profile;hidden">
                          Mes informations
                        </a>
                      </li>
                      <li>
                        <a href="#" data-toggle-class=".account-tab:not(.hidden);hidden|#account-sport;hidden">
                          Mon sport
                        </a>
                      </li>
                      <li>
                        <a href="#" data-toggle-class=".account-tab:not(.hidden);hidden|#account-recherches;hidden">
                          Mes recherches
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className=" boxed boxed--lg boxed--border">
                  <div id="account-profile" className="account-tab">
                    <div className="row">
                      <div className="col-md-4 pull-left">
                        <h4>Mes informations</h4>
                      </div>
                      <div className="col-md-8 pull-right">
                        <p className="btn btn--primary type--uppercase pull-right" onClick={this.updateProfil}>
                          <span className="btn__text">
                            Sauvegarder mes informations
                          </span>
                        </p>
                      </div>
                    </div>
                    <form>
                      <div className="form-group">
                        <TextField
                          floatingLabelText="Nom"
                          value={profil_sportif.nom_sportif}
                          onChange={this.changeNomSportif}
                        />
                      </div>
                      <div className="form-group">
                        <TextField
                          floatingLabelText="Prénom"
                          value={profil_sportif.prenom_sportif}
                          onChange={this.changePrenomSportif}
                        />
                      </div>
                      <div className="form-group">
                        <DatePicker
                          floatingLabelText="Date de naissance"
                          DateTimeFormat={DateTimeFormat}
                          defaultDate={profil_sportif.date_naissance_sportif}
                          okLabel="OK" cancelLabel="Annuler" locale="fr"
                          onChange={this.changeDateNaissanceSportif}
                          shouldDisableDate={disableDatesAfterToday}
                        />
                      </div>
                      <div className="form-group">
                        <label>Lieu de naissance :</label>
                        <Geosuggest
                          placeholder="Lieu de naissance"
                          initialValue={profil_sportif.lieu_naissance_sportif ? profil_sportif.lieu_naissance_sportif.label : ''}
                          onSuggestSelect={this.changeLieuNaissanceSportif}
                          onSuggestNoResults={this.changeLieuNaissanceSportif}
                        />
                      </div>
                      <div className="form-group">
                        <SelectField
                          floatingLabelText="Votre situation sportive actuelle"
                          value={profil_sportif.situation_sportif}
                          onChange={this.changeSituationSportif}
                        >
                          {situation_sportif_local}
                        </SelectField>
                      </div>
                      <div className="form-group">
                        <SelectField
                          floatingLabelText="Votre situation entreprise actuelle"
                          value={profil_sportif.situation_entreprise_sportif}
                          onChange={this.changeSituationEntreprise}
                        >
                          {situations_entreprise_local}
                        </SelectField>
                      </div>
                      <div className="form-group">
                        <SelectField
                          multiple={true}
                          floatingLabelText="Mes centres d'intérêts"
                          value={profil_sportif.centres_interets_sportif}
                          onChange={this.changeCentreInteretSportif}
                        >
                          {centres_interet_local}
                        </SelectField>
                      </div>
                      <div className="form-group">
                        <TextField
                          floatingLabelText="Numéro SS"
                          value={profil_sportif.numero_ss_sportif}
                          onChange={this.changeNumeroSsSportif}
                        >
                          <InputMask
                            mask={MASK_NUMERO_SS}
                            defaultValue={profil_sportif.numero_ss_sportif}
                          />
                        </TextField>
                      </div>
                    </form>
                  </div>
                  <div id="account-sport" className=" account-tab hidden">
                    <div className="row">
                      <div className="col-md-4 pull-left">
                        <h4>Mon sport</h4>
                      </div>
                      <div className="col-md-8 pull-right">
                        <p className="btn btn--primary type--uppercase pull-right" onClick={this.updateProfil}>
                          <span className="btn__text">
                            Sauvegarder mes informations
                          </span>
                        </p>
                      </div>
                    </div>
                    <form>
                      <div className="form-group">
                        <AutoComplete
                          floatingLabelText="Mon sport actuel"
                          filter={AutoComplete.noFilter}
                          dataSource={search_sports_local}
                          onUpdateInput={this.getSport}
                          onNewRequest={this.changeSportSportif}
                          value={profil_sportif.current_sport_sportif}
                          searchText={profil_sportif.current_sport_sportif ? profil_sportif.current_sport_sportif.text : ''}
                          fullWidth={true}
                        />
                      </div>
                      <div className="form-group">
                        <SelectField
                          floatingLabelText="Séléctionnez une catégorie"
                          value={profil_sportif.categorie_sportif}
                          onChange={this.changeCategorieSportSportif}
                        >
                          {categories_sportif_local}
                        </SelectField>
                      </div>
                    </form>
                  </div>
                  <div id="account-recherches" className=" hidden account-tab">
                    <div className="row">
                      <div className="col-md-4 pull-left">
                        <h4>Mes recherches</h4>
                      </div>
                      <div className="col-md-8 pull-right">
                        <p className="btn btn--primary type--uppercase pull-right" onClick={this.updateProfil}>
                          <span className="btn__text">
                            Sauvegarder mes informations
                          </span>
                        </p>
                      </div>
                    </div>
                    {recherches_situations_sportif_local}
                  </div>
                </div>
              </div>
            </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {profil_sportif, situationEntreprise, rechercheSituationSportif} = state;
  if (profil_sportif && situationEntreprise && rechercheSituationSportif) {
    return {
      search_sports: profil_sportif.search_sports,
      categories_sportif: profil_sportif.categories_sportif,
      situation_sportif: profil_sportif.situation_sportif,
      centres_interet: profil_sportif.centres_interet,
      profil_sportif: profil_sportif.profil_sportif,
      situations_entreprise: situationEntreprise.situations_entreprise,
      recherches_situations_sportif: rechercheSituationSportif.recherches_situations_sportif,
    };
  }


  return {
    search_sports: [],
    categories_sportif: [],
    situation_sportif: [],
    centres_interet: [],
    situations_entreprise: [],
    recherches_situations_sportif: [],
    profil_sportif: undefined,
  };
}

export default connect(mapStateToProps)(ManagerProfilSportif);