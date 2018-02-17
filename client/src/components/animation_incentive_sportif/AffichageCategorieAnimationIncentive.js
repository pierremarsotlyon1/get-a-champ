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
  load_thematique_animation_incentive_evenementiel
} from '../../actions/thematique_animation_incentive_evenementiel';

import {
  load_animation_incentive_evenementiel_sportif
} from '../../actions/animations_incentive_evenementiel_sportif';


class AffichageCategorieAnimationIncentive extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      idCategorieSelected: ''
    };
  }

  componentDidMount() {
    const {
      thematiques_animation_incentive_evenementiel,
      animations_incentive_evenementiel_sportif,
    } = this.props;

    if (!thematiques_animation_incentive_evenementiel || thematiques_animation_incentive_evenementiel.length === 0) {
      this.props.dispatch(load_thematique_animation_incentive_evenementiel());
    }

    if (!animations_incentive_evenementiel_sportif || animations_incentive_evenementiel_sportif.length === 0) {
      this.props.dispatch(load_animation_incentive_evenementiel_sportif());
    }
  }

  handleListItem = (event, index) => {
    this.setState({
      idCategorieSelected: index,
    });
  };

  render() {
    const {
      thematiques_animation_incentive_evenementiel,
      animations_incentive_evenementiel_sportif,
    } = this.props;

    const {
      idCategorieSelected
    } = this.state;

    let categoriesThematique = [];

    for (const categorie of thematiques_animation_incentive_evenementiel) {
      if (!categorie || !categorie._id || !categorie._source) {
        continue;
      }

      categoriesThematique.push(
        <ListItem
          key={categorie._id}
          value={categorie._id}
          primaryText={categorie._source.nom_categorie_animation_incentive}
        />
      );
    }

    let tableThematiques;
    if (idCategorieSelected && idCategorieSelected.length > 0) {
      for (const categorie of thematiques_animation_incentive_evenementiel) {
        if (!categorie || !categorie._id || !categorie._source) {
          continue;
        }

        if (idCategorieSelected !== categorie._id) {
          continue;
        }

        if (!categorie._source.thematique_animation_incentive) {
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
              categorie._source.thematique_animation_incentive.map((thematique) => {
                const find = animations_incentive_evenementiel_sportif.find((thematique_sportif) => {
                  if(!thematique_sportif.id_thematique_animation_incentive_evenementiel){
                    return false;
                  }

                  return thematique_sportif.id_thematique_animation_incentive_evenementiel === thematique.id;
                });

                if(!find){
                  return <TableRow
                    selectable={false}
                    key={thematique.id}
                  >
                    <TableRowColumn>{thematique.nom_thematique_animation_incentive}</TableRowColumn>
                    <TableRowColumn>
                      <Link to={"/profil/sportif/animation/incentive/add/" + thematique.id}
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
            <h4>Ajouter une animation incentive</h4>
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
            {tableThematiques}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center margin-top-80">
            <Link to={"/profil/sportif/animation/incentive/specifique"}
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
  const {thematiqueAnimationIncentiveEvenementiel, animationsIncentiveEvenementielSportif} = state;
  return {
    thematiques_animation_incentive_evenementiel: thematiqueAnimationIncentiveEvenementiel.thematiques_animation_incentive_evenementiel,
    animations_incentive_evenementiel_sportif: animationsIncentiveEvenementielSportif.animations_incentive_evenementiel_sportif,
  };
}

export default connect(mapStateToProps)(AffichageCategorieAnimationIncentive);