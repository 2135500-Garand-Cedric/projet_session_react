import { Link, useParams } from "react-router-dom";
import { IEtudiant } from "../models/Etudiant";
import '../styles/listeEtudiants.styles.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

const AjoutNote = () => {
    const { cours, id } = useParams();
    const [etudiant, setEtudiant] = useState<IEtudiant>()
    const [note, setNote] = useState<number>(0)

    useEffect(() => {
        axios.get('http://127.0.0.1:3000/etudiants/' + id).then((response) => {
            setEtudiant(response.data.etudiant)
        });
    }, []);

    const enregistrerNote = async () => {
        var indexCours: number = -1
        etudiant?.cours.forEach((coursEtudiant, index) => {
            if (coursEtudiant.nom == cours) {
                indexCours = index
            }
        })
        if (indexCours != -1) {
            etudiant?.cours[indexCours].notes.push(+note)
            await axios.put('http://127.0.0.1:3000/etudiants/update', {etudiant}).then(() => {});
        }
    }

    const changementNote = (e: any) => {
        if (!Number.isNaN(+e.target.value)) {
            if (+e.target.value >= 100) {
                setNote(100)
            } else if (+e.target.value <= 0) {
                setNote(0)
            } else {
                setNote(+e.target.value)
            }
        }
    }

    return (
        <>
            <h1><FormattedMessage id="pageajoutnote.titre" defaultMessage="Ajouter une note"/></h1>
            <h2>{cours}</h2>
            <h2>{etudiant?.nom}</h2>
            <form>
                <label>
                    <FormattedMessage id="formulaire.nouvellenote" defaultMessage="Nouvelle note:"/>
                    <input type="text" onChange={changementNote} value={note}/>        
                </label>
                <Link onClick={enregistrerNote} to={`/etudiant/${id}`} >
                    <FormattedMessage id="bouton.enregistrer" defaultMessage="Enregistrer"/>
                </Link>
            </form>
        </>
    );
}

export default AjoutNote;