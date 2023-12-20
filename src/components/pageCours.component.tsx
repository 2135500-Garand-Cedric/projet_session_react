import axios from "axios";
import { useEffect, useState } from "react";
import { IEtudiant } from "../models/Etudiant";
import '../styles/pageCours.styles.css'
import ListeEtudiants from "./listeEtudiants.component";
import { FormattedMessage } from "react-intl";


const PageCours = () => {
  const nomCoursPossibles: string[] = ['Informatique', 'Philo', 'Chimie', 'Histoire', 'Anglais', 'Math'];
  const [nomCoursAffiche, setTitre] = useState<string>("")
  const [coursSelectionne, setCoursSelectionne] = useState<boolean>(false)
  const [etudiants, setEtudiants] = useState<IEtudiant[]>([])

  const clickCours = (e: any) => {
    const nomCours: string = e.target.id
    setTitre(nomCours)
    setCoursSelectionne(true)
    axios.get('http://127.0.0.1:3000/etudiants/cours/' + nomCours).then((response) => {
      setEtudiants(response.data.etudiants)
    });
  }
  
  return (
    <>
      {!coursSelectionne &&
        <h1><FormattedMessage id="pagecours.titre" defaultMessage="Liste des cours"/></h1>
      }
      <h1>{nomCoursAffiche}</h1>
      {!coursSelectionne ? (
        nomCoursPossibles.map((nom, index) => (
          <button onClick={clickCours} id={nom} key={index} className="pastille-cours">{nom}</button>
        ))
        ): (
          <ListeEtudiants etudiants={etudiants} />
        )
      }
    </>
  );
}

export default PageCours;