/**
 * Created by pierremarsot on 10/02/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import Geosuggest from 'react-geosuggest';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import NumberInput from 'material-ui-number-input';

import '../../assets/geosuggest/geosuggest.css';

import {defineDateTimeFormat} from '../../utils/DatePicker';

const DateTimeFormat = defineDateTimeFormat();

import {
  add_sponsoring_sportif,
} from '../../actions/sponsoring_sportif';

import {
  load_type_sponsoring,
} from '../../actions/type_sponsoring';

class ModalAddSponsoringSportif extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
      date_depart_sponsoring_sportif: undefined,
      date_fin_sponsoring_sportif: undefined,
      lieu_sponsoring_sportif: {
        placeId: undefined,
        label: undefined,
        location: {
          lat: undefined,
          lng: undefined,
        }
      },
      description_sponsoring_sportif: undefined,
      type_sponsoring: undefined,
      montant_recherche: '',
    }
  }

  componentDidMount() {
    const {
      types_sponsoring,
    } = this.props;

    if (!types_sponsoring || types_sponsoring.length === 0) {
      this.props.dispatch(load_type_sponsoring());
    }
  }

  handleOpenModal = () => {
    this.setState({
      openModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      openModal: false,
    });
  };

  handleChangeDateDepart = (event, date) => {
    this.setState({
      date_depart_sponsoring_sportif: date,
    });
  };

  handleChangeDateFin = (event, date) => {
    this.setState({
      date_fin_sponsoring_sportif: date,
    });
  };

  handleChangeLieu = (geosuggest) => {
    this.setState({
      lieu_sponsoring_sportif: geosuggest,
    });
  };

  handleChangeDescription = (event, description_sponsoring_sportif) => {
    this.setState({
      description_sponsoring_sportif: description_sponsoring_sportif,
    });
  };

  handleChangeTypeSponsoring = (event, index, value) => {
    this.setState({
      type_sponsoring: value,
    });
  };

  handleOnValidMontantRecherche = (event, montant_recherche) => {
    montant_recherche = Number.parseInt(montant_recherche, 0);
    this.setState({
      montant_recherche: montant_recherche.toString(),
    });
  };

  handleSubmitModal = () => {
    const {
      type_sponsoring,
      date_depart_sponsoring_sportif,
      date_fin_sponsoring_sportif,
      lieu_sponsoring_sportif,
      description_sponsoring_sportif,
      montant_recherche,
    } = this.state;

    this.props.dispatch(add_sponsoring_sportif(
      type_sponsoring,
      date_depart_sponsoring_sportif,
      date_fin_sponsoring_sportif,
      lieu_sponsoring_sportif,
      description_sponsoring_sportif,
      montant_recherche
    ));
  };

  render() {
    const {
      types_sponsoring
    } = this.props;

    const actions = [
      <FlatButton
        label="Fermer"
        primary={true}
        onTouchTap={this.handleCloseModal}
      />,
      <FlatButton
        label="Enregistrer"
        primary={true}
        onTouchTap={this.handleSubmitModal}
      />,
    ];

    let types_sponsoring_local = [];
    for (const type_sponsoring of types_sponsoring) {
      types_sponsoring_local.push(
        <MenuItem key={type_sponsoring._id} value={type_sponsoring._id}
                  primaryText={type_sponsoring._source.nom_type_sponsoring}/>
      );
    }

    return (
      <div className="col-md-12">
        <div className="boxed boxed--md boxed--border">
          <h4>Ajouter un sponsoring</h4>
          <form role="form" className="p-a-md col-md-12">
            <div className="form-group">
              <SelectField
                floatingLabelText="Type du sponsoring"
                value={this.state.type_sponsoring}
                onChange={this.handleChangeTypeSponsoring}
                fullWidth={true}
              >
                {types_sponsoring_local}
              </SelectField>
            </div>
            <div className="form-group">
              <label>Lieu du sponsoring :</label>
              <Geosuggest
                placeholder="Lieu du sponsoring"
                initialValue={this.state.lieu_sponsoring_sportif ? this.state.lieu_sponsoring_sportif.label : ''}
                onSuggestSelect={this.handleChangeLieu}
                onSuggestNoResults={this.handleChangeLieu}
              />
            </div>
            <div className="form-group">
              <label>Montant recherché (euros) :</label><br/>
              <NumberInput
                id="num"
                value={this.state.montant_recherche}
                strategy="warn"
                onChange={this.handleOnValidMontantRecherche}/>
            </div>
            <div className="form-group">
              <DatePicker
                floatingLabelText="Date de début de contrat"
                DateTimeFormat={DateTimeFormat}
                defaultDate={this.state.date_depart_sponsoring_sportif}
                okLabel="OK"
                cancelLabel="Annuler"
                locale="fr"
                onChange={this.handleChangeDateDepart}
              />
            </div>
            <div className="form-group">
              <DatePicker
                floatingLabelText="Date de fin"
                DateTimeFormat={DateTimeFormat}
                defaultDate={this.state.date_fin_sponsoring_sportif}
                okLabel="OK"
                cancelLabel="Annuler"
                locale="fr"
                onChange={this.handleChangeDateFin}
              />
            </div>
            <div className="form-group">
              <TextField
                floatingLabelText="Description"
                multiLine={true}
                onChange={this.handleChangeDescription}
                defaultValue={this.state.description_sponsoring_sportif}
              />
            </div>
            <div className="form-group">
              <div
                className="btn block btn--primary type--uppercase"
                onClick={this.handleSubmitModal}
              >
                <span className="btn__text">Enregistrer</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {typeSponsoring} = state;
  return {
    types_sponsoring: typeSponsoring.types_sponsoring,
  };
}

export default connect(mapStateToProps)(ModalAddSponsoringSportif);