/**
 * Created by pierremarsot on 23/03/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import ListItem from 'material-ui/List/ListItem';
import SelectableList from '../../list/SelectableList';
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
} from '../../../actions/thematique_animation_formation';

class AffichageCategorieAnimationFormationEntreprise extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      idCategorieSelected: ''
    };
  }

  componentDidMount() {
    const {
      thematiques_animation_formation,
    } = this.props;

    if (!thematiques_animation_formation || thematiques_animation_formation.length === 0) {
      this.props.dispatch(load_thematique_animation_formation());
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
              categorie._source.thematique_animation_formation.map((thematique) => (
                <TableRow
                  selectable={false}
                  key={thematique.id}
                >
                  <TableRowColumn>{thematique.nom_thematique_animation_formation}</TableRowColumn>
                  <TableRowColumn>
                    <Link to={"/profil/entreprise/animation/formation/" + thematique.id + "/sportifs"}
                          className="nav-link">
                      <RaisedButton label="Voir les profils sportif" primary={true}/>
                    </Link>
                  </TableRowColumn>
                </TableRow>

              ))
            }
          </TableBody>
        </Table>;


        break;
      }
    }

    return (
      <div>
        <div className=" boxed boxed--lg boxed--border">
          <h4>Rechercher une animation de formation</h4>
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
            <div className=" boxed boxed--lg boxed--border">
              {tableThematiques}
            </div>
          </div>
          <div className="col-md-12 text-center margin-top-80">
            <Link to="/profil/entreprise/animation/formation/demande" className="btn btn--primary type--uppercase">
              <span className="btn__text">
                Vous ne trouvez pas votre formation ? Contactez nous
              </span>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {thematiqueAnimationFormation} = state;
  return {
    thematiques_animation_formation: thematiqueAnimationFormation.thematiques_animation_formation,
  };
}

export default connect(mapStateToProps)(AffichageCategorieAnimationFormationEntreprise);