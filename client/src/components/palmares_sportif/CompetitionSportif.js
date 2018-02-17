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
const Dropzone = require('react-dropzone');

import {
  frenchDate
} from '../../utils/DatePicker';

import {
  staticFileServer
} from '../../utils/apiUtils';

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

    if(!competition)
    {
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

  handleUpdateCompetition = (id_competition_sportif) => {

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

    if(!competition || this.state.urlYoutube.length === 0)
    {
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
      <li key={competition._id} className={classNameLi}>
        <div className="timeline-dot">
          <i className="icon md-image" aria-hidden="true"></i>
        </div>
        <div className="timeline-info">
          <time>{frenchDate(competition._source.date_debut_competition_sportif)}</time>
        </div>
        <div className="timeline-content">
          <div className="widget widget-article widget-shadow">

            <div className="widget-body">
              <p>
                <span>{competition._source.niveau_competition_sportif.nom_niveau_competition_sportif} </span>
                à
                <span> {competition._source.lieu_competition.nom}</span>
                <br/>
                Sport : {competition._source.sport_competition_sportif.nom_sport}
                </p>
              <div className="widget-body-footer">
                <div className="widget-actions pull-right">
                  <RaisedButton
                    label="Modifier"
                    onTouchTap={() => this.handleUpdateCompetition(competition._id)}
                  />
                  <RaisedButton
                    label="Supprimer"
                    secondary={true}
                    onTouchTap={() => this.handleRemoveCompetition(competition._id)}
                  />
                </div>



                {
                  haveVideo ?
                    <div>
                      {/*<video
                       controls
                       >
                       <source src={staticFileServer(competition._source.video_competition_sportif)} type="video/mp4" />
                       Vidéo de la compétition
                       </video>*/}
                      <YouTube
                        videoId={youtubeUrl.extractId(competition._source.video_competition_sportif)}
                        opts={options_video}
                      />

                      <RaisedButton
                        label="Supprimer la vidéo"
                        secondary={true}
                        onTouchTap={() => this.handleDeleteVideo(competition._id)}
                      />
                    </div>
                    :
                    <div>
                      <RaisedButton label="Ajouter une vidéo" primary={true}
                                    onTouchTap={this.handleOpenModalAddVideo}/>
                      <Dialog
                        title="Ajouter une vidéo"
                        actions={actionsModalVideo}
                        modal={false}
                        open={this.state.openModalAddVideo}
                        autoScrollBodyContent={true}
                        onRequestClose={this.handleCloseModalAddVideo}
                      >
                        {/*<Dropzone
                         onDrop={this.onDropVideo}
                         accept="video/mp4">
                         <div>Déplacer votre vidéo ici.</div>
                         </Dropzone>*/}
                        <TextField
                          floatingLabelText="Lien Youtube vers la vidéo"
                          onChange={this.handleChangeVideo}
                          defaultValue={this.state.urlYoutube}
                        />
                      </Dialog>
                    </div>
                }
              </div>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

CompetitionSportif.propTypes = {
  dispatch: PropTypes.func.isRequired,
  competition: PropTypes.object.isRequired,
  right: PropTypes.bool,
};

export default connect()(CompetitionSportif);