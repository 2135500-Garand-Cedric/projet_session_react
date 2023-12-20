import { useEffect, useState } from "react";
import { IEtudiant } from "../models/Etudiant";
import axios from "axios";
import ListeEtudiants from "./listeEtudiants.component";
import { FormattedMessage, FormattedNumber } from "react-intl";


const PageVulkins = () => {
  const [etudiants, setEtudiants] = useState<IEtudiant[]>([])
  const [pourcentageVulkins, setPourcentageVulkins] = useState<number>(0)
  useEffect(() => {
    axios.get('http://127.0.0.1:3000/stats/pourcentage').then((response) => {
      setPourcentageVulkins(Math.round(response.data.pourcentageVulkins))
      console.log(response.data.pourcentageVulkins)
    });
    axios.get('http://127.0.0.1:3000/etudiants/vulkins/all').then((response) => {
      setEtudiants(response.data.etudiants)
      console.log(response.data.etudiants)
    });
  }, []);
  
  return (
    <>
      <h1><FormattedMessage id="pagevulkins.titre" defaultMessage="Page Vulkins"/></h1>
      <h2>
        <FormattedMessage id="pagevulkins.pourcentagevulkins" defaultMessage="Pourcentage vulkins: " />
        <FormattedNumber value={pourcentageVulkins/100} style="percent" />
      </h2>
      <ListeEtudiants etudiants={etudiants} />
    </>
  );
}

export default PageVulkins;