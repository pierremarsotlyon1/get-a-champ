/**
 * Created by pierremarsot on 01/03/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import NumberInput from 'material-ui-number-input';
import '../../assets/geosuggest/geosuggest.css';
import {defineDateTimeFormat} from '../../utils/DatePicker';

const DateTimeFormat = defineDateTimeFormat();

import {
  load_type_sponsoring,
} from '../../actions/type_sponsoring';

import {
  search_sponsoring,
} from '../../actions/search_sponsoring';

class RechercheSponsoringEntreprise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  handleSearch = () => {
    const {
      date_depart_sponsoring_sportif,
      date_fin_sponsoring_sportif,
      type_sponsoring,
      montant_recherche,
    } = this.state;

    this.props.dispatch(search_sponsoring(
      type_sponsoring,
      montant_recherche,
      date_depart_sponsoring_sportif,
      date_fin_sponsoring_sportif,
    ));
  };

  render() {
    const {
      types_sponsoring
    } = this.props;

    let types_sponsoring_local = [];
    for (const type_sponsoring of types_sponsoring) {
      types_sponsoring_local.push(
        <MenuItem key={type_sponsoring._id} value={type_sponsoring._id}
                  primaryText={type_sponsoring._source.nom_type_sponsoring}/>
      );
    }

    return (
      <div className="col-md-3">
        <div className=" boxed boxed--lg boxed--border">
          <div className="panel">
            <div className="panel-heading">
              <h3 className="panel-title">Rechercher un sponsoring</h3>
            </div>
            <div className="panel-body">
              <div className="form-group form-material row">
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
                  <label>Budget alloué (euros) :</label>
                  <br/>
                  <NumberInput
                    id="num"
                    value={this.state.montant_recherche}
                    strategy="warn"
                    onChange={this.handleOnValidMontantRecherche}/>
                </div>
                <div className="form-group">
                  <DatePicker
                    floatingLabelText="Date de départ"
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
                <div className="form-group text-center">
                  <p className="btn btn--primary type--uppercase" onClick={this.handleSearch}>
                    <span className="btn__text">
                      Rechercher
                    </span>
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
  const {typeSponsoring} = state;
  return {
    types_sponsoring: typeSponsoring.types_sponsoring,
  };
}

export default connect(mapStateToProps)(RechercheSponsoringEntreprise);