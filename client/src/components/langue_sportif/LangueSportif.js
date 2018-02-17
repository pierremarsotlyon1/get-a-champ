/**
 * Created by pierremarsot on 22/02/2017.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import TableRow from 'material-ui/Table/TableRow';
import TableRowColumn from 'material-ui/Table/TableRowColumn';
import RaisedButton from 'material-ui/RaisedButton';

import {
  remove_langue_sportif,
} from '../../actions/langue_sportif';

class LangueSportif extends React.Component {

  handleRemove = (id_langue_sportif) => {
    if (!id_langue_sportif) {
      return false;
    }

    this.props.dispatch(remove_langue_sportif(id_langue_sportif));
  };

  render() {
    const {
      deleted,
      langue_sportif,
    } = this.props;

    return (
      <div className="block-langue-sportif" key={langue_sportif.langue._id}>
        <div className="col-sm-5 col-md-4">
          <div className="feature feature-1 boxed boxed--border">
            <h5>{langue_sportif.langue.nom_langue}</h5>
            <p>
              {langue_sportif.niveau_langue.nom_niveau_langue}
            </p>
            {
              deleted ?
                <div className="margin-top-15">
                  <RaisedButton
                    className="m-l-md m-b-md m-r-md"
                    label="Supprimer"
                    secondary={true}
                    onClick={() => this.handleRemove(langue_sportif.langue._id)}
                  />
                </div>
                : ''
            }
          </div>
        </div>
      </div>
    )
  }
}

LangueSportif.propTypes = {
  dispatch: PropTypes.func.isRequired,
  langue_sportif: PropTypes.object.isRequired,
  deleted: PropTypes.bool.isRequired,
};

export default connect()(LangueSportif);