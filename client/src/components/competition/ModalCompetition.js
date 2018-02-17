/**
 * Created by pierremarsot on 20/01/2017.
 */
/**
 * Created by pierremarsot on 19/01/2017.
 */
import React, {Component, PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
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

class ModalCompetition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
    };
  }

  componentWillMount() {
    const competition = this.props.competition;
    this.formatterCompetition(competition);
  }

  componentWillReceiveProps(props) {
    if (props) {
      if (this.state.open !== props.open) {
        this.formatterCompetition(props.competition);
        this.setState({
          open: props.open
        });
      }
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
          text: new_competition._source.sport_competition_sportif.nom_sport,
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
        new_competition._source.niveau_competition_sportif = new_competition._source.niveau_competition_sportif._id;
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
          text: '',
        },
        niveau_competition_sportif: undefined,
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
          nom_sport: this.state.competition._source.sport_competition_sportif.text,
        },
        niveau_competition_sportif: this.state.competition._source.niveau_competition_sportif,
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

  changeNiveauCompetition = (event, key, value) => {
    const competition = this.state.competition;

    if (value) {
      competition._source.niveau_competition_sportif = value;
    }
    else {
      competition._source.niveau_competition_sportif = undefined;
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

  render() {

    const {
      search_sports,
      niveaux_competition
    } = this.props;

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

    let niveaux_competition_local = [];
    for (const niveau_competition of niveaux_competition) {
      if (!niveau_competition || !niveau_competition._id || !niveau_competition._source || !niveau_competition._source.nom_niveau_competition) {
        continue;
      }

      niveaux_competition_local.push(
        <MenuItem key={niveau_competition._id} value={niveau_competition._id} primaryText={niveau_competition._source.nom_niveau_competition} />
      );
    }

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
            <AutoComplete
              floatingLabelText="Le sport pratiqué"
              filter={AutoComplete.noFilter}
              dataSource={search_sports_local}
              onUpdateInput={this.props.getSport}
              onNewRequest={this.changeSportCompetition}
              value={this.state.competition._source.sport_competition_sportif}
              searchText={this.state.competition._source.sport_competition_sportif.text}
              fullWidth={true}
            />
          </div>
          <div className="form-group">
            <SelectField
              floatingLabelText="Votre niveau lors de la compétition"
              value={this.state.competition._source.niveau_competition_sportif}
              onChange={this.changeNiveauCompetition}
            >
              {niveaux_competition_local}
            </SelectField>
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
}

ModalCompetition.propTypes = {
  competition: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  search_sports: PropTypes.array.isRequired,
  getSport: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  niveaux_competition: PropTypes.array.isRequired,
};

export default ModalCompetition;