/**
 * Created by pierremarsot on 10/02/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import Link from 'react-router/lib/Link';
import Table from 'material-ui/Table/Table';
import TableBody from 'material-ui/Table/TableBody';
import TableHeader from 'material-ui/Table/TableHeader';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import TableRow from 'material-ui/Table/TableRow';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import SponsoringSportif from './SponsoringSportif';

import {
  load_sponsoring_sportif,
} from '../../actions/sponsoring_sportif';

class AffichageSponsoringSportif extends React.Component {
  componentDidMount() {
    const {
      sponsorings_sportif
    } = this.props;

    if (!sponsorings_sportif || sponsorings_sportif.length === 0) {
      this.props.dispatch(load_sponsoring_sportif());
    }
  }

  render() {
    const {
      sponsorings_sportif
    } = this.props;

    return (
      <div id="affichage-sponsoring-sportif">
        <div className="boxed boxed--md boxed--border">
          <div className="row margin-bottom-30">
            <div className="col-sm-7">
              <h4>Mes sponsorings</h4>
            </div>
            <div className="col-sm-5">
              <Link to="/profil/sportif/sponsoring/add"
                    className="btn btn--primary type--uppercase pull-right">
              <span className="btn__text">
                            Ajouter une demande de sponsoring
                          </span>
              </Link>
            </div>
          </div>
          <div className="row">
            {
              sponsorings_sportif.length !== 0
                ?
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderColumn>Type de sponsoring</TableHeaderColumn>
                      <TableHeaderColumn>Date de début de contrat</TableHeaderColumn>
                      <TableHeaderColumn>Date de fin de contrat</TableHeaderColumn>
                      <TableHeaderColumn>Lieu</TableHeaderColumn>
                      <TableHeaderColumn>Montant recherché (euros)</TableHeaderColumn>
                      <TableHeaderColumn></TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {
                      sponsorings_sportif.map((sponsoring_sportif) => {
                        return <SponsoringSportif
                          sponsoring_sportif={sponsoring_sportif}
                          onDelete={true}
                          onUpdated={true}
                          key={sponsoring_sportif._id}
                        />;
                      })
                    }
                  </TableBody>
                </Table>
                :
                <div className="alert alert-info">
                  Vous n'avez pas de sponsoring
                </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {sponsoringSportif} = state;
  return {
    sponsorings_sportif: sponsoringSportif.sponsorings_sportif
  };
}

export default connect(mapStateToProps)(AffichageSponsoringSportif);