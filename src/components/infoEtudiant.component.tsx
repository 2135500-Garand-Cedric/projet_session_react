import { useParams } from "react-router-dom";
import { IEtudiant, IMoyenneEtudiant } from "../models/Etudiant";
import '../styles/infoEtudiant.styles.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage, FormattedNumber } from "react-intl";

const InfoEtudiant = () => {
    const [etudiant, setEtudiant] = useState<IEtudiant>()
    const [age, setAge] = useState<number>(0)
    const [nombreHeureCours, setNombreHeuresCours] = useState<number>(0)
    const [moyennesCours, setMoyennesCours] = useState<IMoyenneEtudiant>()
    const { id } = useParams();
    useEffect(() => {
        axios.get('http://127.0.0.1:3000/etudiants/' + id).then((response) => {
            if (response.data.etudiant.cours.length != 0) {
                axios.get('http://127.0.0.1:3000/stats/moyenne/' + response.data.etudiant.nom).then((response) => {
                    setMoyennesCours(response.data)
                    console.log(response.data)
                });
            }
            setEtudiant(response.data.etudiant)
            setAge(response.data.etudiant.age)
            setNombreHeuresCours(response.data.etudiant.nombreHeuresTotalCours)
        });
    }, []);

    const supprimerEtudiant = async () => {
        await axios.delete('http://127.0.0.1:3000/etudiants/delete/' + id).then((response) => {});
    }
    
    return (
        <div className="zone">
            <h1 className="titre">{etudiant?.nom} - {age}
                <FormattedMessage id="info.age" defaultMessage=" ans"/>
            </h1>
            <div className="conteneur">
                <div className="element">
                    <FormattedMessage id="formulaire.courriel" defaultMessage="Courriel:"/>
                </div>
                <div className="element">{etudiant?.courriel}</div>
            </div>
            <div className="conteneur">
                <div className="element">
                    <FormattedMessage id="formulaire.da" defaultMessage="Da:"/>
                </div>
                <div className="element">{etudiant?.da}</div>
            </div>
            <div className="conteneur">
                <div className="element">
                    <FormattedMessage id="formulaire.anneeetude" defaultMessage="Année d'étude:"/>
                </div>
                <div className="element">{etudiant?.anneeEtude}</div>
            </div>
            <div className="conteneur">
                <div className="element">
                    <FormattedMessage id="formulaire.cohorte" defaultMessage="Cohorte:"/>
                </div>
                <div className="element">{etudiant?.nomCohorte}</div>
            </div>
            <div className="conteneur">
                {etudiant?.estVulkins ? (
                    <div className="element">
                        <FormattedMessage id="info.estvulkins" defaultMessage="Est dans les Vulkins"/>
                    </div>
                ): (
                    <div className="element">
                        <FormattedMessage id="info.estpasvulkins" defaultMessage="N'est pas dans les Vulkins"/>
                    </div>
                )}
            </div>
            <div className="conteneur">
                <div className="element">
                    <FormattedMessage id="formulaire.nombreheurecours" defaultMessage="Nombre d'heures de cours:"/>
                </div>
                <div className="element">{nombreHeureCours}h</div>
            </div>
            <div className="conteneur">
                <Link onClick={supprimerEtudiant} to={'/'} className="bouton">
                    <FormattedMessage id="bouton.supprimeretudiant" defaultMessage="Supprimer l'étudiant"/>
                </Link>
            </div>
            {etudiant?.cours.length != 0 &&
                <h2>
                    <FormattedMessage id="onglet.cours" defaultMessage="Cours"/>
                </h2>
            }
            {etudiant?.cours.map((coursEtudiant, index) => (
                <div key={index} className="cours">
                    <div>{coursEtudiant.nom}</div>
                    <div>
                        <FormattedMessage id="formulaire.moyenne" defaultMessage="Moyenne: "/>
                        <FormattedNumber value={Math.round(moyennesCours?.cours[index].moyenne || 0)/100} style="percent" />
                    </div>
                    <Link to={`/ajoutNote/${coursEtudiant.nom}/${id}`}>
                        <FormattedMessage id="bouton.ajouternote" defaultMessage="Ajouter une note"/>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default InfoEtudiant;