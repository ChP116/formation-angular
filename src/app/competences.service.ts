import { Injectable } from '@angular/core';
import { MatiereService } from './matieres/matiere.service';
import { Competence } from './model';

@Injectable({
  providedIn: 'root'
})
export class CompetencesService {

  competences: Array<Competence> = new Array<Competence>();


  constructor(private matieresService: MatiereService) {

    let competence1: Competence = new Competence(1, 1, 1);
    competence1.Matiere = (matieresService.find(1));
    this.competences.push(competence1);
    let competence2: Competence = new Competence(2, 1, 3);
    competence2.Matiere = (matieresService.find(3));
    this.competences.push(competence2);
    let competence3: Competence = new Competence(3, 2, 6);
    competence3.Matiere = (matieresService.find(6));
    this.competences.push(competence3);
  }

  findAll(id: number): Array<Competence> {
    let competenceTemp: Array<Competence> = new Array<Competence>();
    this.competences.forEach(element => {
      if (element.FormateurId == id) {
        competenceTemp.push(element);
      }
    });
    // console.log(competenceTemp);
    return competenceTemp;
  }

  find(id: number): Competence {
    return this.competences.find(m => m.Id == id);
  }

  create(competence: Competence): void {
    let max: number = 0;
    for (let mat of this.competences) {
      if (max < mat.Id) {
        max = mat.Id;
      }
    }

    competence.Id = ++max;
    competence.Matiere = (this.matieresService.find(competence.MatiereId));
    this.competences.push(competence);
  }

  update(competence: Competence): void {
    const position: number = this.competences.findIndex(m => m.Id == competence.Id);

    this.competences[position] = competence;
  }

  delete(id: number): void {
    const position: number = this.competences.findIndex(m => m.Id == id);

    this.competences.splice(position, 1);
  }


  // deleteByF(id: number): void {
  //   let competenceTemp: Array<Competence> = new Array<Competence>();
  //   competenceTemp.push(this.competences.find(m => m.FormateurId == id);
  //   competenceTemp = [];
  // };
}
