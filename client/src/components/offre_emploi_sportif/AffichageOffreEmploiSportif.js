/**
 * Created by pierremarsot on 14/07/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import Link from 'react-router/lib/Link';

class AffichageOffreEmploiSportif extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="jobSportif">
        <div className="boxed boxed--lg boxed--border">
          <div className="row">
            <div className="col-sm-7">
              <h4>Des offres d’emploi qui pourraient vous intéresser</h4>
            </div>
            <div className="col-sm-5">
              <Link to="/profil/sportif/jobs/settings"
                    className="btn btn--primary type--uppercase pull-right">
              <span className="btn__text">
                            Mettre les objectifs professionnels à jour
                          </span>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="block-langue-sportif">
              <div className="col-sm-5 col-md-4">
                <div className="feature feature-1 boxed boxed--border">
                  <h5 className="title-job">Développeur logiciels</h5>
                  <p>
                    ADAMEO
                  </p>
                  <p>
                    Région de Lyon, France
                  </p>
                  <p>
                    Publié il y a 2 jours
                  </p>
                </div>
              </div>
            </div>
            <div className="block-langue-sportif">
              <div className="col-sm-5 col-md-4">
                <div className="feature feature-1 boxed boxed--border">
                  <h5 className="title-job">Développeuse / Développeur informatique C#, C++, JavaScript</h5>
                  <p>
                    Esker France
                  </p>
                  <p>
                    Région de Lyon, France
                  </p>
                  <p>
                    Publié il y a 2 jours
                  </p>
                </div>
              </div>
            </div>
            <div className="block-langue-sportif">
              <div className="col-sm-5 col-md-4">
                <div className="feature feature-1 boxed boxed--border">
                  <h5 className="title-job">Développeur informatique</h5>
                  <p>
                    Brioche Pasquier
                  </p>
                  <p>
                    Région de Lyon, France
                  </p>
                  <p>
                    Publié il y a 2 jours
                  </p>
                </div>
              </div>
            </div>
            <div className="block-langue-sportif">
              <div className="col-sm-5 col-md-4">
                <div className="feature feature-1 boxed boxed--border">
                  <h5 className="title-job">Développeur web back-end</h5>
                  <p>
                    Kiss The Bride
                  </p>
                  <p>
                    Région de Lyon, France
                  </p>
                  <p>
                    Publié il y a 2 jours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(AffichageOffreEmploiSportif);
