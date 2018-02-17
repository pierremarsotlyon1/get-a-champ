/**
 * Created by pierremarsot on 17/02/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import {defineDateTimeFormat} from '../../utils/DatePicker';
import moment from 'moment';

import {
  add_event_calendar_sportif,
} from '../../actions/calendar_sportif';

const DateTimeFormat = defineDateTimeFormat();

class ModalAddEventCalendarSportif extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      event: this.defaultEvent(),
      disableHeureDebut: true,
      disableHeureFin: true,
      time_debut: undefined,
      time_fin: undefined,
    };
  }

  defaultEvent = () => {
    return {
      title: '',
      description: '',
      date_debut: undefined,
      date_fin: undefined,
    };
  };

  handleOpenModal = () => {
    this.setState({
      open: true,
      event: this.defaultEvent(),
      disableHeureDebut: true,
      disableHeureFin: true,
      time_debut: undefined,
      time_fin: undefined,
    });
  };

  handleCloseModal = () => {
    this.setState({
      open: false,
      event: this.defaultEvent(),
    });
  };

  handleChangeTitle = (e) => {
    const {event} = this.state;
    if (!event) {
      return false;
    }

    event.title = e.target.value;

    this.setState({
      event: event,
    });
  };

  handleChangeDescription = (e) => {
    const {event} = this.state;
    if (!event) {
      return false;
    }

    event.description = e.target.value;

    this.setState({
      event: event,
    });
  };

  handleChangeDateDebut = (e, date) => {
    const {event} = this.state;
    if (!event) {
      return false;
    }

    event.date_debut = date;

    this.setState({
      event: event,
      disableHeureDebut: false,
    });
  };

  handleChangeDateFin = (e, date) => {
    const {event} = this.state;
    if (!event) {
      return false;
    }

    event.date_fin = date;

    this.setState({
      event: event,
      disableHeureFin: false,
    });
  };

  handleChangeTimeDebut = (event, time) => {
    this.setState({
      time_debut: time,
    });
  };

  handleChangeTimeFin = (event, time) => {
    this.setState({
      time_fin: time,
    });
  };

  handleSubmitModal = () => {
    const {event} = this.state;
    if (!event) {
      return false;
    }

    //On récup les times
    let {
      time_debut,
      time_fin
    } = this.state;

    if(!time_debut || !time_fin)
    {
      return false;
    }

    //On convertit les times en moment
    time_debut = moment(time_debut);
    time_fin = moment(time_fin);

    if(!time_debut || !time_fin)
    {
      return false;
    }

    //On convertit les dates en moment
    event.date_debut = moment(event.date_debut);
    event.date_fin = moment(event.date_fin);

    if(!event.date_debut || !event.date_fin)
    {
      return false;
    }

    event.date_debut = event.date_debut.set({
      'hour' : time_debut.get('hour'),
      'minute'  : time_debut.get('minute'),
      'second' : time_debut.get('second')
    });

    event.date_fin = event.date_fin.set({
      'hour' : time_fin.get('hour'),
      'minute'  : time_fin.get('minute'),
      'second' : time_fin.get('second')
    });

    this.props.dispatch(add_event_calendar_sportif(
      event.title,
      event.description,
      event.date_debut.toDate(),
      event.date_fin.toDate(),
    ));
  };

  render() {
    const actions = [
      <FlatButton
        label="Fermer"
        primary={true}
        onTouchTap={this.handleCloseModal}
      />,
      <FlatButton
        label="Enregistrer"
        primary={true}
        onTouchTap={this.handleSubmitModal}
      />,
    ];

    return (
      <div>
        <div className="col-md-12">
          <div className="pull-right">
            <RaisedButton label="Ajouter un évenement" primary={true}
                          onTouchTap={this.handleOpenModal}/>
            <Dialog
              title="Ajouter un évenement"
              actions={actions}
              modal={false}
              open={this.state.open}
              autoScrollBodyContent={true}
              onRequestClose={this.handleCloseModal}
            >
              <div className="form-group">
                <TextField
                  floatingLabelText="Titre de l'évenement"
                  value={this.state.event.title}
                  onChange={this.handleChangeTitle}
                />
              </div>
              <div className="form-group">
                <DatePicker
                  hintText="Date du début de l'évenement"
                  DateTimeFormat={DateTimeFormat}
                  okLabel="OK"
                  cancelLabel="Annuler"
                  locale="fr"
                  value={this.state.event.date_debut}
                  onChange={this.handleChangeDateDebut}
                />
              </div>
              <div className="form-group">
                <TimePicker
                  format="24hr"
                  hintText="Heure de début de l'évenement"
                  disabled={this.state.disableHeureDebut}
                  onChange={this.handleChangeTimeDebut}
                  value={this.state.time_debut}
                />
              </div>

              <div className="form-group">
                <DatePicker
                  hintText="Date de fin de l'évenement"
                  DateTimeFormat={DateTimeFormat}
                  okLabel="OK"
                  cancelLabel="Annuler"
                  locale="fr"
                  value={this.state.event.date_fin}
                  onChange={this.handleChangeDateFin}
                />
              </div>
              <div className="form-group">
                <TimePicker
                  format="24hr"
                  hintText="Heure de fin de l'évenement"
                  disabled={this.state.disableHeureFin}
                  onChange={this.handleChangeTimeFin}
                  value={this.state.time_fin}
                />
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(ModalAddEventCalendarSportif);