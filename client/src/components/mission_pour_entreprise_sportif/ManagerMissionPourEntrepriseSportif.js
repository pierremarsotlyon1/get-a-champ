/**
 * Created by pierremarsot on 04/02/2017.
 */
import React from 'react';
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';

import ManagerMissionProduitImageSportif from '../mission_produit_image_sportif/ManagerMissionProduitImageSportif';
import AffichageContratsMissionEntrepriseSportif from '../contrats_mission_entreprise_sportif/AffichageContratsMissionEntrepriseSportif';
import AddContratMissionEntrepriseSportif from '../contrats_mission_entreprise_sportif/AddContratMissionEntrepriseSportif';

const ManagerMissionPourEntrepriseSportif = () => (
  <section id="manager-mission-entreprise-sportif">
    <div className="row">
      <Tabs>
        <Tab label="Lancement produit / image">
          <ManagerMissionProduitImageSportif/>
        </Tab>
        <Tab label="Contrat de mission">
          <AddContratMissionEntrepriseSportif/>
          <AffichageContratsMissionEntrepriseSportif/>
        </Tab>
      </Tabs>
    </div>
  </section>
);

export default ManagerMissionPourEntrepriseSportif;