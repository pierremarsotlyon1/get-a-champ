/**
 * Created by pierremarsot on 24/03/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import ReactQuill from 'react-quill';
import RaisedButton from 'material-ui/RaisedButton';
import Geosuggest from 'react-geosuggest';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import SortableList from '../list/SortableList';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import {ListItem} from 'material-ui/List';
import {arrayMove} from 'react-sortable-hoc';
import Checkbox from 'material-ui/Checkbox';
import ManagerGeosuggest from '../../utils/ManagerGeosuggest';

import '../../assets/styles/react-quill-snow.css';
import '../../assets/geosuggest/geosuggest.css';

import {
  search_metier,
} from '../../actions/metier';

import {
  load_types_contrat
} from '../../actions/type_contrat';

import {
  load_niveaux_etude
} from '../../actions/niveau_etude';

import {
  load_dimensions_sportives
} from '../../actions/dimension_sportive';

import {
  add_offre_emploi_entreprise
} from '../../actions/offre_emploi_entreprise';

import {
  load_salaires
} from '../../actions/salaire';

class AddOrUpdateOffreEmploiEntreprise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_poste: 0,
      lieu_poste: undefined,
      id_niveau_etude: '',
      id_salaire: '',
      description_offre: '',
      mission: '',
      prerequis: '',
      matcher_sportif: false,
      chasser_tete: false,
      diffuser: false,
      recherche_confidentielle: false,
      sortable_dimensions_sportives: [],
    };
  }

  componentDidMount() {
    const {
      types_contrat,
      niveaux_etude,
      dimensions_sportives,
      salaires,
    } = this.props;

    if (!types_contrat || types_contrat.length === 0) {
      this.props.dispatch(load_types_contrat());
    }

    if (!niveaux_etude || niveaux_etude.length === 0) {
      this.props.dispatch(load_niveaux_etude());
    }

    if (!dimensions_sportives || dimensions_sportives.length === 0) {
      this.props.dispatch(load_dimensions_sportives());
    }

    if (!salaires || salaires.length === 0) {
      this.props.dispatch(load_salaires());
    }
  }

  handleChangeChoixDimensionSportive = (event, index, value) => {
    const {
      dimensions_sportives
    } = this.props;

    const {
      sortable_dimensions_sportives
    } = this.state;

    if (value && sortable_dimensions_sportives.length < 5) {

      //On regarde si on ne l'a pas déjà ajouté
      for (const dimension of sortable_dimensions_sportives) {
        if (!dimension || !dimension.key) {
          continue;
        }

        if (dimension.key === value) {
          return false;
        }
      }

      for (const dimension of dimensions_sportives) {
        if (!dimension || !dimension._id) {
          continue;
        }

        if (dimension._id === value) {
          sortable_dimensions_sportives.push({
            key: dimension._id,
            value: <ListItem
              rightIconButton={
                <IconButton
                  tooltip="Supprimer"
                  touch={true}
                  tooltipPosition="top-left"
                  onTouchTap={(e) => this.removeDimensionIntoSortable(e, dimension._id)}
                >
                  <ActionDelete/>
                </IconButton>
              }
              primaryText={dimension._source.nom_dimension_sportive}
              secondaryText={
                <p>
                  {dimension._source.description_dimension_sportive}
                </p>
              }
              secondaryTextLines={2}
            />
          });

          this.setState({
            sortable_dimensions_sportives: sortable_dimensions_sportives,
          });
          break;
        }
      }
    }
  };

  removeDimensionIntoSortable = (e, id_dimension) => {
    e.preventDefault();
    e.stopPropagation();
    const new_sortable_dimensions_sportives = this.state.sortable_dimensions_sportives.filter((item) => {
      if (!item || !item.key) {
        return false;
      }

      return item.key !== id_dimension;
    });


    this.setState({
      sortable_dimensions_sportives: new_sortable_dimensions_sportives,
    });
  };

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      sortable_dimensions_sportives: arrayMove(this.state.sortable_dimensions_sportives, oldIndex, newIndex),
    });
  };

  handleChange(value) {
    this.setState({text: value})
  }

  handleChangeTitrePoste = (metier) => {
    this.props.dispatch(search_metier(metier));
  };

  handleSaveTitrePoste = (metier) => {
    let {id_poste} = this.state;

    if (metier && metier.value && metier.text) {
      id_poste = metier.value;
    }
    else {
      id_poste = 0;
    }

    this.setState({
      id_poste: id_poste,
    });
  };

  changeLieuPoste = (geosuggest) => {
    geosuggest = ManagerGeosuggest.extractDataGeosuggest(geosuggest);

    this.setState({
      lieu_poste: geosuggest ? geosuggest : undefined
    });
  };

  handleChangeNiveauEtude = (event, index, id_niveau_etude) => {
    this.setState({
      id_niveau_etude: id_niveau_etude,
    });
  };

  handleChangeSalaire = (event, index, id_salaire) => {
    this.setState({
      id_salaire: id_salaire
    });
  };

  handleDescriptionOffre = (description_offre) => {
    this.setState({
      description_offre: description_offre
    });
  };

  handleMissionOffre = (mission) => {
    this.setState({
      mission: mission
    });
  };

  handlePrerequisOffre = (prerequis) => {
    this.setState({
      prerequis: prerequis
    });
  };

  handleMatcherSportif = (event, matcher_sportif) => {
    this.setState({
      matcher_sportif: matcher_sportif,
    });
  };

  handleRechercheConfidentielle = (event, recherche_confidentielle) => {
    this.setState({
      recherche_confidentielle: recherche_confidentielle,
    });
  };

  handleChasserTete = (event, chasser_tete) => {
    this.setState({
      chasser_tete: chasser_tete,
    });
  };

  handleDiffuser = (event, diffuser) => {
    this.setState({
      diffuser: diffuser,
    });
  };

  handleAddOffreEmploi = () => {

    const {
      id_poste,
      lieu_poste,
      id_niveau_etude,
      id_salaire,
      description_offre,
      mission,
      prerequis,
      matcher_sportif,
      chasser_tete,
      diffuser,
      sortable_dimensions_sportives,
      recherche_confidentielle,
    } = this.state;

    //On récup les id des dimensions sportives retenues
    let ids_dimensions_sportives = [];
    for (const dimension of sortable_dimensions_sportives) {
      if (!dimension || !dimension.key) {
        continue;
      }

      ids_dimensions_sportives.push(dimension.key);
    }

    this.props.dispatch(add_offre_emploi_entreprise(
      id_poste,
      lieu_poste,
      id_niveau_etude,
      id_salaire,
      description_offre,
      mission,
      prerequis,
      matcher_sportif,
      chasser_tete,
      diffuser,
      ids_dimensions_sportives,
      recherche_confidentielle,
    ));
  };

  render() {
    const {
      search_metier,
      niveaux_etude,
      types_contrat,
      dimensions_sportives,
      salaires,
    } = this.props;

    const {
      id_niveau_etude,
      id_salaire,
      description_offre,
      mission,
      prerequis,
      sortable_dimensions_sportives,
      matcher_sportif,
      chasser_tete,
      diffuser,
      recherche_confidentielle,
    } = this.state;

    let metiers = [];
    let niveaux_etude_local = [];
    let types_contrat_local = [];
    let dimensions_sportives_local = [];
    let salaires_local = [];

    for (const metier of search_metier) {
      metiers.push({
        value: metier._id,
        text: metier._source.libelle_metier,
      });
    }

    for (const niv_etude of niveaux_etude) {
      if (!niv_etude._source || !niv_etude) {
        continue;
      }

      niveaux_etude_local.push(
        <MenuItem key={niv_etude._id} value={niv_etude._id} primaryText={niv_etude._source.nom_niveau_formation}/>
      );
    }

    for (const t_contrat of types_contrat) {
      if (!t_contrat._source || !t_contrat) {
        continue;
      }

      types_contrat_local.push(
        <MenuItem key={t_contrat._id} value={t_contrat._id} primaryText={t_contrat._source.nom_type_contrat_travail}/>
      );
    }


    for (const dim_sportive of dimensions_sportives) {
      if (!dim_sportive._source || !dim_sportive) {
        continue;
      }

      dimensions_sportives_local.push(
        <MenuItem key={dim_sportive._id} value={dim_sportive._id}
                  primaryText={dim_sportive._source.nom_dimension_sportive}/>
      );
    }

    for (const salaire of salaires) {
      if (!salaire || !salaire._source) {
        continue;
      }

      salaires_local.push(
        <MenuItem key={salaire._id} value={salaire._id} primaryText={salaire._source.tranche_salaire}/>
      );
    }

    return (
      <div id="add-offre-emploi-entreprise">
        <div className="col-md-12">
          <div className=" boxed boxed--lg boxed--border">
            <div className="panel panel-bordered">
              <h4>Ajouter une offre d'emploi</h4>
              <div className="panel-body">
                <div className="form-group">
                  <AutoComplete
                    floatingLabelText="Titre du poste à pourvoir"
                    hintText="2 lettres minimum"
                    filter={AutoComplete.noFilter}
                    dataSource={metiers}
                    onUpdateInput={this.handleChangeTitrePoste}
                    onNewRequest={this.handleSaveTitrePoste}
                    fullWidth={true}
                  />
                </div>
                <div className="form-group">
                  <label>Lieu du poste :</label>
                  <Geosuggest
                    placeholder="Lieu du poste"
                    onSuggestSelect={this.changeLieuPoste}
                    onSuggestNoResults={this.changeLieuPoste}
                  />
                </div>

                <div className="form-group">
                  <SelectField
                    floatingLabelText="Niveau d'études"
                    hintText="Niveau d'étude"
                    value={id_niveau_etude}
                    onChange={this.handleChangeNiveauEtude}
                    fullWidth={true}
                  >
                    {niveaux_etude_local}
                  </SelectField>
                </div>

                <div className="form-group">
                  <SelectField
                    floatingLabelText="Tranche de salaire"
                    hintText="Tranche de salaire"
                    value={id_salaire}
                    onChange={this.handleChangeSalaire}
                    fullWidth={true}
                  >
                    {salaires_local}
                  </SelectField>
                </div>

                <h4 className="panel-title">Description du poste à pourvoir</h4>
                <ReactQuill
                  value={description_offre}
                  onChange={this.handleDescriptionOffre}
                  theme="snow"
                />

                <h4 className="panel-title">Principales missions du poste</h4>
                <ReactQuill
                  value={mission}
                  onChange={this.handleMissionOffre}
                  theme="snow"
                />

                <h4 className="panel-title">Expérience</h4>
                <ReactQuill
                  value={prerequis}
                  onChange={this.handlePrerequisOffre}
                  theme="snow"
                />

                <div className="row margin-top-40">
                  <div className="col-md-12">
                    <h4>Profil: indiquez les 5 dimensions essentielles à ce poste</h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <SelectField
                      floatingLabelText="Dimensions sportives"
                      onChange={this.handleChangeChoixDimensionSportive}
                    >
                      {dimensions_sportives_local}
                    </SelectField>
                  </div>
                  <div className="col-md-8">
                    <SortableList
                      items={sortable_dimensions_sportives}
                      onSortEnd={this.onSortEnd}
                    />
                  </div>
                </div>

                <div className="form-group margin-top-40">
                  <Checkbox
                    label="Est-ce une recherche confidentielle ?"
                    checked={recherche_confidentielle}
                    onCheck={this.handleRechercheConfidentielle}
                  />
                </div>

                <form className="form-inline margin-top-30">
                  <h4>Modalité de recherche :</h4>
                  <div className="row">
                    <div className="col-md-3">
                      <Checkbox
                        label="Matching candidats"
                        checked={matcher_sportif}
                        onCheck={this.handleMatcherSportif}
                      />
                    </div>
                    <div className=" col-md-3">
                      <Checkbox
                        label="Approche directe"
                        checked={chasser_tete}
                        onCheck={this.handleChasserTete}
                      />
                    </div>
                    <div className="col-md-3">
                      <Checkbox
                        label="Diffuser mon annonce"
                        checked={diffuser}
                        onCheck={this.handleDiffuser}
                      />
                    </div>
                  </div>
                </form>

                <div className="margin-top-30">
                  <p className="btn btn--primary type--uppercase" onClick={this.handleAddOffreEmploi}>
                    <span className="btn__text">
                      Enregistrer
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
  const {metier, typeContrat, niveauxEtude, dimensionSportive, salaire} = state;
  return {
    search_metier: metier.search_metier,
    types_contrat: typeContrat.types_contrat,
    niveaux_etude: niveauxEtude.niveaux_etude,
    dimensions_sportives: dimensionSportive.dimensions_sportives,
    salaires: salaire.salaires,
  };
}

export default connect(mapStateToProps)(AddOrUpdateOffreEmploiEntreprise);