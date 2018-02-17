/**
 * Created by pierremarsot on 10/02/2017.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import TableRow from 'material-ui/Table/TableRow';
import TableRowColumn from 'material-ui/Table/TableRowColumn';
import RaisedButton from 'material-ui/RaisedButton';

import {
  delete_sponsoring_sportif
} from '../../actions/sponsoring_sportif';

import {
  frenchDate
} from '../../utils/DatePicker';

class SponsoringSportif extends React.Component {

  handleRemoveSponsoringSportif = (id_sponsoring_sportif) => {
    this.props.dispatch(delete_sponsoring_sportif(id_sponsoring_sportif));
  };

  render() {
    const {
      sponsoring_sportif,
      onDelete,
    } = this.props;

    return (
      <TableRow>
        <TableRowColumn>
          {sponsoring_sportif._source.type_sponsoring_sportif.nom_type_sponsoring}
        </TableRowColumn>
        <TableRowColumn>
          {frenchDate(sponsoring_sportif._source.date_depart_sponsoring_sportif)}
        </TableRowColumn>
        <TableRowColumn>
          {frenchDate(sponsoring_sportif._source.date_fin_sponsoring_sportif)}
        </TableRowColumn>
        <TableRowColumn>
          {sponsoring_sportif._source.lieu_sponsoring_sportif.nom}
        </TableRowColumn>
        <TableRowColumn>
          {
            sponsoring_sportif._source.montant_recherche
              ?
              sponsoring_sportif._source.montant_recherche
              :
              'Non défini'
          }
        </TableRowColumn>
        <TableRowColumn>
          {
            onDelete ?
              <RaisedButton
                className="m-l-md m-b-md m-r-md"
                label="Supprimer"
                secondary={true}
                onClick={() => this.handleRemoveSponsoringSportif(sponsoring_sportif._id)}
              />
              :
              undefined
          }

        </TableRowColumn>
      </TableRow>
    )
  }
}

SponsoringSportif.propTypes = {
  dispatch: PropTypes.func.isRequired,
  sponsoring_sportif: PropTypes.object.isRequired,
  onDelete: PropTypes.bool.isRequired,
  onUpdated: PropTypes.bool.isRequired,
};

export default connect()(SponsoringSportif);
