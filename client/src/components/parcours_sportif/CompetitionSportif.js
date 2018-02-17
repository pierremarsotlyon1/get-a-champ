/**
 * Created by pierremarsot on 10/02/2017.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import YouTube from 'react-youtube';
import youtubeUrl from 'youtube-url';

import {
  frenchDate
} from '../../utils/DatePicker';

import {
  upload_video_competition,
  remove_video_competition,
  remove_competition_sportif,
} from '../../actions/competition_sportif';

import './competitionSportif.css';

class CompetitionSportif extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalAddVideo: false,
      urlYoutube: '',
    };
  }

  onDropVideo = (acceptedFiles) => {
    const {
      competition,
    } = this.props;

    if (!competition) {
      return false;
    }

    this.props.dispatch(upload_video_competition(competition._id, acceptedFiles[0]));
    this.handleCloseModalAddVideo();
  };

  handleDeleteVideo = (id_competiton_sportive) => {
    this.props.dispatch(remove_video_competition(id_competiton_sportive));
  };

  handleOpenModalAddVideo = () => {
    this.setState({
      openModalAddVideo: true,
    });
  };

  handleCloseModalAddVideo = () => {
    this.setState({
      openModalAddVideo: false,
    });
  };

  handleRemoveCompetition = (index_competition) => {
    this.props.dispatch(remove_competition_sportif(index_competition));
  };

  handleChangeVideo = (event, urlVideo) => {

    this.setState({
      urlYoutube: urlVideo,
    });
  };

  handleAddVideo = () => {
    const {
      competition,
    } = this.props;


    if (!competition || this.state.urlYoutube.length === 0) {
      return false;
    }

    this.props.dispatch(upload_video_competition(competition._id, this.state.urlYoutube));
    this.handleCloseModalAddVideo();
  };

  render() {
    const {
      competition,
    } = this.props;

    const actionsModalVideo = [
      <FlatButton
        label="Fermer"
        primary={true}
        onTouchTap={this.handleCloseModalAddVideo}
      />,
      <FlatButton
        label="Ajouter la vidéo"
        primary={true}
        onTouchTap={this.handleAddVideo}
      />,
    ];

    const haveVideo = competition._source.video_competition_sportif && competition._source.video_competition_sportif.length !== 0;
    const options_video = {
      height: '390',
      width: '450',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };

    const classNameLi = this.props.right ? "timeline-item" : "timeline-item timeline-reverse";

    return (
      <div className="process__item" key={competition._id}>
        <h4>{competition._source.sport_competition_sportif.nom_sport}
          <br/> {competition._source.niveau_competition_sportif.nom_niveau_competition_sportif}
          à {competition._source.lieu_competition.nom}
        </h4>
        <p>
          Le : {frenchDate(competition._source.date_debut_competition_sportif)}
          <br/>
          Rang : {competition._source.rang_competiton_sportif}
        </p>
        <div className="widget-body-footer">
          <div className="widget-actions">
            <RaisedButton
              label="Modifier"
              onTouchTap={() => this.props.onUpdate(competition._id)}
            />
            <RaisedButton
              label="Supprimer"
              secondary={true}
              onTouchTap={() => this.handleRemoveCompetition(competition._id)}
            />
          </div>
        </div>
      </div>
    )
  }
}

CompetitionSportif.propTypes = {
  dispatch: PropTypes.func.isRequired,
  competition: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  right: PropTypes.bool,
};

export default connect()(CompetitionSportif);