/**
 * Created by pierremarsot on 17/02/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import BigCalendar from 'react-big-calendar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {
  load_calendar_sportif,
  remove_event_calendar_sportif,
} from '../../actions/calendar_sportif';

moment.locale('fr');
BigCalendar.momentLocalizer(moment);

class AffichageEventCalendarSportif extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      id_event_open: undefined,
    };
  }

  componentDidMount() {
    const {
      events
    } = this.props;

    if (!events || events.length === 0) {
      const moment_begin = moment().startOf('week');
      const moment_end = moment_begin.clone().add(1, 'weeks');
      this.props.dispatch(load_calendar_sportif(moment_begin, moment_end));
    }
  }

  handleChangeDateCalendar = (date, type) => {
    let moment_begin = moment(date);
    let moment_end;
    switch (type) {
      case "week":
        moment_begin.startOf('week');
        moment_end = moment_begin.clone();
        moment_end.add(1, 'weeks');
        this.props.dispatch(load_calendar_sportif(moment_begin, moment_end));
        break;
      case "month":
        moment_begin.startOf('month');
        moment_end = moment_begin.clone();
        moment_end.add(1, 'months');
        this.props.dispatch(load_calendar_sportif(moment_begin, moment_end));
        //this.props.dispatch(load_calendar_sportif(moment(date), moment().add(1, 'months')));
        break;
      case "days":
        moment_begin.startOf('day');
        moment_end = moment_begin.clone();
        moment_end.add(1, 'days');
        this.props.dispatch(load_calendar_sportif(moment_begin, moment_end));
        //this.props.dispatch(load_calendar_sportif(moment(date), moment().add(1, 'days')));
        break;
      default:
        break;
    }
  };

  handleSelectEvent = (event) => {
    this.handleOpenModal(event);
  };

  handleCloseModal = () => {
    this.setState({
      openModal: false,
      id_event_open: undefined,
    });
  };

  handleOpenModal = (event) => {
    if (!event || !event._id) {
      return false;
    }

    this.setState({
      openModal: true,
      id_event_open: event._id,
    });
  };

  handleSubmitModal = () => {
    const {id_event_open} = this.state;

    if (id_event_open === undefined) {
      return false;
    }

    this.props.dispatch(remove_event_calendar_sportif(id_event_open));
    this.handleCloseModal();
  };

  render() {
    const myEventsList = [];

    //On wrappe les events
    const {
      events
    } = this.props;

    for (const event of events) {
      const date_debut = moment(event._source.date_debut, "YYYY-MM-DD HH:mm:ss");
      const date_fin = moment(event._source.date_fin, "YYYY-MM-DD HH:mm:ss");

      if (!date_debut || !date_fin) {
        continue;
      }

      myEventsList.push({
        _id: event._id,
        title: event._source.titre,
        start: date_debut.toDate(),
        end: date_fin.toDate(),
      });
    }

    const actions = [
      <FlatButton
        label="Fermer"
        primary={true}
        onTouchTap={this.handleCloseModal}
      />,
      <FlatButton
        label="Supprimer l'évenement"
        secondary={true}
        onTouchTap={this.handleSubmitModal}
      />,
    ];

    return (
      <section id="affichage-calendar-event-sportif">
        <div className="col-md-12">
          <h4>Indiquez vos disponibilités</h4>
        </div>
        <div className="col-md-12">
          <BigCalendar
            selectable
            events={myEventsList}
            onNavigate={this.handleChangeDateCalendar}
            onSelectEvent={this.handleSelectEvent}
            view="week"
          />

          <Dialog
            title="Supprimer l'évenement"
            actions={actions}
            modal={false}
            open={this.state.openModal}
            autoScrollBodyContent={true}
            onRequestClose={this.handleCloseModal}
          >
            Etes-vous sur que vouloir supprimer cet évenement ?
          </Dialog>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  const {calendarSportif} = state;

  if (calendarSportif) {
    return {
      events: calendarSportif.events,
    };
  }

  return {
    events: [],
  };
}

export default connect(mapStateToProps)(AffichageEventCalendarSportif);