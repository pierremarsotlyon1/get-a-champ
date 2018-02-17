/**
 * Created by pierremarsot on 23/03/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import ListItem from 'material-ui/List/ListItem';
import SelectableList from '../list/SelectableList';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import Link from 'react-router/lib/Link';
import Table from 'material-ui/Table/Table';
import TableBody from 'material-ui/Table/TableBody';
import TableHeader from 'material-ui/Table/TableHeader';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import TableRow from 'material-ui/Table/TableRow';
import TableRowColumn from 'material-ui/Table/TableRowColumn';
import RaisedButton from 'material-ui/RaisedButton';

import {
  load_thematique_animation_formation
} from '../../actions/thematique_animation_formation';

import {
  load_animation_formation_sportif,
} from '../../actions/animations_formation_sportif';

class AffichageCategorieAnimationFormation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      idCategorieSelected: ''
    };
  }

  componentDidMount() {
    const {
      thematiques_animation_formation,
      animations_formation_sportif
    } = this.props;

    if (!thematiques_animation_formation || thematiques_animation_formation.length === 0) {
      this.props.dispatch(load_thematique_animation_formation());
    }

    if (!animations_formation_sportif || animations_formation_sportif.length === 0) {
      this.props.dispatch(load_animation_formation_sportif());
    }
  }

  handleListItem = (event, index) => {
    this.setState({
      idCategorieSelected: index,
    });
  };

  render() {
    const {
      thematiques_animation_formation,
      animations_formation_sportif
    } = this.props;

    const {
      idCategorieSelected
    } = this.state;

    let categoriesThematique = [];

    for (const categorie of thematiques_animation_formation) {
      if (!categorie || !categorie._id || !categorie._source) {
        continue;
      }

      categoriesThematique.push(
        <ListItem
          key={categorie._id}
          value={categorie._id}
          primaryText={categorie._source.nom_categorie_animation_formation}
        />
      );
    }

    let tableThematiques;
    if (idCategorieSelected && idCategorieSelected.length > 0) {
      for (const categorie of thematiques_animation_formation) {
        if (!categorie || !categorie._id || !categorie._source) {
          continue;
        }

        if (idCategorieSelected !== categorie._id) {
          continue;
        }

        if (!categorie._source.thematique_animation_formation) {
          break;
        }

        tableThematiques = <Table>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Titre</TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              categorie._source.thematique_animation_formation.map((thematique) => {
                const find = animations_formation_sportif.find((thematique_sportif) => {
                  if (!thematique_sportif.id_thematique_animation_formation) {
                    return false;
                  }

                  return thematique_sportif.id_thematique_animation_formation === thematique.id;
                });

                if (!find) {
                  return <TableRow
                    selectable={false}
                    key={thematique.id}
                  >
                    <TableRowColumn>{thematique.nom_thematique_animation_formation}</TableRowColumn>
                    <TableRowColumn>
                      <Link to={"/profil/sportif/animation/formation/add/" + thematique.id}
                            className="nav-link">
                        <RaisedButton label="Ajouter" primary={true}/>
                      </Link>
                    </TableRowColumn>
                  </TableRow>
                }
              })
            }
          </TableBody>
        </Table>;


        break;
      }
    }

    return (
      <div className="boxed boxed--md boxed--border">
        <div className="row">
          <div className="col-md-12">
            <h4>Ajouter une animation de formation</h4>
          </div>
          <div className="col-md-3">
            <Paper zDepth={1}>
              <SelectableList
                onChange={this.handleListItem}
              >
                <Subheader>Catégorie des formations</Subheader>
                {categoriesThematique}
              </SelectableList>
            </Paper>
          </div>
          <div className="col-md-9">
            <div className="boxed boxed--md boxed--border">
              {tableThematiques}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center margin-top-80">
            <Link to={"/profil/sportif/animation/formation/specifique"}
                  className="nav-link">
              <RaisedButton label="Vous ne trouvez pas votre formation ? Contactez-nous" primary={true}/>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {thematiqueAnimationFormation, animationsFormationSportif} = state;
  return {
    thematiques_animation_formation: thematiqueAnimationFormation.thematiques_animation_formation,
    animations_formation_sportif: animationsFormationSportif.animations_formation_sportif,
  };
}

export default connect(mapStateToProps)(AffichageCategorieAnimationFormation);