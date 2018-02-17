/**
 * Created by pierremarsot on 21/02/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import LangueSportif from './LangueSportif';
import Table from 'material-ui/Table/Table';
import TableBody from 'material-ui/Table/TableBody';
import TableHeader from 'material-ui/Table/TableHeader';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import TableRow from 'material-ui/Table/TableRow';
import Link from 'react-router/lib/Link';
import RaisedButton from 'material-ui/RaisedButton';

import {
  load_langue_sportif,
} from '../../actions/langue_sportif';

class AffichageLangueSportif extends React.Component {
  componentDidMount() {
    const {
      langues_sportif
    } = this.props;

    if (!langues_sportif || langues_sportif.length === 0) {
      this.props.dispatch(load_langue_sportif());
    }
  }

  render() {
    const {
      langues_sportif
    } = this.props;

    return (
      <div id="affichage-langue-sportif">
        <div className="boxed boxed--md boxed--border">
          <div className="row">
            <div className="col-sm-7">
              <h4>Mes langues</h4>
            </div>
            <div className="col-sm-5">
              <Link to="/profil/sportif/langues/add"
                    className="btn btn--primary type--uppercase pull-right">
              <span className="btn__text">
                            Ajouter une langue
                          </span>
              </Link>
            </div>
          </div>
          <div className="row">
            {
              !langues_sportif || langues_sportif.length === 0
                ?
                <div className="alert alert-info">
                  Vous n'avez pas enregistré de langue
                </div>
                :
                langues_sportif.map((langue_sportif) => {
                  return <LangueSportif
                    key={langue_sportif.langue._id}
                    langue_sportif={langue_sportif}
                    deleted={true}
                  />
                })
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {langueSportif} = state;
  return {
    langues_sportif: langueSportif.langues_sportif,
  };
}

export default connect(mapStateToProps)(AffichageLangueSportif);