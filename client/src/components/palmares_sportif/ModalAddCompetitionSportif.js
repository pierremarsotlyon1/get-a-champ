/**
 * Created by pierremarsot on 23/02/2017.
 */
import React, {Component, PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {SimpleSelect} from 'react-selectize';
import Geosuggest from 'react-geosuggest';
import '../../assets/geosuggest/geosuggest.css';
import DatePicker from 'material-ui/DatePicker';
import InputElement from 'react-input-mask';

import {
  disableDatesAfterToday
} from '../../utils/DatePicker';

import moment from 'moment';
import {defineDateTimeFormat} from '../../utils/DatePicker';

const DateTimeFormat = defineDateTimeFormat();

class ModalAddCompetitionSportif extends Component{
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentWillReceiveProps(props) {
    if (props) {

    }
  }

  formatterCompetition = (competition) => {
    let new_competition = {};

    if (!competition) {
      new_competition = this.defaultCompetition();
    }
    else {
      //On clone
      new_competition = JSON.parse(JSON.stringify(competition));//Object.assign(new_competition, experience);

      if (new_competition._source && new_competition._source.sport_competition_sportif) {
        new_competition._source.sport_competition_sportif = {
          ...new_competition._source.sport_competition_sportif,
          value: new_competition._source.sport_competition_sportif._id,
          label: new_competition._source.sport_competition_sportif.nom_sport,
        };
        delete new_competition._source.sport_competition_sportif._id;
        delete new_competition._source.sport_competition_sportif.nom_sport;
      }

      if (new_competition._source && new_competition._source.lieu_competition) {
        new_competition._source.lieu_competition = {
          ...new_competition._source.lieu_competition,
          label: new_competition._source.lieu_competition.nom,
          placeId: new_competition._source.lieu_competition._id,
          location: {
            lng: new_competition._source.lieu_competition.location.lon,
            lat: new_competition._source.lieu_competition.location.lat,
          }
        };
        delete new_competition._source.lieu_competition._id;
        delete new_competition._source.lieu_competition.nom;
      }

      if (new_competition._source && new_competition._source.niveau_competition_sportif) {
        new_competition._source.niveau_competition_sportif = {
          ...new_competition._source.niveau_competition_sportif,
          value: new_competition._source.niveau_competition_sportif._id,
          label: new_competition._source.niveau_competition_sportif.nom_niveau_competition_sportif,
        };
        delete new_competition._source.niveau_competition_sportif._id;
        delete new_competition._source.niveau_competition_sportif.nom_niveau_competition_sportif;
      }

      if (new_competition._source && new_competition._source.date_debut_competition_sportif) {
        new_competition._source.date_debut_competition_sportif =
          new Date(new_competition._source.date_debut_competition_sportif);
      }

      /*if (new_competition._source && new_competition._source.date_fin_competition_sportif) {
       new_competition._source.date_fin_competition_sportif =
       new Date(new_competition._source.date_fin_competition_sportif);
       }*/
    }

    this.setState({
      competition: new_competition,
    });
  };

  defaultCompetition = () => {
    return {
      _id: '',
      _source: {
        lieu_competition: {
          placeId: '',
          label: '',
          location: {
            lat: null,
            lng: null
          }
        },
        sport_competition_sportif: {
          value: '',
          label: '',
        },
        niveau_competition_sportif: {
          value: '',
          label: '',
        },
        date_debut_competition_sportif: undefined,
        //date_fin_competition_sportif: undefined,
        rang_competiton_sportif: undefined,
        video_competition_sportif: undefined,
        date_upload_video_competition_sportif: undefined,
      },
    }
  };

  handleDismiss = () => {
    this.setState({
      competition: this.defaultCompetition(),
      open: false,
    }, () => {
      this.props.onDismiss();
    });
  };

  handleSubmit = () => {
    let date_debut;
    if (this.state.competition._source.date_debut_competition_sportif
      && typeof this.state.competition._source.date_debut_competition_sportif === 'object') {
      date_debut = moment(this.state.competition._source.date_debut_competition_sportif).format('YYYY-MM-DD');
    }

    /*if (this.state.competition._source.date_fin_competition_sportif &&
     typeof this.state.competition._source.date_fin_competition_sportif === 'object') {
     date_fin = moment(this.state.competition._source.date_fin_competition_sportif).format('YYYY-MM-DD');
     }*/

    const competition = {
      _id: this.state.competition._id,
      _source: {
        lieu_competition: {
          _id: this.state.competition._source.lieu_competition.placeId,
          nom: this.state.competition._source.lieu_competition.label,
          location: {
            lat: this.state.competition._source.lieu_competition.location.lat,
            lon: this.state.competition._source.lieu_competition.location.lng,
          }
        },
        sport_competition_sportif: {
          _id: this.state.competition._source.sport_competition_sportif.value,
          nom_sport: this.state.competition._source.sport_competition_sportif.label,
        },
        niveau_competition_sportif: {
          _id: this.state.competition._source.niveau_competition_sportif.value,
          nom_niveau_competition_sportif: this.state.competition._source.niveau_competition_sportif.label,
        },
        date_debut_competition_sportif: date_debut,
        //date_fin_competition_sportif: date_fin,
        rang_competiton_sportif: this.state.competition._source.rang_competiton_sportif,
        video_competition_sportif: this.state.competition._source.video_competition_sportif,
        date_upload_video_competition_sportif: this.state.competition._source.date_upload_video_competition_sportif,
      },
    };

    this.props.onSubmit(competition);
    this.setState({
      competition: this.defaultCompetition(),
    });
  };

  changeNiveauCompetition = (niveau_competition) => {
    const competition = this.state.competition;
    if (niveau_competition) {
      competition._source.niveau_competition_sportif = niveau_competition;
    }
    else {
      competition._source.niveau_competition_sportif = {
        value: '',
        label: '',
      };
    }

    this.setState({
      competition: competition,
    });
  };

  changeDateDebutCompetition = (event, date) => {
    const competition = this.state.competition;
    if (date) {
      competition._source.date_debut_competition_sportif = date;
    }
    else {
      competition._source.date_debut_competition_sportif = undefined;
    }

    this.setState({
      competition: competition,
    });
  };

  changeGeosuggestCompetition = (geosuggest_competition) => {
    const competition = this.state.competition;
    if (!geosuggest_competition) {
      competition._source.lieu_competition = {
        placeId: '',
        label: '',
        location: {
          lat: null,
          lng: null
        }
      };
    }
    else {
      competition._source.lieu_competition = geosuggest_competition;
    }

    this.setState({
      competition: competition,
    });
  };

  changeRangCompetition = (event) => {
    const rang = Number.parseInt(event.target.value, 0);
    const competition = this.state.competition;
    if (rang) {
      competition._source.rang_competiton_sportif = rang;
    }
    else {
      competition._source.rang_competiton_sportif = undefined;
    }

    this.setState({
      competition: competition,
    });
  };

  changeSportCompetition = (sport_competition) => {
    const competition = this.state.competition;
    if (sport_competition) {
      competition._source.sport_competition_sportif = sport_competition;
    }
    else {
      competition._source.sport_competition_sportif = {
        value: '',
        label: '',
      };
    }

    this.setState({
      competition: competition,
    });
  };

  getSport = (input) => {
    if (!input) {
      return false;
    }

    this.props.dispatch(search_sport(input));
  };

  render() {

    const actionsModalCompetition = [
      <FlatButton
        label="Fermer"
        primary={true}
        onTouchTap={this.handleDismiss}
      />,
      <FlatButton
        label="Enregistrer"
        primary={true}
        onTouchTap={this.handleSubmit}
      />,
    ];

    return (
      <Dialog
        title={this.props.title}
        actions={actionsModalCompetition}
        modal={false}
        open={this.props.open}
        onRequestClose={this.handleDismiss}
        autoScrollBodyContent={true}
      >
        <form role="form">
          <div className="form-group">
            <label>Lieu de la compétition :</label>
            <Geosuggest
              placeholder="Lieu de la compétition"
              initialValue={this.state.competition._source.lieu_competition.label}
              onSuggestSelect={this.changeGeosuggestCompetition}
              onSuggestNoResults={this.changeGeosuggestCompetition}
            />
          </div>
          <div className="form-group">
            <label>Le sport pratiqué</label>
            <SimpleSelect
              placeholder="Séléctionnez le sport pratiqué"
              theme="material"
              className="form-control"
              onSearchChange={this.props.getSport}
              options={this.props.search_sports}
              value={this.state.competition._source.sport_competition_sportif}
              onValueChange={this.changeSportCompetition}
              renderNoResultsFound={function () {
                return <div className="no-results-found">
                  {!!self.req ? "Chargement des sports ..." : "Aucun résultat"}
                </div>
              }}
            >
            </SimpleSelect>
          </div>
          <div className="form-group">
            <label>Votre niveau lors de la compétition</label>
            <SimpleSelect
              placeholder="Séléctionnez votre niveau lors de la compétition"
              theme="material"
              className="form-control"
              value={this.state.competition._source.niveau_competition_sportif}
              options={this.props.niveaux_competition}
              onValueChange={this.changeNiveauCompetition}
              renderNoResultsFound={function () {
                return <div className="no-results-found">
                  {!!self.req ? "Chargement des niveau de compétition ..." : "Aucun résultat"}
                </div>
              }}
            >
            </SimpleSelect>
          </div>
          <div className="form-group">
            <DatePicker
              hintText="Date du début de la compétition"
              DateTimeFormat={DateTimeFormat}
              okLabel="OK"
              cancelLabel="Annuler"
              locale="fr"
              value={this.state.competition._source.date_debut_competition_sportif}
              onChange={this.changeDateDebutCompetition}
              shouldDisableDate={disableDatesAfterToday}
            />
          </div>
          {/*<div className="form-group">
           <DatePicker
           hintText="Date de la fin de la compétition"
           DateTimeFormat={DateTimeFormat}
           okLabel="OK"
           cancelLabel="Annuler"
           locale="fr"
           value={this.state.competition._source.date_fin_competition_sportif}
           onChange={this.changeDateFinCompetition}
           shouldDisableDate={disableDatesAfterToday}
           />
           </div>*/}
          <div className="form-group">
            <label>Votre rang à l'issue de la compétition</label>
            <InputElement mask="99999999"
                          defaultValue={this.state.competition._source.rang_competiton_sportif}
                          className="form-control"
                          maskChar=" "
                          onChange={this.changeRangCompetition}
            />
          </div>
        </form>
      </Dialog>
    )
  }
};

ModalAddCompetitionSportif.propTypes = {
  competition: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  search_sports: PropTypes.array.isRequired,
  getSport: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  niveaux_competition: PropTypes.array.isRequired,
};

export default ModalAddCompetitionSportif;

