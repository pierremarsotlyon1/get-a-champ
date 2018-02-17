import React from 'react';
import AffichageDiplomeSportif from './AffichageDiplomeSportif';
import ModalAddDiplomeSportif from './ModalAddDiplomeSportif';

const ManagerDiplomeSportif = () => {
  return (
    <section id="manager-diplome-sportif">
      <ModalAddDiplomeSportif/>
      <AffichageDiplomeSportif/>
    </section>
  )
};

export default ManagerDiplomeSportif;