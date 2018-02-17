/**
 * Created by pierremarsot on 01/03/2017.
 */
import React from 'react';
import {connect} from 'react-redux';

class AffichageRechercheSponsoringEntreprise extends React.Component {
  render() {
    const colors = ["bg-cyan-600", "bg-blue-600", "bg-green-600"];
    const {
      search_sportif_sponsoring,
    } = this.props;

    let result = [];

    if (search_sportif_sponsoring.length > 0) {
      let index = 0;
      for (const sportif of search_sportif_sponsoring) {
        const {
          _source
        } = sportif;
        if (!_source) {
          continue;
        }

        result.push(
          <div key={sportif._id} className="col-sm-4 text-center">
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
      <div className="col-md-9">
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
  const {searchSportifSponsoring} = state;
  return {
    search_sportif_sponsoring: searchSportifSponsoring.search_sportif_sponsoring,
  };
}

export default connect(mapStateToProps)(AffichageRechercheSponsoringEntreprise);