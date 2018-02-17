/**
 * Created by pierremarsot on 17/01/2017.
 */
const moment = require('moment');

class DateManager {
  static frenchDateToMoment(date)
  {
    return moment(date, 'DD-MM-YYYY');
  }

  stringToMoment(date) {
    const moment_date = moment(date);
    if (!moment_date.isValid()) {
      return undefined;
    }

    return moment_date;
  }

  momentToStringDateTime(moment)
  {
    return moment.format("YYYY-MM-DD HH:mm:ss");
  }

  static getStringDateTime()
  {
    return moment().format("YYYY-MM-DD HH:mm:ss");
  }

  toDate(moment_date) {
    if (!moment_date.isValid()) {
      return undefined;
    }

    //moment_date = moment_date.add(1, 'd');
    /*const month = moment_date.format('M'),
      day = moment_date.format('D'),
      year = moment_date.format('YYYY');
    return year + "-" + month + "-" + day;*/
    return moment_date.format('YYYY-MM-DD');
  }

  toISOString(moment_date) {
    if (!moment_date.isValid()) {
      return undefined;
    }

    //moment_date = moment_date.add(1, 'd');
    return moment_date.toISOString();
  }

  displayMoment(moment_date) {
    if (!moment_date.isValid()) {
      return undefined;
    }

    return moment_date.toISOString();
  }

  isAfterNow(moment_date)
  {
    const moment_now = moment();
    if(!moment_date || !moment_now.isValid() || !moment_date.isValid())
    {
      return false;
    }

    return moment_date.isAfter(moment_now);
  }

  isBeforeNow(moment_date)
  {
    const moment_now = moment();
    if(!moment_date || !moment_now.isValid() || !moment_date.isValid())
    {
      return false;
    }

    return moment_date.isBefore(moment_now);
  }

  isSameOrAfter(moment_date, moment_date_compare)
  {
    if(!moment_date || !moment_date_compare || !moment_date_compare.isValid() || !moment_date.isValid())
    {
      return false;
    }

    return moment_date.isSameOrAfter(moment_date_compare);
  }

  isSameOrBefore(moment_date, moment_date_compare)
  {
    if(!moment_date || !moment_date_compare || !moment_date_compare.isValid() || !moment_date.isValid())
    {
      return false;
    }

    return moment_date.isSameOrBefore(moment_date_compare);
  }

  isAfter(moment_date, moment_date_compare)
  {
    if(!moment_date || !moment_date_compare || !moment_date_compare.isValid() || !moment_date.isValid())
    {
      return false;
    }

    return moment_date.isAfter(moment_date_compare);
  }

  isBefore(moment_date, moment_date_compare)
  {
    if(!moment_date || !moment_date_compare || !moment_date_compare.isValid() || !moment_date.isValid())
    {
      return false;
    }

    return moment_date.isBefore(moment_date_compare);
  }

  static getFirstDayOfWeek(moment)
  {
    return moment.startOf('week').add(1, 'days');
  }

}

export default DateManager;