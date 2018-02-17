/**
 * Created by pierremarsot on 27/02/2017.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

class DiplomeSportif extends Component{
  handleRemove = (id_diplome_sportif) => {
    this.props.dispatch();
  };

  render()
  {
    return (
      <div className="diplome-sportif">

      </div>
    )
  }
}

DiplomeSportif.propTypes = {
  dispatch: PropTypes.func.isRequired,
  diplome_sportif: PropTypes.object.isRequired,
  deleted: PropTypes.bool.isRequired,
  updated: PropTypes.bool.isRequired,
};

export default conect()(DiplomeSportif);