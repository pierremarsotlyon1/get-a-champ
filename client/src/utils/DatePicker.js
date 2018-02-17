/**
 * Created by pierremarsot on 13/02/2017.
 */
const moment = require('moment');
import areIntlLocalesSupported from 'intl-locales-supported';

export function disableDatesAfterToday(startDate){
  const startSeconds = new Date(startDate);
  return new Date() <= startSeconds;
}

export function frenchDate(date)
{
  date = moment(date);
  return date.format('DD-MM-YYYY');
}

export function defineDateTimeFormat()
{
  let DateTimeFormat;

  /**
   * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
   */
  if (areIntlLocalesSupported(['fr', 'fa-IR'])) {
    DateTimeFormat = global.Intl.DateTimeFormat;
  } else {
    const IntlPolyfill = require('intl');
    DateTimeFormat = IntlPolyfill.DateTimeFormat;
    require('intl/locale-data/jsonp/fr');
    require('intl/locale-data/jsonp/fa-IR');
  }

  return DateTimeFormat;
}