import { useState } from "react";
import { IEtudiant } from "../models/Etudiant";
import axios from "axios";
import ListeEtudiants from "./listeEtudiants.component";
import { FormattedMessage } from "react-intl";


const PageCohortes = () => {
  const nomCohortesPossibles: string[] = ['chats_vaillants', 'chevaux_curieux', 'baleines_bossues'];
  const [cohorteSelectionnee, setCohorteSelectionnee] = useState<boolean>(false)
  const [nomCohorteAffichee, setTitre] = useState<string>("")
  const [etudiants, setEtudiants] = useState<IEtudiant[]>([])

  const clickCours = (e: any) => {
    const nomCohorte: string = e.target.id
    setTitre(nomCohorte)
    setCohorteSelectionnee(true)
    axios.get('http://127.0.0.1:3000/etudiants/cohorte/' + nomCohorte).then((response) => {
      setEtudiants(response.data.etudiants)
    });
  }
  
  return (
    <>
      {!cohorteSelectionnee &&
        <h1><FormattedMessage id="pagecohortes.titre" defaultMessage="Liste des cohortes"/></h1>
      }
      <h1>{nomCohorteAffichee}</h1>
      {!cohorteSelectionnee ? (
        nomCohortesPossibles.map((nom, index) => (
          <button key={index} className="pastille-cours" onClick={clickCours} id={nom}>{nom}</button>
        ))
        ) : (
          <ListeEtudiants etudiants={etudiants} />
        )
      }
    </>
  );
}

export default PageCohortes;