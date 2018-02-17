/**
 * Created by pierremarsot on 09/02/2017.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import AffichageCompetitionSportif from './AffichageCompetitionSportif';
import AffichageExperienceSportif from './AffichageExperienceSportif';
import RaisedButton from 'material-ui/RaisedButton';
import ModalExperience from '../experience/ModalExperience';
import ModalCompetition from '../competition/ModalCompetition';

import {
  search_sport,
  load_niveaux_competition
} from '../../actions/profil_sportif';

import {
  update_competition_sportif,
  add_competition_sportif,
  close_modal_update_competition,
  open_modal_update_competition,
} from '../../actions/competition_sportif';

import {
  add_experience,
  close_modal_update_experience,
  open_modal_update_experience,
  update_experience,
} from '../../actions/experience_sportif';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-selectize/themes/index.css';

class ManagerParcoursSportif extends Component{
  constructor(props)
  {
    super(props);

    this.state = {
      openModalCompetition: false,
      openModalExperience: false,
      openModalUpdateCompetition: false,
      openModalUpdateExperience: false,
      openTest: true,
    };
  }

  componentDidMount(){
    const {
      niveaux_competition
    } = this.props;

    if(!niveaux_competition || niveaux_competition.length === 0)
    {
      this.props.dispatch(load_niveaux_competition());
    }
  }

  addExperience = (experience) => {
    this.props.dispatch(add_experience(experience));
    this.closeModalAddExperience();
  };

  updateCompetition = (competition) => {
    this.props.dispatch(update_competition_sportif(competition));
    this.setState({
      openModalUpdateCompetition: false,
    });
  };

  updateExperience = (experience) => {
    this.props.dispatch(update_experience(experience));
    this.setState({
      openModalUpdateExperience: false,
    });
  };

  handleOpenModalUpdateCompetition = (id_competition_sportif) => {
    this.props.dispatch(open_modal_update_competition(id_competition_sportif));
    this.setState({
      openModalUpdateCompetition: true,
    });
  };

  handleOpenModalUpdateExperience = (id_experience_sportif) => {
    this.props.dispatch(open_modal_update_experience(id_experience_sportif));
    this.setState({
      openModalUpdateExperience: true,
    });
  };

  handleCloseModalUpdateCompetition = () => {
    this.props.dispatch(close_modal_update_competition());
    this.setState({
      openModalUpdateCompetition: false,
    });
  };

  handleCloseModalUpdateExperience = () => {
    this.props.dispatch(close_modal_update_experience());
    this.setState({
      openModalUpdateExperience: false,
    });
  };

  handleOpenModalAddCompetition = () => {
    this.setState({
      openModalCompetition: true,
    });
  };

  handleCloseModalAddCompetition = () => {
    this.closeModalAddCompetition();
  };

  handleOpenModalAddExperience = () => {
    this.setState({
      openModalExperience: true,
    });
  };

  handleCloseModalAddExperience = () => {
    this.closeModalAddExperience();
  };

  closeModalAddExperience = () => {
    this.setState({
      openModalExperience: false,
    });
  };

  closeModalAddCompetition = () => {
    this.setState({
      openModalCompetition: false,
    });
  };

  addCompetition = (competition) => {
    this.props.dispatch(add_competition_sportif(competition));

    this.closeModalAddCompetition();
  };

  getSport = (input) => {
    if (!input) {
      return false;
    }

    this.props.dispatch(search_sport(input));
  };


  render(){

    const {
      search_sports,
      niveaux_competition,
      experience_sportif_update,
      competition_sportif_update,
    } = this.props;

    return (
      <section id="">
        <ModalExperience
          onSubmit={this.addExperience}
          open={this.state.openModalExperience}
          search_sports={search_sports}
          getSport={this.getSport}
          onDismiss={this.handleCloseModalAddExperience}
          title="Ajout d'une experience"
        />
        <ModalExperience
          onSubmit={this.updateExperience}
          open={this.state.openModalUpdateExperience}
          experience={experience_sportif_update}
          search_sports={search_sports}
          getSport={this.getSport}
          onDismiss={this.handleCloseModalUpdateExperience}
          title="Modification d'une experience"
        />

        <ModalCompetition
          onSubmit={this.addCompetition}
          open={this.state.openModalCompetition}
          search_sports={search_sports}
          getSport={this.getSport}
          onDismiss={this.handleCloseModalAddCompetition}
          niveaux_competition={niveaux_competition}
          title="Ajout d'une compétition"
        />
        <ModalCompetition
          onSubmit={this.updateCompetition}
          open={this.state.openModalUpdateCompetition}
          competition={competition_sportif_update}
          search_sports={search_sports}
          getSport={this.getSport}
          onDismiss={this.handleCloseModalUpdateCompetition}
          niveaux_competition={niveaux_competition}
          title="Modification d'une compétition"
        />

        <div className="col-md-12">
          <div className="pull-right clearfix nav-active-success">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <RaisedButton label="Ajouter une experience" onTouchTap={this.handleOpenModalAddExperience}/>
              </li>
              <li className="nav-item">
                <RaisedButton label="Ajouter une compétition" onTouchTap={this.handleOpenModalAddCompetition}/>
              </li>
            </ul>
          </div>
          <div className="clearfix"></div>
        </div>
        <div className="col-md-12">
          <Tabs>
            <Tab label="Parcours sportif">
              <AffichageExperienceSportif
                onUpdate={this.handleOpenModalUpdateExperience}
              />
            </Tab>
            <Tab label="Palmarés sportif">
              <AffichageCompetitionSportif
                onUpdate={this.handleOpenModalUpdateCompetition}
              />
            </Tab>
          </Tabs>
        </div>
      </section>
    )
  }
}


ManagerParcoursSportif.contextTypes = {
  router: PropTypes.object.isRequired,
};

ManagerParcoursSportif.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const {profil_sportif, competition_sportif, experience_sportif} = state;
  if (profil_sportif && competition_sportif && experience_sportif) {
    return {
      search_sports: profil_sportif.search_sports,
      niveaux_competition: profil_sportif.niveaux_competition,
      experience_sportif_update: experience_sportif.experience_sportif_update,
      competition_sportif_update: competition_sportif.competition_sportif_update,
    };
  }


  return {
    search_sports: [],
    niveaux_competition: [],
    experience_sportif_update: undefined,
    competition_sportif_update: undefined,
  };
}

export default connect(mapStateToProps)(ManagerParcoursSportif);