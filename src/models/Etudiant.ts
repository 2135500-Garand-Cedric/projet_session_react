export interface IMoyenneEtudiant {
    _id: string;
    cours: IMoyenneCours[];
}

export interface IMoyenneCours {
    nom: string;
    moyenne: number;
}

export interface IPourcentage {
    pourcentage: number;
}

export interface IEtudiant {
    nom: string;
    courriel: string;
    dateNaissance: Date;
    da: string;
    estVulkins: boolean;
    anneeEtude: number;
    nomCohorte: string;
    cours: ICours[];
    _id?: string;
}

export interface ICours {
    nom: string;
    enseignant: string;
    nombreHeures: number;
    estGratuit: boolean;
    cout?: number;
    notes: number[];
}