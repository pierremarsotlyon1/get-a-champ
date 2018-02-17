/**
 * Created by pierremarsot on 20/01/2017.
 */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import AutoComplete from 'material-ui/AutoComplete';
import Geosuggest from 'react-geosuggest';
import Checkbox from 'material-ui/Checkbox';
import {connect} from 'react-redux';
import '../../assets/geosuggest/geosuggest.css';

import {
  add_experience_professionnelle_sportif,
  remove_experience_professionnelle_to_update,
  update_experience_professionnelle_sportif,
} from '../../actions/experience_professionnelle_sportif';
import {
  disableDatesAfterToday
} from '../../utils/DatePicker';
import {
  search_metier,
} from '../../actions/metier';

import moment from 'moment';
import {defineDateTimeFormat} from '../../utils/DatePicker';

const DateTimeFormat = defineDateTimeFormat();

class ModalAddExperienceProfessionnelleSportif extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalUpdateExperiencePro: false,
      experience_pro: {},
      disableDateFin: false,
      updating: false,
      id_experience_pro_to_update: undefined,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (nextProps.experience_professionnelle_to_update) {
        let experience_pro = JSON.parse(JSON.stringify(nextProps.experience_professionnelle_to_update));
        if (experience_pro) {
          //On convertit les dates
          const {_source} = experience_pro;
          if (_source) {
            _source.date_debut_experience_professionnelle_sportif = new Date(_source.date_debut_experience_professionnelle_sportif);

            if (_source.date_fin_experience_professionnelle_sportif) {
              _source.date_fin_experience_professionnelle_sportif = new Date(_source.date_fin_experience_professionnelle_sportif);
            }

            let disableDateFin = false;
            if (_source.toujours_en_poste_experience_professionnelle_sportif) {
              disableDateFin = true;
            }

            this.setState({
              experience_pro: _source,
              openModalUpdateExperiencePro: true,
              updating: true,
              disableDateFin: disableDateFin,
              id_experience_pro_to_update: experience_pro._id,
            });
          }
        }
      }
    }
  }

  handleOpenModalAddExperiencePro = () => {
    this.setState({
      openModalUpdateExperiencePro: true,
      experience_pro: {},
      updating: false,
      disableDateFin: false,
      id_experience_pro_to_update: undefined,
    });
  };

  handleSubmitAddOrUpdate = () => {
    const {experience_pro} = this.state;

    if (!experience_pro) {
      return undefined;
    }

    let {
      date_debut_experience_professionnelle_sportif,
      date_fin_experience_professionnelle_sportif,
      toujours_en_poste_experience_professionnelle_sportif
    } = experience_pro;

    if (!date_debut_experience_professionnelle_sportif
      || (!toujours_en_poste_experience_professionnelle_sportif && !date_fin_experience_professionnelle_sportif)) {
      return undefined;
    }

    //On convertit en moment la date
    date_debut_experience_professionnelle_sportif = moment(date_debut_experience_professionnelle_sportif);

    if (!date_debut_experience_professionnelle_sportif) {
      return undefined;
    }

    //On affecte la date
    experience_pro.date_debut_experience_professionnelle_sportif = date_debut_experience_professionnelle_sportif.format('YYYY-MM-DD');

    if (date_fin_experience_professionnelle_sportif) {
      date_fin_experience_professionnelle_sportif = moment(date_fin_experience_professionnelle_sportif);
      experience_pro.date_fin_experience_professionnelle_sportif = date_fin_experience_professionnelle_sportif.format('YYYY-MM-DD');
    }

    return experience_pro;
  };

  handleSubmitModalAddExperiencePro = () => {
    const experience_pro = this.handleSubmitAddOrUpdate();

    this.props.dispatch(add_experience_professionnelle_sportif(experience_pro));
    this.setState({
      openModalUpdateExperiencePro: false,
      experience_pro: {},
      updating: false,
      disableDateFin: false,
      id_experience_pro_to_update: undefined,
    });
  };

  handleSubmitModalUpdateExperiencePro = () => {
    const experience_pro = {
      _id: this.state.id_experience_pro_to_update,
      _source: this.handleSubmitAddOrUpdate()
    };

    this.props.dispatch(update_experience_professionnelle_sportif(experience_pro));
    this.setState({
      openModalUpdateExperiencePro: false,
      experience_pro: {},
      updating: false,
      disableDateFin: false,
      id_experience_pro_to_update: undefined,
    });
  };

  handleCloseModalAddExperiencePro = () => {
    this.setState({
      openModalUpdateExperiencePro: false,
      experience_pro: {},
      updating: false,
      disableDateFin: true,
      id_experience_pro_to_update: undefined,
    });
    this.props.dispatch(remove_experience_professionnelle_to_update());
  };

  handleChangeLieuPosteAddExperiencePro = (geosuggest_experience_pro) => {
    const {experience_pro} = this.state;

    if (geosuggest_experience_pro) {
      experience_pro.lieu_experience_professionnelle_sportif = {
        nom: geosuggest_experience_pro.label,
        _id: geosuggest_experience_pro.placeId,
        location: {
          lat: geosuggest_experience_pro.location.lat,
          lon: geosuggest_experience_pro.location.lng,
        },
      };
    }
    else {
      experience_pro.lieu_experience_professionnelle_sportif = undefined;
    }

    this.setState({
      experience_pro: experience_pro,
    });
  };

  handleChangeNomEntreprise = (event) => {
    const nomEntreprise = event.target.value;
    const {experience_pro} = this.state;

    if (nomEntreprise) {
      experience_pro.nom_entreprise_experience_professionnelle_sportif = nomEntreprise;
    }
    else {
      experience_pro.nom_entreprise_experience_professionnelle_sportif = '';
    }

    this.setState({
      experience_pro: experience_pro,
    });
  };

  handleChangeTitrePoste = (metier) => {
    this.props.dispatch(search_metier(metier));
  };

  handleSaveTitrePoste = (metier) => {
    const {experience_pro} = this.state;

    if (metier && metier.value) {
      experience_pro.metier_experience_professionnelle_sportif = {
        libelle_metier: metier.text,
        _id: metier.value,
      };
    }
    else {
      experience_pro.metier_experience_professionnelle_sportif = undefined;
    }

    this.setState({
      experience_pro: experience_pro,
    });
  };

  changeDateDebutExperiencePro = (e, date) => {
    const {experience_pro} = this.state;

    if (date) {
      experience_pro.date_debut_experience_professionnelle_sportif = date;
    }
    else {
      experience_pro.date_debut_experience_professionnelle_sportif = undefined;
    }

    this.setState({
      experience_pro: experience_pro,
    });
  };

  changeDateFinExperiencePro = (e, date) => {
    const {experience_pro} = this.state;
    if (date) {
      experience_pro.date_fin_experience_professionnelle_sportif = date;
    }
    else {
      experience_pro.date_fin_experience_professionnelle_sportif = undefined;
    }

    this.setState({
      experience_pro: experience_pro,
    });
  };

  handleDescriptionExperiencePro = (event) => {
    const descriptionPoste = event.target.value;
    const {experience_pro} = this.state;

    if (descriptionPoste) {
      experience_pro.description_poste_experience_professionnelle_sportif = descriptionPoste;
    }
    else {
      experience_pro.description_poste_experience_professionnelle_sportif = undefined;
    }

    this.setState({
      experience_pro: experience_pro,
    });
  };

  handleChangeMissionPoste = (event, mission_poste) => {
    const nomEntreprise = event.target.value;
    const {experience_pro} = this.state;

    if (nomEntreprise) {
      experience_pro.mission_poste_experience_professionnelle_sportif = mission_poste;
    }
    else {
      experience_pro.mission_poste_experience_professionnelle_sportif = undefined;
    }

    this.setState({
      experience_pro: experience_pro,
    });
  };

  handleChangeRealisationPoste = (event, realisation_poste) => {
    const nomEntreprise = event.target.value;
    const {experience_pro} = this.state;

    if (nomEntreprise) {
      experience_pro.realisation_poste_experience_professionnelle_sportif = realisation_poste;
    }
    else {
      experience_pro.realisation_poste_experience_professionnelle_sportif = undefined;
    }

    this.setState({
      experience_pro: experience_pro,
    });
  };

  handleToujoursEnPoste = (event, isChecked) => {
    const {experience_pro} = this.state;
    let disableDateFin = this.state.disableDateFin;
    experience_pro.toujours_en_poste_experience_professionnelle_sportif = isChecked;

    if (isChecked) {
      if (experience_pro.date_fin_experience_professionnelle_sportif) {
        delete experience_pro.date_fin_experience_professionnelle_sportif;
      }

      disableDateFin = true;
    }
    else {
      disableDateFin = false;
    }

    this.setState({
      experience_pro: experience_pro,
      disableDateFin: disableDateFin,
    });
  };

  render() {
    const {
      search_metier,
    } = this.props;

    const actions = [
      <FlatButton
        label="Fermer"
        primary={true}
        onTouchTap={this.handleCloseModalAddExperiencePro}
      />
    ];

    const {
      id_experience_pro_to_update,
    } = this.state;

    if (id_experience_pro_to_update) {
      actions.push(<FlatButton
        label="Modifier"
        primary={true}
        onTouchTap={this.handleSubmitModalUpdateExperiencePro}
      />);
    }
    else {
      actions.push(<FlatButton
        label="Enregistrer"
        primary={true}
        onTouchTap={this.handleSubmitModalAddExperiencePro}
      />);
    }

    let metiers = [];
    for (const metier of search_metier) {
      metiers.push({
        value: metier._id,
        text: metier._source.libelle_metier,
      });
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="boxed boxed--md boxed--border">
            <h4>Ajouter une experience professionnelle</h4>
            <form>
              <div className="form-group">
                <AutoComplete
                  floatingLabelText="Titre du poste occupé"
                  hintText="2 lettres minimum"
                  filter={AutoComplete.noFilter}
                  dataSource={metiers}
                  onUpdateInput={this.handleChangeTitrePoste}
                  onNewRequest={this.handleSaveTitrePoste}
                  fullWidth={true}
                  value={this.state.experience_pro.metier_experience_professionnelle_sportif ?
                    this.state.experience_pro.metier_experience_professionnelle_sportif.libelle_metier : ''}
                  searchText={this.state.experience_pro.metier_experience_professionnelle_sportif ?
                    this.state.experience_pro.metier_experience_professionnelle_sportif.libelle_metier : ''}
                />
              </div>

              <div className="form-group">
                <TextField
                  floatingLabelText="Nom de l'entreprise"
                  ref="nomEntrepriseAddExperiencePro"
                  onChange={this.handleChangeNomEntreprise}
                  value={this.state.experience_pro.nom_entreprise_experience_professionnelle_sportif
                    ? this.state.experience_pro.nom_entreprise_experience_professionnelle_sportif
                    : ''
                  }
                />
              </div>

              <div className="form-group">
                <DatePicker
                  hintText="Date de début"
                  DateTimeFormat={DateTimeFormat}
                  okLabel="OK"
                  cancelLabel="Annuler"
                  locale="fr"
                  onChange={this.changeDateDebutExperiencePro}
                  shouldDisableDate={disableDatesAfterToday}
                  value={this.state.experience_pro.date_debut_experience_professionnelle_sportif}
                />
              </div>

              <div className="form-group">
                <DatePicker
                  hintText="Date de fin"
                  DateTimeFormat={DateTimeFormat}
                  okLabel="OK"
                  cancelLabel="Annuler"
                  locale="fr"
                  onChange={this.changeDateFinExperiencePro}
                  shouldDisableDate={disableDatesAfterToday}
                  value={this.state.experience_pro.date_fin_experience_professionnelle_sportif}
                  disabled={this.state.disableDateFin}
                />
              </div>
              <div className="form-group">
                <Checkbox
                  label="Toujours en poste"
                  onCheck={this.handleToujoursEnPoste}
                  checked={this.state.experience_pro.toujours_en_poste_experience_professionnelle_sportif}
                />
              </div>
              <div className="form-group">
                <label>Lieu du poste :</label>
                <Geosuggest
                  placeholder="Lieu du poste"
                  onSuggestSelect={this.handleChangeLieuPosteAddExperiencePro}
                  onSuggestNoResults={this.handleChangeLieuPosteAddExperiencePro}
                  initialValue={this.state.experience_pro.lieu_experience_professionnelle_sportif ?
                    this.state.experience_pro.lieu_experience_professionnelle_sportif.nom
                    : ''}
                />
              </div>
              <div className="form-group">
                <TextField
                  floatingLabelText="Description du poste"
                  multiLine={true}
                  rowsMax={20}
                  onChange={this.handleDescriptionExperiencePro}
                />
              </div>
              <div className="form-group">
                <TextField
                  floatingLabelText="Mission du poste"
                  multiLine={true}
                  rowsMax={20}
                  onChange={this.handleChangeMissionPoste}
                />
              </div>
              <div className="form-group">
                <TextField
                  floatingLabelText="Réalisation du poste"
                  multiLine={true}
                  rowsMax={20}
                  onChange={this.handleChangeRealisationPoste}
                />
              </div>

              <div className="form-group">
                <div onClick={this.handleSubmitModalAddExperiencePro}
                     className="btn btn--primary type--uppercase">
              <span className="btn__text">
                            Ajouter votre experience professionnelle
                          </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {metier, experience_professionnelle_sportif} = state;
  return {
    search_metier: metier.search_metier,
    experience_professionnelle_to_update: experience_professionnelle_sportif.experience_professionnelle_to_update
  };
}

export default connect(mapStateToProps)(ModalAddExperienceProfessionnelleSportif);
