/**
 * Created by pierremarsot on 17/02/2017.
 */
import React from 'react';
import AffichageEventCalendarSportif from './AffichageEventCalendarSportif';
import ModalAddEventCalendarSportif from './ModalAddEventCalendarSportif';

const ManagerCalendarSportif = () =>
  (
    <div id="calendar-sportif" className="row">
      <ModalAddEventCalendarSportif/>
      <AffichageEventCalendarSportif/>
    </div>
  );

export default ManagerCalendarSportif;