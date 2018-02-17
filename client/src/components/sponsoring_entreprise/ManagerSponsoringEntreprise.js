/**
 * Created by pierremarsot on 01/03/2017.
 */
import React from 'react';
import RechercheSponsoringEntreprise from './RechercheSponsoringEntreprise';
import AffichageRechercheSponsoringEntreprise from './AffichageRechercheSponsoringEntreprise';

const ManagerSponsoringEntreprise = () => (
  <div id="manager-sponsoring-entreprise">
    <div className=" boxed boxed--lg boxed--border">
      <RechercheSponsoringEntreprise/>
      <AffichageRechercheSponsoringEntreprise/>
    </div>
  </div>
);

export default ManagerSponsoringEntreprise;