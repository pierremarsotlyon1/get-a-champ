/**
 * Created by pierremarsot on 02/02/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import Link from 'react-router/lib/Link';
import Table from 'material-ui/Table/Table';
import TableBody from 'material-ui/Table/TableBody';
import TableHeader from 'material-ui/Table/TableHeader';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import TableRow from 'material-ui/Table/TableRow';
import TableRowColumn from 'material-ui/Table/TableRowColumn';
import RaisedButton from 'material-ui/RaisedButton';

import {
  load_animation_formation_sportif,
  delete_animation_formation_sportif,
} from '../../actions/animations_formation_sportif';

class AffichageAnimationFormation extends React.Component {
  componentDidMount() {
    const {
      animations_formation_sportif
    } = this.props;

    if (!animations_formation_sportif || animations_formation_sportif.length === 0) {
      this.props.dispatch(load_animation_formation_sportif());
    }
  }

  removeAnimationConferenceSportif = (id_thematique_animation_formation) => {
    if (!id_thematique_animation_formation) {
      return false;
    }

    this.props.dispatch(delete_animation_formation_sportif(id_thematique_animation_formation));
  };

  render() {
    const {
      animations_formation_sportif
    } = this.props;

    let table = <Table>
      <TableHeader displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>Nom de l'animation de formation</TableHeaderColumn>
          <TableHeaderColumn>Peut l'animer seul</TableHeaderColumn>
          <TableHeaderColumn></TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {
          animations_formation_sportif.map((animation) => (
            <TableRow
              selectable={false}
              key={animation.id_thematique_animation_formation}
            >
              <TableRowColumn>
                {animation.nom_thematique_animation_formation}
              </TableRowColumn>
              <TableRowColumn>
                {animation.animer_seul ? 'Oui' : 'Non'}
              </TableRowColumn>
              <TableRowColumn>
                <RaisedButton
                  label="Supprimer"
                  secondary={true}
                  onTouchTap={() => this.removeAnimationConferenceSportif(animation.id_thematique_animation_formation)}
                />
              </TableRowColumn>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>;

    return (
      <div id="affichage-animation-incentive-sportif">
        <div className="boxed boxed--md boxed--border">
          <div className="row">
            <div className="col-sm-7">
              <h4>Mes animations de formation</h4>
            </div>
            <div className="col-sm-5">
              <Link to="/profil/sportif/animation/formation/listing"
                    className="btn btn--primary type--uppercase pull-right">
              <span className="btn__text">
                            Ajouter une thématique
                          </span>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {
                !animations_formation_sportif || animations_formation_sportif.length === 0
                  ?
                  <div className="alert alert-info">
                    Vous n'avez pas ajouté d'animation de formation
                  </div>
                  :
                  <div className="animation-conference-sportif-table">
                    {table}
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {animationsFormationSportif} = state;
  return {
    animations_formation_sportif: animationsFormationSportif.animations_formation_sportif,
  };
}

export default connect(mapStateToProps)(AffichageAnimationFormation);
