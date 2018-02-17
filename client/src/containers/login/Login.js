import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {login} from '../../actions/auth';
import Link from 'react-router/lib/Link';
import browserHistory from 'react-router/lib/browserHistory';
import './login.css';

class Login extends React.Component {
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
        else {
          browserHistory.push('/');
        }
      } catch (err) {
        browserHistory.push('/');
      }
    }
  }

  handleLogin = (event) => {
    event.preventDefault();
    const email = this.refs.email;
    const password = this.refs.password;

    this.props.dispatch(login(email.value, password.value));
  };

  render() {
    return (
      <section className="height-100 imagebg text-center" data-overlay="4">
        <div className="background-image-holder">
          <img alt="background" src="/assets/img/inner-6.jpg" />
        </div>
        <div className="container pos-vertical-center">
          <div className="row">
            <div className="col-sm-7 col-md-5">
              <h2>Connectez-vous</h2>
              <p className="lead">
                Re-bonjour ! Connectez-vous à votre compte avec vos identifiants
              </p>
              <form>
                <div className="row">
                  <div className="col-sm-12">
                    <input type="email" className="form-control" ref="email" placeholder="Email" required/>
                  </div>
                  <div className="col-sm-12">
                    <input type="password" className="form-control" ref="password" placeholder="Mot de passe"
                           required/>
                  </div>
                  <div className="col-sm-12">
                    <button type="submit"
                            className="btn btn--primary type--uppercase"
                            onClick={this.handleLogin}
                    >
                      Se connecter
                    </button>
                  </div>
                </div>
              </form>
              <span className="type--fine-print block">Vous n'avez pas de compte ?
                                <Link to="/register">Créer un compte</Link>
                            </span>
              <span className="type--fine-print block">Mot de passe oublié ?
                                <Link to="#">Récupérer son compte</Link>
                            </span>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  const {auth} = state;
  if (auth) {
    return {
      connected: auth.connected,
      type_user: auth.type_user,
    };
  }

  return {
    connected: false,
    type_user: 0,
  };
}

export default connect(mapStateToProps)(Login);
