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
  load_thematique_animation_conference
} from '../../actions/thematique_animation_conference';
import {
  load_animation_conference_sportif,
} from '../../actions/animations_conference_sportif';

class AffichageCategorieAnimationConference extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      idCategorieSelected: ''
    };
  }

  componentDidMount() {
    const {
      thematiques_animation_conference,
      animations_conference_sportif
    } = this.props;

    if (!thematiques_animation_conference || thematiques_animation_conference.length === 0) {
      this.props.dispatch(load_thematique_animation_conference());
    }

    if (!animations_conference_sportif || animations_conference_sportif.length === 0) {
      this.props.dispatch(load_animation_conference_sportif());
    }
  }

  handleListItem = (event, index) => {
    this.setState({
      idCategorieSelected: index,
    });
  };

  render() {
    const {
      thematiques_animation_conference,
      animations_conference_sportif
    } = this.props;

    const {
      idCategorieSelected
    } = this.state;

    let categoriesThematique = [];

    for (const categorie of thematiques_animation_conference) {
      if (!categorie || !categorie._id || !categorie._source) {
        continue;
      }

      categoriesThematique.push(
        <ListItem
          key={categorie._id}
          value={categorie._id}
          primaryText={categorie._source.nom_categorie_animation_conference}
        />
      );
    }

    let tableThematiques;
    if (idCategorieSelected && idCategorieSelected.length > 0) {
      for (const categorie of thematiques_animation_conference) {
        if (!categorie || !categorie._id || !categorie._source) {
          continue;
        }

        if (idCategorieSelected !== categorie._id) {
          continue;
        }

        if (!categorie._source.thematique_animation_conference) {
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
              categorie._source.thematique_animation_conference.map((thematique) => {
                const find = animations_conference_sportif.find((thematique_sportif) => {
                  if (!thematique_sportif.id_thematique_animation_conference) {
                    return false;
                  }

                  return thematique_sportif.id_thematique_animation_conference === thematique.id;
                });

                if (!find) {
                  return <TableRow
                    selectable={false}
                    key={thematique.id}
                  >
                    <TableRowColumn>{thematique.nom_thematique_animation_conference}</TableRowColumn>
                    <TableRowColumn>
                      <Link to={"/profil/sportif/animation/conference/add/" + thematique.id}
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
          <h4>Ajouter une animation de conférence</h4>
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
          <Link to={"/profil/sportif/animation/conference/specifique"}
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
  const {thematiqueAnimationConference, animationsConferenceSportif} = state;
  return {
    thematiques_animation_conference: thematiqueAnimationConference.thematiques_animation_conference,
    animations_conference_sportif: animationsConferenceSportif.animations_conference_sportif,
  };
}

export default connect(mapStateToProps)(AffichageCategorieAnimationConference);