import { Link } from "react-router-dom";
import { IEtudiant } from "../models/Etudiant";
import '../styles/listeEtudiants.styles.css'
import axios from "axios";
import { useState } from "react";
import '../styles/ajoutCours.styles.css'
import { FormattedMessage } from "react-intl";


const AjoutEtudiant = () => {
    const nomCohortesPossibles: string[] = ['chats_vaillants', 'chevaux_curieux', 'baleines_bossues'];
    const [nom, setNom] = useState<string>("")
    const [courriel, setCourriel] = useState<string>("")
    const [dateNaissance, setDateNaissance] = useState<Date>(new Date())
    const [da, setDa] = useState<string>("")
    const [estVulkins, setEstVulkins] = useState<boolean>(false)
    const [anneeEtude, setAnneeEtude] = useState<number>(0)
    const [nomCohorte, setNomCohorte] = useState<string>(nomCohortesPossibles[0])

    const enregistrerEtudiant = async () => {
        if (nom == "" || courriel == "" || da == "") return
        if (!/^.+@.+\..+$/.test(courriel)) return
        if (!/^[0-9]{7}$/.test(da)) return
        const etudiant: IEtudiant = {
            nom: nom,
            courriel: courriel,
            dateNaissance: dateNaissance,
            da: da,
            estVulkins: estVulkins,
            anneeEtude: anneeEtude,
            nomCohorte: nomCohorte,
            cours: []
        }

        console.log(etudiant)
        axios.post('http://127.0.0.1:3000/etudiants/add', {etudiant}).then((response) => {
            console.log(response.data)
        });
        console.log("enregistrer")
    }
    const changementNomCohorte = (e: any) => {
        const nouveauNomCohorte: string = e.target.value
        if (nomCohortesPossibles.some(nomCohortePossible => nouveauNomCohorte === nomCohortePossible)) {
            setNomCohorte(e.target.value)
        }
    }
    const changementNom = (e: any) => {
        setNom(e.target.value)
    }
    const changementCourriel = (e: any) => {
        setCourriel(e.target.value)
    }
    const changementDateNaissance = (e: any) => {
        setDateNaissance(e.target.value)
    }
    const changementEstVulkins = (e: any) => {
        setEstVulkins(e.target.checked)
    }
    const changementAnneeEtude = (e: any) => {
        if (!Number.isNaN(+e.target.value)) {
            if (+e.target.value <= 0) {
                setAnneeEtude(0)
            } else {
                setAnneeEtude(+e.target.value)
            }
        }
    }
    const changementDa = (e: any) => {
        if (!Number.isNaN(+e.target.value)) {
            if (e.target.value.length <= 7) {
                setDa(e.target.value)
            }
        }
    }

    return (
        <>
            <h1><FormattedMessage id="pageajoutetudiant.titre" defaultMessage="Ajouter un étudiant"/></h1>
            <form>
                <label>
                    <FormattedMessage id="formulaire.cohorte" defaultMessage="Cohorte:"/>
                    <select onChange={changementNomCohorte}>
                        {nomCohortesPossibles.map((nom, index) => (
                            <option value={nom} key={index}>{nom}</option>
                        ))}
                    </select>     
                </label>
                <label>
                    <FormattedMessage id="formulaire.nom" defaultMessage="Nom:"/>
                    <input type="text" onChange={changementNom} value={nom}/>        
                </label>
                <label>
                    <FormattedMessage id="formulaire.courriel" defaultMessage="Courriel:"/>
                    <input type="text" onChange={changementCourriel} value={courriel}/>
                </label>
                <label>
                    <FormattedMessage id="formulaire.datenaissance" defaultMessage="Date de naissance:"/>
                    <input type="date" onChange={changementDateNaissance} />
                </label>
                <label>
                    <FormattedMessage id="formulaire.estvulkins" defaultMessage="Est un Vulkins:"/>
                    <input type="checkbox" onChange={changementEstVulkins} checked={estVulkins}/>
                </label>
                <label>
                    <FormattedMessage id="formulaire.anneeetude" defaultMessage="Année d'étude:"/>
                    <input type="text" onChange={changementAnneeEtude} value={anneeEtude}/>
                </label>
                <label>
                    <FormattedMessage id="formulaire.da" defaultMessage="Da:"/>
                    <input type="text" onChange={changementDa} value={da}/>
                </label>
                <Link onClick={enregistrerEtudiant} to={'/'}>
                    <FormattedMessage id="bouton.enregistrer" defaultMessage="Enregistrer"/>
                </Link>
            </form>
        </>
    );
}

export default AjoutEtudiant;