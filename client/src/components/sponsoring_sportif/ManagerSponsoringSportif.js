/**
 * Created by pierremarsot on 10/02/2017.
 */
import React from 'react';
import AffichageSponsoringSportif from './AffichageSponsoringSportif';
import ModalAddSponsoringSportif from './ModalAddSponsoringSportif';

const ManagerSponsoringSportif = () =>
  (
    <div className="sponsorings-sportif">
      <div className="row">
        <div className="pull-right">
          <ModalAddSponsoringSportif/>
        </div>
        <AffichageSponsoringSportif/>
      </div>
    </div>
  );

export default ManagerSponsoringSportif;