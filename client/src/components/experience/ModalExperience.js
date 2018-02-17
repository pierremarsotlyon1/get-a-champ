/**
 * Created by pierremarsot on 19/01/2017.
 */
import React, {Component, PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import Geosuggest from 'react-geosuggest';
import '../../assets/geosuggest/geosuggest.css';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import {
  disableDatesAfterToday
} from '../../utils/DatePicker';
import moment from 'moment';
import {defineDateTimeFormat} from '../../utils/DatePicker';

const DateTimeFormat = defineDateTimeFormat();

class ModalExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
    };
  }

  componentWillMount() {
    const experience = this.props.experience;
    this.formatterExperience(experience);
  }

  componentWillReceiveProps(props) {
    if (props) {
      if(this.state.open !== props.open)
      {
        this.formatterExperience(props.experience);
        this.setState({
          open: props.open
        });
      }
    }
  }

  formatterExperience = (experience) => {
    let new_experience = {};

    if (!experience) {
      new_experience = this.defaultExperience();
    }
    else {
      //On clone
      new_experience = JSON.parse(JSON.stringify(experience));//Object.assign(new_experience, experience);

      if (new_experience._source && new_experience._source.sport_experience_sportif) {
        new_experience._source.sport_experience_sportif = {
          ...new_experience._source.sport_experience_sportif,
          value: new_experience._source.sport_experience_sportif._id,
          text: new_experience._source.sport_experience_sportif.nom_sport,
        };
        delete new_experience._source.sport_experience_sportif._id;
        delete new_experience._source.sport_experience_sportif.nom_sport;
      }

      if (new_experience._source && new_experience._source.lieu_experience_sportif) {
        new_experience._source.lieu_experience_sportif = {
          ...new_experience._source.lieu_experience_sportif,
          label: new_experience._source.lieu_experience_sportif.nom,
          placeId: new_experience._source.lieu_experience_sportif._id,
          location: {
            lng: new_experience._source.lieu_experience_sportif.location.lon,
            lat: new_experience._source.lieu_experience_sportif.location.lat,
          }
        };
        delete new_experience._source.lieu_experience_sportif._id;
        delete new_experience._source.lieu_experience_sportif.nom;
      }

      if(new_experience._source && new_experience._source.date_debut_experience_sportif)
      {
        new_experience._source.date_debut_experience_sportif =
          new Date(new_experience._source.date_debut_experience_sportif);
      }

      if(new_experience._source && new_experience._source.date_fin_experience_sportif)
      {
        new_experience._source.date_fin_experience_sportif =
          new Date(new_experience._source.date_fin_experience_sportif);
      }
    }

    this.setState({
      experience: new_experience,
    });
  };

  defaultExperience = () => {
    return {
      _id: '',
      _source: {
        lieu_experience_sportif: {
          placeId: '',
          label: '',
          location: {
            lat: null,
            lng: null
          }
        },
        sport_experience_sportif: {
          value: '',
          text: '',
        },
        date_debut_experience_sportif: undefined,
        date_fin_experience_sportif: undefined,
        description_experience_sportif: '',
        nom_club_experience_sportif: '',
      },
    }
  };

  handleDismiss = () => {
    this.setState({
      experience: this.defaultExperience(),
      open: false,
    }, () => {
      this.props.onDismiss();
    });
  };

  handleSubmit = () => {
    let date_debut, date_fin;
    if(this.state.experience._source.date_debut_experience_sportif
    && typeof this.state.experience._source.date_debut_experience_sportif === 'object')
    {
      date_debut = moment(this.state.experience._source.date_debut_experience_sportif).format('YYYY-MM-DD');
    }

    if(this.state.experience._source.date_fin_experience_sportif &&
      typeof this.state.experience._source.date_fin_experience_sportif === 'object')
    {
      date_fin = moment(this.state.experience._source.date_fin_experience_sportif).format('YYYY-MM-DD');
    }

    const experience = {
      _id: this.state.experience._id,
      _source: {
        lieu_experience_sportif: {
          _id: this.state.experience._source.lieu_experience_sportif.placeId,
          nom: this.state.experience._source.lieu_experience_sportif.label,
          location: {
            lat: this.state.experience._source.lieu_experience_sportif.location.lat,
            lon: this.state.experience._source.lieu_experience_sportif.location.lng,
          }
        },
        sport_experience_sportif: {
          _id: this.state.experience._source.sport_experience_sportif.value,
          nom_sport: this.state.experience._source.sport_experience_sportif.text,
        },
        date_debut_experience_sportif: date_debut,
        date_fin_experience_sportif: date_fin,
        description_experience_sportif: this.state.experience._source.description_experience_sportif,
        nom_club_experience_sportif: this.state.experience._source.nom_club_experience_sportif,
      },
    };

    this.props.onSubmit(experience);
    this.setState({
      experience: this.defaultExperience(),
    });
  };

  changeGeosuggestExperience = (geosuggest_experience) => {
    const experience = this.state.experience;
    if (!geosuggest_experience) {
      experience._source.lieu_experience_sportif = {
        placeId: '',
        label: '',
        location: {
          lat: null,
          lng: null
        }
      };
    }
    else {
      experience._source.lieu_experience_sportif = geosuggest_experience;
    }

    this.setState({
      experience: experience,
    });
  };

  changeSportExperience = (sport_experience) => {
    const experience = this.state.experience;
    if (sport_experience) {
      experience._source.sport_experience_sportif = sport_experience;
    }
    else
    {
      experience._source.sport_experience_sportif = {
        value: '',
        label: '',
      };
    }

    this.setState({
      experience: experience,
    });
  };

  changeDateDebutExperience = (event, date) => {
    const experience = this.state.experience;
    if (date) {
      experience._source.date_debut_experience_sportif = date;
    }
    else{
      experience._source.date_debut_experience_sportif = undefined;
    }

    this.setState({
      experience: experience,
    });
  };

  changeDateFinExperience = (event, date) => {
    const experience = this.state.experience;
    if (date) {
      experience._source.date_fin_experience_sportif = date;
    }
    else {
      experience._source.date_fin_experience_sportif = undefined;
    }

    this.setState({
      experience: experience,
    });
  };

  changeDescriptionExperience = (event) => {
    const description_experience = event.target.value;
    const experience = this.state.experience;

    if (description_experience) {
      experience._source.description_experience_sportif = description_experience;
    }
    else {
      experience._source.description_experience_sportif = '';
    }

    this.setState({
      experience: experience,
    });
  };

  handleChangeNomClub = (event, nom_club) => {
    const experience = this.state.experience;
    if (nom_club) {
      experience._source.nom_club_experience_sportif = nom_club;
    }
    else {
      experience._source.nom_club_experience_sportif = undefined;
    }

    this.setState({
      experience: experience,
    });
  };

  render() {
    const {
      search_sports
    } = this.props;

    const actionsModalExperience = [
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

    return (
      <Dialog
        title={this.props.title}
        actions={actionsModalExperience}
        modal={false}
        open={this.props.open}
        onRequestClose={this.handleDismiss}
      >
        <form role="form">
          <div className="form-group">
            <label>Lieu de votre experience :</label>
            <Geosuggest
              placeholder="Lieu de votre experience"
              initialValue={this.state.experience._source.lieu_experience_sportif.label}
              onSuggestSelect={this.changeGeosuggestExperience}
              onSuggestNoResults={this.changeGeosuggestExperience}
            />
          </div>
          <div className="form-group">
            <AutoComplete
              floatingLabelText="Le sport pratiqué"
              filter={AutoComplete.noFilter}
              dataSource={search_sports_local}
              onUpdateInput={this.props.getSport}
              onNewRequest={this.changeSportExperience}
              value={this.state.experience._source.sport_experience_sportif}
              searchText={this.state.experience._source.sport_experience_sportif.text}
              fullWidth={true}
            />
          </div>
          <div className="form-group">
            <TextField
              floatingLabelText="Nom du club"
              onChange={this.handleChangeNomClub}
              defaultValue={this.state.experience._source.nom_club_experience_sportif}
            />
          </div>

          <div className="form-group">
            <DatePicker
              hintText="Date du début de l'experience"
              DateTimeFormat={DateTimeFormat}
              okLabel="OK"
              cancelLabel="Annuler"
              locale="fr"
              value={this.state.experience._source.date_debut_experience_sportif}
              onChange={this.changeDateDebutExperience}
              shouldDisableDate={disableDatesAfterToday}
            />
          </div>
          <div className="form-group">
            <DatePicker
              hintText="Date de la fin de l'experience"
              DateTimeFormat={DateTimeFormat}
              okLabel="OK"
              cancelLabel="Annuler"
              locale="fr"
              value={this.state.experience._source.date_fin_experience_sportif}
              onChange={this.changeDateFinExperience}
              shouldDisableDate={disableDatesAfterToday}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              rows="5"
              value={this.state.experience._source.description_experience_sportif}
              onChange={this.changeDescriptionExperience}></textarea>
          </div>
        </form>
      </Dialog>
    )
  }
}

ModalExperience.propTypes = {
  experience: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  search_sports: PropTypes.array.isRequired,
  getSport: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default ModalExperience;