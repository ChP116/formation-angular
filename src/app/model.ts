export class Matiere {
    public id: number;
    public titre: string;
    public Duree: number;
    public Objectifs: string;
    public PreRequis: string;
    public Programme: string;

    constructor(id?: number, titre?: string, duree?: number, objectifs?: string, preRequis?: string, programme?: string) {
        this.id = id;
        this.titre = titre;
        this.Duree = duree;
        this.Objectifs = objectifs;
        this.PreRequis = preRequis;
        this.Programme = programme;
    }
}

export class Personne {
    public id: number;
    public PersonneType: string;
    public Civilite: string;
    public nom: string;
    public prenom: string;
    public Email: string;
    public Telephone: string;
    //public AdresseId: number;
    //public Adresse: Adresse;

    constructor(id?: number, civilite?: string, nom?: string, prenom?: string, email?: string, telephone?: string) {
        this.id = id;
        this.Civilite = civilite;
        this.nom = nom;
        this.prenom = prenom;
        this.Email = email
        this.Telephone = telephone;

    }
}

export class Stagiaire extends Personne {
    public DateNaissance: Date;
    public CursusId: number;
    public Cursus: Cursus;
    //public Evaluations: Array<Evaluation>;

    constructor(id?: number, civilite?: string, nom?: string, prenom?: string, email?: string, telephone?: string, dateNaissance?: Date) {
        super(id, civilite, nom, prenom, email, telephone)
        this.DateNaissance = dateNaissance;
    }
}

export class Utilisateur extends Personne {
    public Identifiant: string;
    public MotDePasse: string;
    public Role: string;
    public Formateur: Formateur;

    constructor(id?: number, civilite?: string, nom?: string, prenom?: string, email?: string, telephone?: string, identifiant?: string, motDePasse?: string, role?: string) {
        super(id, civilite, nom, prenom, email, telephone)
        this.Identifiant = identifiant;
        this.MotDePasse = motDePasse;
        this.Role = role;
    }
}

export class Formateur {
    public id: number;
    public externe: boolean;
    //public Modules: Array<Module>;
    public competences: Array<Competence>;
    public UtilisateurId: number;
    public Utilisateur: Utilisateur;

    constructor(id?: number, externe?: boolean) {
        this.id = id;
        this.externe = externe;
    }
}

export class Module {
    public Id: number;
    public Duree: number;
    public DateDebut: Date;
    public DateFin: Date;
    public CursusId: number;
    public Cursus: Cursus;
    public FormateurId: number;
    public Formateur: Formateur;
    public MatiereId: number;
    public Matiere: Matiere;
    public SalleId: number;
    public Salle: Salle;
    public Evaluations: Array<Evaluation>;

    constructor(id?: number, duree?: number, dateDebut?: Date, dateFin?: Date) {
        this.Id = id;
        this.Duree = duree;
        this.DateDebut = dateDebut;
        this.DateFin = dateFin;
    }
}

export class Cursus {
    public id: number;
    public gestionnaireId: number;
    public utilisateur: Utilisateur;
    public intitule: string;
    public dateDebut: string;
    public dateFin: string;
    public stagiaires: Array<Stagiaire> = new Array<Stagiaire>();
    //public Modules: Array<Module>;

    constructor(id?: number, intitule?: string, dateDebut?: string, dateFin?: string) {
        this.id = id;
        this.intitule = intitule;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
    }
}

export class Salle {
    public Id: number;
    public Nom: string;
    public Capacite: number;
    public Virtuel: boolean;
    public Modules: Array<Module>;

    constructor(id?: number, nom?: string, capacite?: number, virtuel?: boolean) {
        this.Id = id;
        this.Nom = nom;
        this.Capacite = capacite;
        this.Virtuel = virtuel;
    }
}

export class Evaluation {
    public Id: number;
    public Note: number;
    public Commentaires: string;
    public StagiaireId: number;
    public Stagiaire: Stagiaire;
    public ModuleId: number;
    public Module: Module;

    constructor(id?: number, note?: number, commentaires?: string) {
        this.Id = id;
        this.Note = note;
        this.Commentaires = commentaires;
    }
}

export class Competence {
    public Id: number;
    public formateurId: number;
    public formateur: Formateur;
    public matiereId: number;
    public matiere: Matiere;

    constructor(id?: number, formateurId?: number, matiereId?: number) {
        this.Id = id;
        this.formateurId = formateurId;
        this.matiereId = matiereId;
    }
}