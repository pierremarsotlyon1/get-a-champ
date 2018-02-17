/**
 * Created by pierremarsot on 23/02/2017.
 */
import React from 'react';
import AffichageContratsMissionEntrepriseSportif from '../../../../../components/contrats_mission_entreprise_sportif/AffichageContratsMissionEntrepriseSportif';
import AddContratMissionEntrepriseSportif from '../../../../../components/contrats_mission_entreprise_sportif/AddContratMissionEntrepriseSportif';

const ManagerContratMissionEntreprise = () =>
  (
    <div>
      <AddContratMissionEntrepriseSportif/>
      <AffichageContratsMissionEntrepriseSportif/>
    </div>
  );

export default ManagerContratMissionEntreprise;