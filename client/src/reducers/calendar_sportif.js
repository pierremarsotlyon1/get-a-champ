/**
 * Created by pierremarsot on 17/02/2017.
 */
import {
  LOAD_CALENDAR_SPORTIF_ERROR,
  LOAD_CALENDAR_SPORTIF_SUCCESS,
  ADD_EVENT_CALENDAR_SPORTIF_ERROR,
  ADD_EVENT_CALENDAR_SPORTIF_SUCCESS,
  REMOVE_EVENT_CALENDAR_SPORTIF_ERROR,
  REMOVE_EVENT_CALENDAR_SPORTIF_SUCCESS,
  UPDATE_EVENT_CALENDAR_SPORTIF_ERROR,
  UPDATE_EVENT_CALENDAR_SPORTIF_SUCCESS,
} from '../actions/calendar_sportif';
const initialState = {
  events: [],
};

export default function calendarSportif(state = initialState, action = {})
{
  switch(action.type)
  {
    case LOAD_CALENDAR_SPORTIF_SUCCESS:
      const {events} = action;
      if(!events)
      {
        return state;
      }

      return {
        ...state,
        events: events,
      };

    case LOAD_CALENDAR_SPORTIF_ERROR:
      return state;

    case ADD_EVENT_CALENDAR_SPORTIF_ERROR:
      return state;

    case ADD_EVENT_CALENDAR_SPORTIF_SUCCESS:
      const {event} = action;
      if(!event)
      {
        return state;
      }

      return {
        ...state,
        events: state.events.concat(event),
      };

    case REMOVE_EVENT_CALENDAR_SPORTIF_ERROR:
      return state;

    case REMOVE_EVENT_CALENDAR_SPORTIF_SUCCESS:
      const id_event_removed = action.id_event_removed;
      if(!id_event_removed)
      {
        return state;
      }

      return {
        ...state,
        events: state.events.filter((event) => {
          return event._id !== id_event_removed;
        }),
      };

    case UPDATE_EVENT_CALENDAR_SPORTIF_ERROR:
      return state;

    case UPDATE_EVENT_CALENDAR_SPORTIF_SUCCESS:
      const event_updated = action.event;
      if(!event_updated)
      {
        return state;
      }

      return {
        ...state,
        events: state.events.map((event) => {
          return event._id === event_updated._id ? Object.assign({}, event, event_updated) : event;
        }),
      };
    default:
      return state;
  }
}