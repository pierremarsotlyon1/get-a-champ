/**
 * Created by pierremarsot on 27/02/2017.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

class AffichageDiplomeSportif extends Component{
  constructor(props)
  {
    super(props);
  }

  componentDidMount()
  {

  }

  render(){
    return (
      <section id="affichage-diplomes-sportif">

      </section>
    )
  }
}

AffichageDiplomeSportif.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state)
{
  return {

  };
}

export default connect(mapStateToProps)(AffichageDiplomeSportif);