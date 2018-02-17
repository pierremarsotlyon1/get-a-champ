/**
 * Created by pierremarsot on 01/03/2017.
 */
import React from 'react';
import {connect} from 'react-redux';

import {
  search_recrutement_sportif,
} from '../../actions/recrutement_entreprise';

class AffichageRechercheRecrutementEntreprise extends React.Component {
  constructor(props) {
    super(props);

    const id_metier = this.props.params.id;
    if (!id_metier) {
      //redirection
    }

    this.state = {
      id_metier: id_metier,
    };
  }

  componentDidMount() {
    this.props.dispatch(search_recrutement_sportif(this.state.id_metier));
  }

  render() {
    const colors = ["bg-cyan-600", "bg-blue-600", "bg-green-600"];
    const {
      sportifs,
    } = this.props;

    let result = [];

    if (sportifs.length > 0) {
      for (let index = 0; index < sportifs.length; index++) {
        const sportif = sportifs[index];

        const {
          _source
        } = sportif;

        if (!_source) {
          continue;
        }

        let blockTauxMatchingMetier, blockTauxMatchingDimension;

        if (_source.taux_matching_metier) {
          blockTauxMatchingMetier = <div className="col-sm-12">
            <div className="counter">
              <span className="counter-number blue-600">{_source.taux_matching_metier}%</span>
              <div className="counter-label">Taux de matching metier</div>
            </div>
          </div>
        }

        if (_source.taux_matching_dimension) {
          blockTauxMatchingDimension = <div className="col-sm-12">
            <div className="counter">
              <span className="counter-number blue-600">{_source.taux_matching_dimension}%</span>
              <div className="counter-label">Taux de matching dimension</div>
            </div>
          </div>
        }

        result.push(
          <div key={sportif._id} className="col-sm-3 text-center">
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
              {blockTauxMatchingMetier}
              {blockTauxMatchingDimension}
              <a className="btn btn--primary type--uppercase" href="#">
                <span className="btn__text">
                  Voir le profil
                </span>
              </a>
            </div>
          </div>
        );
      }
    }

    return (
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
                {result}
              </div>
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {recrutementEntreprise} = state;
  return {
    sportifs: recrutementEntreprise.sportifs,
  };
}

export default connect(mapStateToProps)(AffichageRechercheRecrutementEntreprise);