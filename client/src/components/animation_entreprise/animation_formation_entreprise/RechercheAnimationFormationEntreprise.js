/**
 * Created by pierremarsot on 28/02/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import ManagerInt from '../../../utils/ManagerInt';

import {
  search_sportif_animation_formation,
  init_search_sportif_animation_formation,
} from '../../../actions/search_sportif_animation_formation';

class RechercheAnimationConferenceEntreprise extends Component {
  constructor(props) {
    super(props);

    //On vide le tableau de recherche
    this.props.dispatch(init_search_sportif_animation_formation());

    //On récup l'id de la thématique dans l'url
    const id = this.props.params.id;
    if (!id) {
      //redirection
    }

    this.state = {
      idThematique: id,
      montant_max: '',
    };
  }

  componentDidMount() {
    this._launchSearch();
  }

  handleMontantMax = (event, new_montant) => {
    new_montant = ManagerInt.stringToInt(new_montant);
    new_montant = !ManagerInt.isInt(new_montant) ? '' : ManagerInt.intToString(new_montant);

    this.setState({
      montant_max: new_montant,
    });
  };

  handleSearch = () => {
    this._launchSearch();
  };

  _launchSearch = () => {
    const {
      idThematique,
      montant_max,
    } = this.state;

    this.props.dispatch(search_sportif_animation_formation(
      idThematique,
      montant_max
    ));
  };

  render() {
    const {
      search_sportif_animation_formation
    } = this.props;

    const {
      idThematique
    } = this.state;

    let result = [];
    const colors = ["bg-cyan-600", "bg-blue-600", "bg-green-600"];

    if (search_sportif_animation_formation.length > 0) {
      let index = 0;
      for (const sportif of search_sportif_animation_formation) {
        const {
          _source
        } = sportif;

        if (!_source) {
          continue;
        }

        const {
          animations_formation
        } = _source;

        if (!animations_formation || animations_formation.length === 0) {
          continue;
        }

        //On cherche la thématique
        const thematique = animations_formation.find((thema) => {
          return thema.id_thematique_animation_formation === idThematique;
        });
        if (!thematique) {
          continue;
        }

        const textAnimerSeul = thematique.animer_seul
          ?
          <p className="text-success">Peut l'animer seul</p>
          :
          <p className="text-warning">A besoin d'un consultant</p>;

        const styleHeaderWidget = "widget-header " + colors[index % 3] + " text-center padding-30 padding-bottom-15";

        result.push(
          <div key={sportif._id} className="col-sm-2 text-center">
            <div className="feature">
              <img alt="Image" src="/assets/img/avatar-round-3.png"/>
              <h5>{_source.nom_sportif} {_source.prenom_sportif}</h5>
              {
                _source.current_sport_sportif
                  ?
                  <p>
                    {_source.current_sport_sportif.nom_sport}
                  </p>
                  :
                  <p>
                    Sport non renseigné
                  </p>
              }
              <a className="btn btn--primary type--uppercase" href="#">
                <span className="btn__text">
                  Voir le profil
                </span>
              </a>
            </div>
          </div>
        );

        index++;
      }
    }

    return (
      <div id="recherche-sportif-animation-conference-entreprise">
        <div className="col-md-12">
          <div className=" boxed boxed--lg boxed--border">
            {
              result.length === 0
                ?
                <div className="alert alert-info">
                  Aucun résultat de recherche
                </div>
                :
                <div>
                  <h4>Les sportifs correspondants à votre recherche :</h4>
                  {result}
                </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {searchSportifAnimationFormation} = state;
  return {
    search_sportif_animation_formation: searchSportifAnimationFormation.search_sportif_animation_formation,
  };
}

export default connect(mapStateToProps)(RechercheAnimationConferenceEntreprise);