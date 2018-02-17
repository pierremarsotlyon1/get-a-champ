/**
 * Created by pierremarsot on 04/02/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import Table from 'material-ui/Table/Table';
import TableBody from 'material-ui/Table/TableBody';
import TableHeader from 'material-ui/Table/TableHeader';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import TableRow from 'material-ui/Table/TableRow';
import ContratMissionEntrepriseSportif from './ContratMissionEntrepriseSportif';

import {
  load_contrats_mission_entreprise_sportif,
  remove_contrats_mission_entreprise_sportif,
} from '../../actions/contrats_mission_entreprise_sportif';

class AffichageContratsMissionEntrepriseSportif extends React.Component {
  componentDidMount() {
    const {
      contracts_mission_entreprise_sportif
    } = this.props;

    if (!contracts_mission_entreprise_sportif || contracts_mission_entreprise_sportif.length === 0) {
      this.props.dispatch(load_contrats_mission_entreprise_sportif());
    }
  }

  removeContratMissionEntrepriseSportif = (id_domaine_connaissance_sportif) => {
    this.props.dispatch(remove_contrats_mission_entreprise_sportif(id_domaine_connaissance_sportif));
  };

  render() {
    const {
      contracts_mission_entreprise_sportif
    } = this.props;

    return (
      <div id="affichage-contrats-mission-entreprise-sportif">
        <div className="col-md-12">
          <div className="boxed boxed--md boxed--border">
          {
            !contracts_mission_entreprise_sportif || contracts_mission_entreprise_sportif.length === 0
              ?
              <div className="alert alert-info">
                Vous n'avez pas ajouté de contrat de mission d'entreprise
              </div>
              :
              <div className="contrats-mission-entreprise-sportif-table">
                <h4>Mes contrats de mission</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderColumn>Nom de la compétence</TableHeaderColumn>
                      <TableHeaderColumn>Niveau</TableHeaderColumn>
                      <TableHeaderColumn></TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {
                      contracts_mission_entreprise_sportif.map((contrat_mission_entreprise_sportif) => {
                        return (<ContratMissionEntrepriseSportif
                          contratMissionEntrepriseSportif={contrat_mission_entreprise_sportif}
                          onDelete={this.removeContratMissionEntrepriseSportif}
                          key={contrat_mission_entreprise_sportif.id_domaine_connaissance_sportif}
                        />)
                      })
                    }
                  </TableBody>
                </Table>
              </div>
          }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {contratsMissionEntrepriseSportif} = state;
  return {
    contracts_mission_entreprise_sportif: contratsMissionEntrepriseSportif.contrats_mission_entreprise_sportif,
  };
}

export default connect(mapStateToProps)(AffichageContratsMissionEntrepriseSportif);