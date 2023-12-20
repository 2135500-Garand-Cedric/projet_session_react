import { Link } from "react-router-dom";
import { IEtudiant } from "../models/Etudiant";
import '../styles/listeEtudiants.styles.css'

interface IListeEtudiantsProps {
    etudiants: IEtudiant[];
}

const ListeEtudiants = (props: IListeEtudiantsProps) => {
    return (
        <>
            <div className="conteneurEtudiant">
                {props.etudiants.map((etudiant, index) => (
                    <Link key={index} to={`/etudiant/${etudiant._id}`} className="etudiant">{etudiant.nom}</Link>
                ))}
            </div>
        </>
    );
}

export default ListeEtudiants;