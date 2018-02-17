/**
 * Created by pierremarsot on 21/02/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import browserHistory from 'react-router/lib/browserHistory';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';

import {
  search_langue,
} from '../../actions/langue';

import {
  load_niveau_langue,
} from '../../actions/niveau_langue';

import {
  add_langue_sportif,
} from '../../actions/langue_sportif';

class AddLangueSportif extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      langue: undefined,
      niveau_langue: undefined,
    };
  }

  componentDidMount() {
    const {
      niveaux_langue,
    } = this.props;

    if (!niveaux_langue || niveaux_langue.length === 0) {
      this.props.dispatch(load_niveau_langue());
    }
  }

  handleChangeLangue = (langue) => {

    if (!langue) {
      return false;
    }

    this.props.dispatch(search_langue(langue));
  };

  handleChangeNiveauLangue = (event, index, value) => {
    this.setState({
      niveau_langue: value,
    });
  };

  handleSaveLangue = (langue, index) => {
    this.setState({
      langue: langue,
    });
  };

  handleSubmit = () => {
    const {
      langue,
      niveau_langue
    } = this.state;

    if (!langue) {
      return false;
    }

    this.props.dispatch(add_langue_sportif(langue.value, niveau_langue));
    browserHistory.push('/profil/sportif/langues');
  };

  render() {

    const {
      langues,
      niveaux_langue,
    } = this.props;

    let langues_local = [];

    for (const langue of langues) {
      langues_local.push({
        value: langue._id,
        text: langue._source.nom_langue,
      });
    }

    let niveaux_langue_local = [];
    let block_description_niveaux_langue = [];
    for (const niveau_langue of niveaux_langue) {
      niveaux_langue_local.push(
        <MenuItem
          key={niveau_langue._id}
          value={niveau_langue._id}
          primaryText={niveau_langue._source.nom_niveau_langue}
        />
      );
      block_description_niveaux_langue.push(
        <li className="list-group-item">
          <div className="media">
            <div className="media-body">
              <h4 className="media-heading">{niveau_langue._source.nom_niveau_langue}</h4>
              <p>{niveau_langue._source.description_niveau_langue}</p>
            </div>
          </div>
        </li>
      );
    }

    return (
      <div id="add-animation-conference-sportif">
        <div className="col-md-12">
          <div className="boxed boxed--md boxed--border">
            <h4>Ajouter une langue</h4>
            <div className="panel-body">
              <div className="col-md-6">
                <div className="form-group">
                  <AutoComplete
                    floatingLabelText="Saisissez une langue"
                    hintText="2 lettres minimum"
                    filter={AutoComplete.noFilter}
                    dataSource={langues_local}
                    onUpdateInput={this.handleChangeLangue}
                    onNewRequest={this.handleSaveLangue}
                    value={this.state.langue}
                  />
                </div>
                <div className="form-group">
                  <SelectField
                    floatingLabelText="Niveau de langue"
                    value={this.state.niveau_langue}
                    onChange={this.handleChangeNiveauLangue}
                  >
                    {niveaux_langue_local}
                  </SelectField>
                </div>
                <div className="form-group">
                  <div onClick={this.handleSubmit}
                       className="btn btn--primary type--uppercase">
              <span className="btn__text">
                            Ajouter la langue
                          </span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <ul className="list-group list-group-full">
                  {block_description_niveaux_langue}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {langue, niveauLangue} = state;
  return {
    langues: langue.langues,
    niveaux_langue: niveauLangue.niveaux_langue,
  };
}

export default connect(mapStateToProps)(AddLangueSportif);