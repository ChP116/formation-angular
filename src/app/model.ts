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