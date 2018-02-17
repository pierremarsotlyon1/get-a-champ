/**
 * Created by pierremarsot on 01/03/2017.
 */
import React from 'react';
import {connect} from 'react-redux';

class AffichageRechercheRecrutementEntreprise extends React.Component {
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


        const styleHeaderWidget = "widget-header " + colors[index % 3] + " text-center padding-30 padding-bottom-15";

        result.push(
          <div key={sportif._id} className="col-md-3 col-xs-12 masonry-item">
            <div className="widget widget-shadow">
              <div className={styleHeaderWidget}>
                <div className="font-size-20 white">{_source.nom_sportif} {_source.prenom_sportif}</div>

                <div className="grey-300 font-size-14 margin-bottom-20">
                  {
                    _source.current_sport_sportif
                      ?
                      <span>
                        {_source.current_sport_sportif.nom_sport}
                      </span>
                      :
                      <span>
                        Sport non renseigné
                      </span>
                  }
                </div>
                <a className="avatar avatar-100 img-bordered margin-bottom-10 bg-white">
                  <img src="/assets/portraits/4.jpg" alt=""/>
                </a>
              </div>
              <div className="widget-footer padding-horizontal-30 padding-vertical-20 text-center">
                <div className="row no-space">
                  {
                    _source.taux_matching
                      ?
                      <div className="col-sm-12">
                        <div className="counter">
                          <span className="counter-number blue-600">{_source.taux_matching}</span>
                          <div className="counter-label">Taux de matching</div>
                        </div>
                      </div>
                      : undefined
                  }

                  <div className="col-sm-12 padding-vertical-20">
                    <button type="button" className="btn btn-primary btn-sm waves-effect waves-light">
                      Voir le profil
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    return (
      <div className="col-md-9">
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