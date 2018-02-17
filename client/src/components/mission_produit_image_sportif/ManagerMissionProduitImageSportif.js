/**
 * Created by pierremarsot on 04/02/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

import {
  load_settings_lancement_produit_promotion_image_sportif,
  change_promouvoir_lancement_produit_promotionImage,
  update_settings_lancement_produit_promotion_image_image_sportif,
} from '../../actions/mission_produit_image_sportif';

class ManagerMissionProduitImageSportif extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      promotionProduit: false,
      promotionImage: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(load_settings_lancement_produit_promotion_image_sportif());
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      promotionProduit: nextProps.promotionProduit,
      promotionImage: nextProps.promotionImage,
    });
  }

  handlePromotionProduit = (event, isInputChecked) => {
    this.setState({
      promotionProduit: isInputChecked,
    });
  };

  handlePromotionImage = (event, isInputChecked) => {
    this.setState({
      promotionImage: isInputChecked,
    });
  };

  handleUpdateMissionProduitImageSportif = () => {
    const {
      promotionProduit,
      promotionImage,
    } = this.state;

    this.props.dispatch(update_settings_lancement_produit_promotion_image_image_sportif(promotionProduit, promotionImage));
  };

  render() {
    const {
      promotionProduit,
      promotionImage,
    } = this.state;

    return (
      <div id="manager-mission-produit-image-sportif">
        <div className="col-md-12">
          <div className="boxed boxed--md boxed--border">
            <div className="form-group">
              <Checkbox
                label="Vous voulez promouvoir un produit ?"
                onCheck={this.handlePromotionProduit}
                checked={promotionProduit}
              />

              <Checkbox
                label="Vous voulez promouvoir l’image d’une entreprise ?"
                onCheck={this.handlePromotionImage}
                checked={promotionImage}
              />

              <RaisedButton label="Modifier" primary={true}
                            onTouchTap={this.handleUpdateMissionProduitImageSportif}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {missionProduitImageSportif} = state;
  return {
    promotionProduit: missionProduitImageSportif.promotionProduit,
    promotionImage: missionProduitImageSportif.promotionImage,
  };
}

export default connect(mapStateToProps)(ManagerMissionProduitImageSportif);