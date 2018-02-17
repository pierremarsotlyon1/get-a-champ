import Link from 'react-router/lib/Link';
import browserHistory from 'react-router/lib/browserHistory';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
const Tabs = require('react-simpletabs');
import {register_sportif, register_entreprise} from '../../actions/auth';

import 'react-simpletabs/dist/react-simpletabs.min.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(props) {
    if (props.connected) {
      // logged in, let's show redirect if any, or show home
      try {
        if (props.type_user === 1) {
          browserHistory.push("/profil/sportif");
        }
        else if (props.type_user === 2) {
          browserHistory.push("/profil/entreprise");
        }
      } catch (err) {
        browserHistory.push('/');
      }
    }
  }

  handleRegisterSportif = (e) => {
    e.preventDefault();
    const nom = this.refs.nom_sportif;
    const prenom = this.refs.prenom_sportif;
    const email = this.refs.email_sportif;
    const password = this.refs.password_sportif;
    const confirm_password = this.refs.confirm_password_sportif;

    this.props.dispatch(register_sportif(nom.value, prenom.value, email.value, password.value, confirm_password.value));
  };

  handleRegisterEntreprise = (event) => {
    event.preventDefault();
    const nom = this.refs.nom_gerant;
    const prenom = this.refs.prenom_gerant;
    const email = this.refs.email_gerant;
    const password = this.refs.password_gerant;
    const confirm_password = this.refs.confirm_password_gerant;
    const siret = this.refs.siret_entreprise;
    const nom_entreprise = this.refs.nom_entreprise;

    this.props.dispatch(register_entreprise(siret.value, nom.value, prenom.value, email.value, password.value,
      confirm_password.value, nom_entreprise.value));
  };

  render() {
    return (
      <section className="height-100 imagebg text-center" data-overlay="4">
        <div className="background-image-holder">
          <img alt="background" src="/assets/img/landing-21.jpg"/>
        </div>
        <div className="container pos-vertical-center">
          <div className="row">
            <div className="col-sm-12 col-md-12 boxed boxed--border bg--white">
              <Tabs>
                <Tabs.Panel title='Sportif'>
                  <form className="margin-top-15">
                    <div className="col-sm-12 color--dark">
                      <input type="text" ref="nom_sportif" placeholder="Nom" required/>
                    </div>
                    <div className="col-sm-12">
                      <input type="text" ref="prenom_sportif" placeholder="Prenom"
                             required/>
                    </div>
                    <div className="col-sm-12">
                      <input type="email" ref="email_sportif" placeholder="Email"
                             required/>
                    </div>
                    <div className="col-sm-12">
                      <input type="password" ref="password_sportif"
                             placeholder="Mot de passe"
                             required/>
                    </div>
                    <div className="col-sm-12">
                      <input type="password" ref="confirm_password_sportif"
                             placeholder="Confirmer le mot de passe"
                             required/>
                    </div>

                    <div className="form-group text-center">
                      <div className="btn btn--primary type--uppercase" onClick={this.handleRegisterSportif}>
                                <span className="btn__text force--white--color">
                                  Créer son compte sportif
                                </span>
                      </div>
                    </div>
                  </form>
                </Tabs.Panel>
                <Tabs.Panel title='Entreprise'>
                  <p>Veuillez nous contacter.</p>
                </Tabs.Panel>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    );
  };
}

function mapStateToProps(state) {
  const {auth} = state;
  if (state) {
    return {
      register_error: auth.register_error,
      connected: auth.connected,
      type_user: auth.type_user,
    };
  }

  return {
    register_error: '',
    connected: false,
    type_user: 0,
  };
}

export default connect(mapStateToProps)(Register);

/*
<form className="margin-top-15">
                    <div className="col-sm-12">
                      <input type="text" ref="nom_gerant" placeholder="Nom" required/>
                    </div>
                    <div className="col-sm-12">
                      <input type="text" ref="prenom_gerant" placeholder="Prenom"
                             required/>
                    </div>
                    <div className="col-sm-12">
                      <input type="text" ref="nom_entreprise"
                             placeholder="Nom de votre entreprise"
                             required/>
                    </div>
                    <div className="col-sm-12">
                      <input type="text" ref="siret_entreprise" placeholder="Siret"
                             required/>
                    </div>
                    <div className="col-sm-12">
                      <input type="email" ref="email_gerant" placeholder="Email" required/>
                    </div>

                    <div className="col-sm-12">
                      <input type="password" ref="password_gerant"
                             placeholder="Mot de passe"
                             required/>
                    </div>

                    <div className="col-sm-12">
                      <input type="password" ref="confirm_password_gerant"
                             placeholder="Confirmer le mot de passe" required/>
                    </div>

                    <div className="form-group text-center">
                      <div className="btn btn--primary type--uppercase" onClick={this.handleRegisterEntreprise}>
                                <span className="btn__text force--white--color">
                                  Créer son compte entreprise
                                </span>
                      </div>
                    </div>
                  </form>
 */