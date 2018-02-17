import React, {PropTypes} from 'react';
import Link from 'react-router/lib/Link';
import browserHistory from 'react-router/lib/browserHistory';
import {connect} from 'react-redux';

import {logout} from '../../actions/auth';
import './header.css';
import 'react-metismenu/dist/react-metismenu-standart.css';
import MetisMenu from 'react-metismenu';
import RouterLink from 'react-metismenu-router-link';

class Header extends React.Component {
  handleLogout = (event) => {
    event.preventDefault();
    this.props.dispatch(logout());
    browserHistory.push('/');
  };

  render() {
    const {connected, type_user} = this.props;
    const titleSite = 'Get a Champ';

    let menu;
    let content;

    if (connected) {
      switch (type_user) {
        case 1:
          content = [
            {
              label: 'Mes informations',
              content: [
                {
                  label: 'Mon profil',
                  to: '/profil/sportif',
                },
                {
                  label: 'Mes langues',
                  to: '/profil/sportif/langues',
                },
                /*{
                  label: 'Mon CV sportif',
                  to: '/profil/sportif/parcours_sportif',
                },*/
                {
                  label: 'Mon parcours professionnel',
                  to: '/profil/sportif/parcours_professionnel',
                },
               /* {
                  label: 'Mes diplômes',
                  to: '/profil/sportif/diplomes',
                },*/
                {
                  label: 'Mes connaissances pro',
                  to: '/profil/sportif/domaines_connaissances',
                },
                {
                  label: 'Mes compétences pro',
                  to: '/profil/sportif/domaines_competences',
                },
                {
                  label: 'Mon calendrier',
                  to: '/profil/sportif/calendar',
                }
              ],
            },
            {
              label: 'Mes tests de personnalités',
              content: [
                {
                  icon: 'icon-class-name',
                  label: 'Short test',
                  to: '/profil/sportif/ipip/short',
                },
                {
                  icon: 'icon-class-name',
                  label: 'Full test',
                  to: '/profil/sportif/ipip/full',
                },
              ],
            },
            /*{
              label: 'Ma carriére sport-entreprise',
              content: [
                {
                  icon: 'icon-class-name',
                  label: 'Animer une formation',
                  to: '/profil/sportif/animation/formation'
                },
                {
                  icon: 'icon-class-name',
                  label: 'Animer une incentive',
                  to: '/profil/sportif/animation/incentive',
                },
                {
                  label: 'Animer une conférence',
                  to: '/profil/sportif/animation/conference'
                },
                {
                  icon: 'icon-class-name',
                  label: 'Assurer la promotion',
                  to: '/profil/sportif/missions/promotion_image'
                },
                {
                  icon: 'icon-class-name',
                  label: 'Chercher un job',
                  to: '/profil/sportif/jobs',
                }
              ],
            },*/
            {
              label: 'Je recherche un sponsor',
              to: '/profil/sportif/sponsoring'
            },
          ];
          break;
        case 2:
          content = [
            {
              label: 'Mon profil',
              to: '/profil/entreprise'
            },
            {
              label: 'Mon entreprise',
              content: [
                /*{
                  icon: 'icon-class-name',
                  label: 'Développer son CA',
                  to: '',
                },*/
                {
                  icon: 'icon-class-name',
                  label: 'Acroitre sa notoriété',
                  to: '/profil/entreprise/sponsoring',
                },
              ],
            },
            {
              label: 'Recrutement d\'un sportif de haut niveau',
              content: [
                /*{
                  icon: 'icon-class-name',
                  label: 'Animation de formations',
                  to: '/profil/entreprise/animation/formation',
                },
                {
                  icon: 'icon-class-name',
                  label: 'Incentives',
                  to: '/profil/entreprise/animation/incentive',
                },
                {
                  icon: 'icon-class-name',
                  label: 'Séminaire/conférence',
                  to: '/profil/entreprise/animation/conference',
                },*/
                {
                  icon: 'icon-class-name',
                  label: 'Emploi',
                  to: '/profil/entreprise/offre_emploi',
                },
              ],
            },
            /*{
              label: 'Labelisation',
              content: [
                {
                  icon: 'icon-class-name',
                  label: 'Mon programme',
                  to: ''
                },
                {
                  icon: 'icon-class-name',
                  label: 'Mon auto-évaluation',
                  to: '',
                },
              ],
            },*/
          ];
          break;
        default:
          break;
      }

      menu =
        <div key="3" className="nav-container nav-container--sidebar">
          <div className="nav-sidebar-column bg--dark">
            <div className="text-center text-block">
              <Link href="/">
                <img alt="logo" className="logo" src="/assets/img/logoooowhite.png"/>
              </Link>
            </div>

            <div className="text-block">
              <MetisMenu
                content={content}
                LinkComponent={RouterLink}
                activeLinkFromLocation />
            </div>
            <div className="text-block">
              <Link className="btn block btn--primary type--uppercase" onClick={this.handleLogout}>
                <span className="btn__text">Déconnexion</span>
              </Link>
            </div>

            <div>
              <div>
                        <span className="type--fine-print type--fade">
                            &copy; Copyright
                            <span className="update-year"></span> getAchamp
                        </span>
              </div>
            </div>
          </div>
          <div className="nav-sidebar-column-toggle visible-xs visible-sm"
               data-toggle-className=".nav-sidebar-column;active">
            <i className="stack-menu"></i>
          </div>
        </div>;
    }
    else {
      menu =
        <div key="99" className="nav-container ">
          <div className="bar bar--sm visible-xs">
            <div className="container">
              <div className="row">
                <div className="col-xs-3 col-sm-2">
                  <a href="/">
                    <img className="logo logo-dark" alt="logo" src="/assets/img/logo-good-black.png"/>
                    <img className="logo logo-light" alt="logo" src="/assets/img/logoooowhite.png"/>
                  </a>
                </div>
                <div className="col-xs-9 col-sm-10 text-right">
                  <a href="#" className="hamburger-toggle" data-toggle-className="#menu1;hidden-xs">
                    <i className="icon icon--sm stack-interface stack-menu"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <nav id="menu1" className="bar bar--sm bar-1 hidden-xs hiddem-sm bar--absolute bar--transparent">
            <div className="container">
              <div className="row">
                <div className="col-md-1 col-sm-1 hidden-xs">
                  <div className="bar__module">
                    <a href="/">
                      <img className="logo logo-dark" alt="logo"
                           src="/assets/img/logo-good-black.png"/>
                      <img className="logo logo-light" alt="logo"
                           src="/assets/img/logoooowhite2.png"/>
                    </a>
                  </div>
                </div>
                <div className="col-md-11 col-sm-12 text-right text-left-xs text-left-sm">
                  <div className="bar__module">
                    <ul key="4" className="menu-horizontal text-left">
                      <li>
                        <Link to="/">Accueil</Link>
                      </li>
                      <li key="4" className="nav-item">
                        <Link to="/login">Connexion</Link>
                      </li>
                      <li key="5" className="nav-item">
                        <Link to="/register">Inscription</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>;
    }

    return menu;
  }
}

Header.contextTypes = {
  router: PropTypes.object.isRequired,
};

Header.propTypes = {
  connected: PropTypes.bool,
  type_user: PropTypes.number,
  handleLogout: PropTypes.func.isRequired,
  location: React.PropTypes.object,
};

function mapStateToProps(state) {
  const {auth} = state;
  if (auth) {
    return {
      connected: auth.connected,
      type_user: auth.type_user,
    };
  }

  return {
    login_error: 'Erreur de communication avec le serveur',
    connected: false,
    type_user: 0,
  };
}

export default connect(mapStateToProps)(Header);

/*
<li key="5" className="nav-item">
                        <Link to="/register">Inscription</Link>
                      </li>
 */