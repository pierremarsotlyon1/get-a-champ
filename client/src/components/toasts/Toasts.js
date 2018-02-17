/**
 * Created by pierremarsot on 04/02/2017.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Notifications, {notify} from 'react-notify-toast';

import {
  init_all_message,
} from '../../actions/toasts';

class Toasts extends Component{
  constructor(props)
  {
    super(props);
    this.state = {
      timeout: 3000
    };
  }
  componentWillReceiveProps(nextProps)
  {
    if(nextProps)
    {
      if(nextProps.success)
      {
        notify.show(nextProps.success, "success", this.state.timeout);
      }
      else if(nextProps.error)
      {
        notify.show(nextProps.error, "error", this.state.timeout);
      }
      else if(nextProps.warning)
      {
        notify.show(nextProps.warning, "warning", this.state.timeout);
      }
      else if(nextProps.info)
      {
        notify.show(nextProps.info, "info", this.state.timeout);
      }

      this.props.dispatch(init_all_message());
    }
  }

  render(){
    return (
      <Notifications />
    )
  }
}

Toasts.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state){
  const { toasts } = state;
  return {
    success: toasts.success,
    error: toasts.error,
    warning: toasts.warning,
    info: toasts.info,
  }
}

export default connect(mapStateToProps)(Toasts);