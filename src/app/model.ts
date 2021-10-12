export class Matiere {
    public Id: number;
    public Titre: string;
    public Duree: number;
    public Objectifs: string;
    public PreRequis: string;
    public Programme: string;

    constructor(id?: number, titre?: string, duree?: number, objectifs?: string, preRequis?: string, programme?: string) {
        this.Id = id;
        this.Titre = titre;
        this.Duree = duree;
        this.Objectifs = objectifs;
        this.PreRequis = preRequis;
        this.Programme = programme;
    }
}

export class Personne {
    public Id: number;
    public PersonneType: string;
    public Civilite: string;
    public Nom: string;
    public Prenom: string;
    public Email: string;
    public Telephone: string;
    //public AdresseId: number;
    //public Adresse: Adresse;

    constructor(id?: number, civilite?: string, nom?: string, prenom?: string, email?: string, telephone?: string) {
        this.Id = id;
        this.Civilite = civilite;
        this.Nom = nom;
        this.Prenom = prenom;
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
    public Id: number;
    public Externe: boolean;
    //public Modules: Array<Module>;
    public Competences: Array<Competence>;
    public UtilisateurId: number;
    public Utilisateur: Utilisateur;

    constructor(id?: number, externe?: boolean) {
        this.Id = id;
        this.Externe = externe;
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
    public Id: number;
    public GestionnaireId: number;
    public Utilisateur: Utilisateur;
    public Intitule: string;
    public DateDebut: string;
    public DateFin: string;
    public Stagiaires: Array<Stagiaire> = new Array<Stagiaire>();
    //public Modules: Array<Module>;

    constructor(id?: number, intitule?: string, dateDebut?: string, dateFin?: string) {
        this.Id = id;
        this.Intitule = intitule;
        this.DateDebut = dateDebut;
        this.DateFin = dateFin;
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
    public FormateurId: number;
    public Formateur: Formateur;
    public MatiereId: number;
    public Matiere: Matiere;

    constructor(id?: number, formateurId?: number, matiereId?: number) {
        this.Id = id;
        this.FormateurId = formateurId;
        this.MatiereId = matiereId;
    }
}