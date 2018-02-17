/**
 * Created by pierremarsot on 23/02/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import Geosuggest from 'react-geosuggest';

import {
  load_taille_entreprise,
} from '../../actions/taille_entreprise';
import {
  load_profil_entreprise,
  update_profil_entreprise,
} from '../../actions/profil_entreprise';

import '../../assets/styles/profile.min-v2.2.0.css';
import '../../assets/geosuggest/geosuggest.css';

class ManagerProfilEntreprise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profil_entreprise: undefined,
    };
  }

  componentDidMount() {
    const {
      tailles_entreprise,
      profil_entreprise,
    } = this.props;

    if (!tailles_entreprise || tailles_entreprise.length === 0) {
      this.props.dispatch(load_taille_entreprise());
    }

    if (!profil_entreprise) {
      this.props.dispatch(load_profil_entreprise());
    }
    else {
      this.setProfilEntreprise(profil_entreprise);
    }
  }

  componentWillReceiveProps(nextProps) {
    const profil_entreprise = this.getProfilEntreprise();
    if (!profil_entreprise && nextProps.profil_entreprise) {
      this.setProfilEntreprise(nextProps.profil_entreprise);
    }
  }

  getProfilEntreprise = () => {
    return this.props.profil_entreprise;
  };

  setProfilEntreprise = (profil_entreprise) => {
    this.setState({
      profil_entreprise: profil_entreprise,
    });
  };

  handleNomGerant = (event, nom_gerant) => {
    const profil_entreprise = this.getProfilEntreprise();
    if (!profil_entreprise) {
      return false;
    }

    profil_entreprise._source.nom_gerant = nom_gerant;
    this.setProfilEntreprise(profil_entreprise);
  };

  handlePrenomGerant = (event, prenom_gerant) => {
    const profil_entreprise = this.getProfilEntreprise();
    if (!profil_entreprise) {
      return false;
    }

    profil_entreprise._source.prenom_gerant = prenom_gerant;
    this.setProfilEntreprise(profil_entreprise);
  };

  handleNomEntreprise = (event, nom_entreprise) => {
    const profil_entreprise = this.getProfilEntreprise();
    if (!profil_entreprise) {
      return false;
    }

    profil_entreprise._source.nom_entreprise = nom_entreprise;
    this.setProfilEntreprise(profil_entreprise);
  };

  handleActiviteEntreprise = (event, activite_entreprise) => {
    const profil_entreprise = this.getProfilEntreprise();
    if (!profil_entreprise) {
      return false;
    }

    profil_entreprise._source.activite_entreprise = activite_entreprise;
    this.setProfilEntreprise(profil_entreprise);
  };

  handleDescriptionEntreprise = (event, description_entreprise) => {
    const profil_entreprise = this.getProfilEntreprise();
    if (!profil_entreprise) {
      return false;
    }

    profil_entreprise._source.description_entreprise = description_entreprise;
    this.setProfilEntreprise(profil_entreprise);
  };

  handleSiretEntreprise = (event, siret_entreprise) => {
    const profil_entreprise = this.getProfilEntreprise();
    if (!profil_entreprise) {
      return false;
    }

    profil_entreprise._source.siret_entreprise = siret_entreprise;
    this.setProfilEntreprise(profil_entreprise);
  };

  handleTelephoneEntreprise = (event, telephone_entreprise) => {
    const profil_entreprise = this.getProfilEntreprise();
    if (!profil_entreprise) {
      return false;
    }

    profil_entreprise._source.telephone_entreprise = telephone_entreprise;
    this.setProfilEntreprise(profil_entreprise);
  };

  handleUrlPageFacebookEntreprise = (event, url_page_facebook_entreprise) => {
    const profil_entreprise = this.getProfilEntreprise();
    if (!profil_entreprise) {
      return false;
    }

    profil_entreprise._source.url_page_facebook_entreprise = url_page_facebook_entreprise;
    this.setProfilEntreprise(profil_entreprise);
  };

  handleUrlPageInstagramEntreprise = (event, url_page_instagram_entreprise) => {
    const profil_entreprise = this.getProfilEntreprise();
    if (!profil_entreprise) {
      return false;
    }

    if (!url_page_instagram_entreprise) {
      url_page_instagram_entreprise = '';
    }

    profil_entreprise._source.url_page_instagram_entreprise = url_page_instagram_entreprise;
    this.setProfilEntreprise(profil_entreprise);
  };

  handleUrlPageTwitterEntreprise = (event, url_page_twitter_entreprise) => {
    const profil_entreprise = this.getProfilEntreprise();
    if (!profil_entreprise) {
      return false;
    }

    profil_entreprise._source.url_page_twitter_entreprise = url_page_twitter_entreprise;
    this.setProfilEntreprise(profil_entreprise);
  };

  handleUrlSitePersoEntreprise = (event, url_site_web_entreprise) => {
    const profil_entreprise = this.getProfilEntreprise();
    if (!profil_entreprise) {
      return false;
    }

    profil_entreprise._source.url_site_web_entreprise = url_site_web_entreprise;
    this.setProfilEntreprise(profil_entreprise);
  };

  handleChangeTailleEntreprise = (event, index, value) => {
    const profil_entreprise = this.getProfilEntreprise();
    if (!profil_entreprise) {
      return false;
    }

    if (!profil_entreprise._source.taille_entreprise) {
      profil_entreprise._source.taille_entreprise = {};
    }

    profil_entreprise._source.taille_entreprise._id = value;
    this.setProfilEntreprise(profil_entreprise);
  };

  handleUpdateProfilEntreprise = () => {
    const profil_entreprise = this.getProfilEntreprise();

    this.props.dispatch(update_profil_entreprise(profil_entreprise));
  };

  handleChangeLieuSiegeSocial = (geosuggest) => {
    const profil_entreprise = this.getProfilEntreprise();
    if (!profil_entreprise) {
      return false;
    }

    if (!geosuggest) {
      profil_entreprise._source.lieu_entreprise = undefined;
    }
    else {
      profil_entreprise._source.lieu_entreprise = {
        _id: geosuggest.placeId,
        location: {
          lat: geosuggest.location.lat,
          lon: geosuggest.location.lng,
        },
        nom: geosuggest.label,
      };
    }

    this.setProfilEntreprise(profil_entreprise);
  };

  render() {
    const {
      profil_entreprise,
    } = this.state;

    const {
      tailles_entreprise,
    } = this.props;

    let tailles_entreprise_local = [];
    if (tailles_entreprise && tailles_entreprise.length > 0) {
      for (const taille_entreprise of tailles_entreprise) {
        if (!taille_entreprise._source) {
          continue;
        }

        tailles_entreprise_local.push(
          <MenuItem
            key={taille_entreprise._id}
            value={taille_entreprise._id}
            primaryText={taille_entreprise._source.nom_taille_entreprise}
          />
        )
      }
    }

    return (
      <div className="page-profile">
        <div className="container-fluid">
          <div id="manager-profil-entreprise">
            {
              !profil_entreprise
                ?
                <div className="row">
                  <div className="col-md-12">
                    <div className="alert alert-info">
                      Chargement de vos données en cours ...
                    </div>
                  </div>
                </div>
                :
                <div className="row">


                  <div className="col-md-3">
                    <div className="boxed boxed--md boxed--border">
                      <div className="text-block text-center">
                        <img alt="avatar" src="/assets/img/avatar-round-3.png" className="image--sm"/>
                        <h4
                          className="profile-user">{profil_entreprise._source.nom_gerant} {profil_entreprise._source.prenom_gerant}</h4>
                        <p className="profile-job">{profil_entreprise._source.nom_entreprise}</p>
                        <p>
                          {
                            !(profil_entreprise._source.description_entreprise)
                              ?
                              <div className="text-info">
                                Vous n'avez pas ajouté de description
                              </div>
                              :
                              profil_entreprise._source.description_entreprise.length > 40
                                ?
                                (profil_entreprise._source.description_entreprise.substr(0, 39) + '...')
                                :
                                profil_entreprise._source.description_entreprise
                          }
                        </p>
                        <div className="profile-social">
                          {
                            profil_entreprise._source.url_page_facebook_entreprise
                              ?
                              <a
                                className="icon bd-facebook"
                                href={profil_entreprise._source.url_page_facebook_entreprise}
                                target="_blank"
                              ></a>
                              :
                              undefined
                          }
                          {
                            profil_entreprise._source.url_page_twitter_entreprise
                              ?
                              <a
                                className="icon bd-twitter"
                                href={profil_entreprise._source.url_page_twitter_entreprise}
                                target="_blank"
                              ></a>
                              :
                              undefined
                          }
                          {
                            profil_entreprise._source.url_page_instagram_entreprise
                              ?
                              <a
                                className="icon bd-instagram"
                                href={profil_entreprise._source.url_page_instagram_entreprise}
                                target="_blank"
                              ></a>
                              :
                              undefined
                          }
                          {
                            profil_entreprise._source.url_site_web_entreprise
                              ?
                              <a
                                className="icon bd-dribbble"
                                href={profil_entreprise._source.url_site_web_entreprise}
                                target="_blank"
                              ></a>
                              :
                              undefined
                          }
                        </div>
                      </div>
                      <hr/>
                      <div className="text-block">
                        <ul className="menu-vertical">
                          <li>
                            <a href="#"
                               data-toggle-class=".account-tab:not(.hidden);hidden|#mes-informations;hidden">
                              Mes informations
                            </a>
                          </li>
                          <li>
                            <a href="#" data-toggle-class=".account-tab:not(.hidden);hidden|#mon-entreprise;hidden">
                              Mon entreprise
                            </a>
                          </li>
                          <li>
                            <a href="#" data-toggle-class=".account-tab:not(.hidden);hidden|#mes-coordonnees;hidden">
                              Mes coordonnées
                            </a>
                          </li>
                          <li>
                            <a href="#" data-toggle-class=".account-tab:not(.hidden);hidden|#reseaux-sociaux;hidden">
                              Réseaux sociaux
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-9">
                    <div className=" boxed boxed--lg boxed--border">
                      <div id="mes-informations" className="account-tab">
                        <h4>Mes informations</h4>
                        <form>
                          <div className="form-group">
                            <TextField
                              floatingLabelText="Nom gérant"
                              value={profil_entreprise._source.nom_gerant}
                              fullWidth={true}
                              onChange={this.handleNomGerant}
                            />
                          </div>
                          <div className="form-group">
                            <TextField
                              floatingLabelText="Prénom gérant"
                              value={profil_entreprise._source.prenom_gerant}
                              fullWidth={true}
                              onChange={this.handlePrenomGerant}
                            />
                          </div>
                          <div className="form-group text-center">
                            <RaisedButton
                              label="Sauvegarder mes informations"
                              primary={true}
                              onTouchTap={this.handleUpdateProfilEntreprise}
                            />
                          </div>
                        </form>
                      </div>
                      <div id="mon-entreprise" className=" account-tab hidden">
                        <h4>Mon entreprise</h4>
                        <form>
                          <div className="form-group">
                            <TextField
                              floatingLabelText="Nom de votre entreprise"
                              value={profil_entreprise._source.nom_entreprise}
                              fullWidth={true}
                              onChange={this.handleNomEntreprise}
                            />
                          </div>
                          <div className="form-group">
                            <label>Siége social de votre entreprise</label>
                            <Geosuggest
                              placeholder="Siége social de votre entreprise"
                              initialValue={profil_entreprise._source.lieu_entreprise ? profil_entreprise._source.lieu_entreprise.nom : undefined}
                              onSuggestSelect={this.handleChangeLieuSiegeSocial}
                              onSuggestNoResults={this.handleChangeLieuSiegeSocial}
                            />
                          </div>
                          <div className="form-group">
                            <SelectField
                              value={profil_entreprise._source.taille_entreprise ? profil_entreprise._source.taille_entreprise._id : undefined}
                              onChange={this.handleChangeTailleEntreprise}
                              floatingLabelText="Taille de votre entreprise"
                              floatingLabelFixed={true}
                              hintText="Taille de votre entreprise"
                              fullWidth={true}
                            >
                              {tailles_entreprise_local}
                            </SelectField>
                          </div>
                          <div className="form-group">
                            <TextField
                              floatingLabelText="Activité de votre entreprise"
                              value={profil_entreprise._source.activite_entreprise}
                              fullWidth={true}
                              onChange={this.handleActiviteEntreprise}
                            />
                          </div>
                          <div className="form-group">
                            <TextField
                              floatingLabelText="Description de votre entreprise"
                              value={profil_entreprise._source.description_entreprise}
                              fullWidth={true}
                              onChange={this.handleDescriptionEntreprise}
                            />
                          </div>
                          <div className="form-group">
                            <TextField
                              floatingLabelText="SIRET de votre entreprise"
                              value={profil_entreprise._source.siret_entreprise}
                              fullWidth={true}
                              onChange={this.handleSiretEntreprise}
                            />
                          </div>
                          <div className="form-group text-center">
                            <RaisedButton
                              label="Sauvegarder mes informations"
                              primary={true}
                              onTouchTap={this.handleUpdateProfilEntreprise}
                            />
                          </div>
                        </form>
                      </div>
                      <div id="mes-coordonnees" className=" hidden account-tab">
                        <h4>Mes coordonnées</h4>
                        <form>
                          <div className="form-group">
                            <TextField
                              floatingLabelText="Téléphone de votre entreprise"
                              value={profil_entreprise._source.telephone_entreprise}
                              onChange={this.handleTelephoneEntreprise}
                            />
                          </div>
                          <div className="form-group text-center">
                            <RaisedButton
                              label="Sauvegarder mes informations"
                              primary={true}
                              onTouchTap={this.handleUpdateProfilEntreprise}
                            />
                          </div>
                        </form>
                      </div>
                      <div id="reseaux-sociaux" className=" hidden account-tab">
                        <h4>Réseaux sociaux</h4>
                        <form>
                          <div className="form-group">
                            <TextField
                              floatingLabelText="Url page facebook"
                              value={profil_entreprise._source.url_page_facebook_entreprise}
                              fullWidth={true}
                              onChange={this.handleUrlPageFacebookEntreprise}
                            />
                          </div>
                          <div className="form-group">
                            <TextField
                              floatingLabelText="Url page instagram"
                              value={profil_entreprise._source.url_page_instagram_entreprise}
                              fullWidth={true}
                              onChange={this.handleUrlPageInstagramEntreprise}
                            />
                          </div>
                          <div className="form-group">
                            <TextField
                              floatingLabelText="Url page twitter"
                              value={profil_entreprise._source.url_page_twitter_entreprise}
                              fullWidth={true}
                              onChange={this.handleUrlPageTwitterEntreprise}
                            />
                          </div>
                          <div className="form-group">
                            <TextField
                              floatingLabelText="Url site perso entreprise"
                              value={profil_entreprise._source.url_site_web_entreprise}
                              fullWidth={true}
                              onChange={this.handleUrlSitePersoEntreprise}
                            />
                          </div>
                          <div className="form-group text-center">
                            <RaisedButton
                              label="Sauvegarder mes informations"
                              primary={true}
                              onTouchTap={this.handleUpdateProfilEntreprise}
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {tailleEntreprise, profilEntreprise} = state;
  return {
    tailles_entreprise: tailleEntreprise.tailles_entreprise,
    profil_entreprise: profilEntreprise.profil_entreprise,
  };
}

export default connect(mapStateToProps)(ManagerProfilEntreprise);