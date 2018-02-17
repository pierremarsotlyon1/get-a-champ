import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Header from '../../components/header/Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Toasts from '../../components/toasts/Toasts';

import './app.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import {logout} from '../../actions/auth-old';

class App extends React.Component {
  handleLogout = () => {
    const {user} = this.props;
    this.props.dispatch(logout(user));
    this.context.router.replace('/login');
  };

  componentDidMount(){
    window.init_perso();
  }

  componentDidUpdate(){
    window.init_perso();
  }

  render() {
    const {user} = this.props;

    return (
      <MuiThemeProvider>
        <div className="dashboard site-menubar-unfold">
          <Toasts/>
          <Header location={this.props.location} user={user} handleLogout={this.handleLogout}/>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  user: PropTypes.string,
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

App.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const {auth} = state;
  return {
    connected: auth.connected,
    user: auth ? auth.user : null,
  };
};

export default connect(
  mapStateToProps
)(App);
