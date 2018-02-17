/**
 * Created by pierremarsot on 04/02/2017.
 */
import React, {PropTypes} from 'react';
import TableRow from 'material-ui/Table/TableRow';
import TableRowColumn from 'material-ui/Table/TableRowColumn';
import RaisedButton from 'material-ui/RaisedButton';

class ContratMissionEntrepriseSportif extends React.Component
{
  render()
  {
    const {
      contratMissionEntrepriseSportif,
      onDelete
    } = this.props;

    return (
      <TableRow>
        <TableRowColumn>
          {contratMissionEntrepriseSportif.nom_domaine_connaissance}
        </TableRowColumn>
        <TableRowColumn>
          {contratMissionEntrepriseSportif.niveau_connaissance.nom_niveau_domaine_connaissance}
        </TableRowColumn>
        <TableRowColumn>
          {
            onDelete ?
              <RaisedButton
                className="m-l-md m-b-md m-r-md"
                label="Supprimer"
                secondary={true}
                onClick={() => onDelete(contratMissionEntrepriseSportif.id_domaine_connaissance_sportif)}
              />
              : ''
          }
        </TableRowColumn>
      </TableRow>
    );
  }
}

ContratMissionEntrepriseSportif.propTypes = {
  contratMissionEntrepriseSportif: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
};

export default ContratMissionEntrepriseSportif;