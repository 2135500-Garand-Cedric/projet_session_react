import axios from "axios";
import { useEffect, useState } from "react";
import { IEtudiant } from "../models/Etudiant";
import ListeEtudiants from "./listeEtudiants.component";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

const PagePrincipale = () => {
  const [etudiants, setEtudiants] = useState<IEtudiant[]>([])
  useEffect(() => {
    axios.get('http://127.0.0.1:3000/etudiants/').then((response) => {
        setEtudiants(response.data.etudiants)
        console.log(response.data.etudiants)
    });
  }, []);
  
  return (
    <>
      <h1><FormattedMessage id="pageprincipale.titre" defaultMessage="Page Principale"/></h1>
      <ListeEtudiants etudiants={etudiants} />
      <div className="conteneur">
        <Link to={'/ajoutEtudiant'} className="bouton">
          <FormattedMessage id="bouton.ajouteretudiant" defaultMessage="Ajouter un etudiant"/>
        </Link>
      </div>
    </>
  );
}

export default PagePrincipale;