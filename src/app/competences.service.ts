import { Injectable } from '@angular/core';
import { FormateursService } from './formateurs/formateurs.service';
import { MatiereService } from './matieres/matiere.service';
import { Competence } from './model';

@Injectable({
  providedIn: 'root'
})
export class CompetencesService {

  competences: Array<Competence> = new Array<Competence>();


  constructor(private matieresService: MatiereService, private formateursService: FormateursService) {

    let competence1: Competence = new Competence(1, 1, 1);
    competence1.matiere = (matieresService.find(1));
    this.competences.push(competence1);
    let competence2: Competence = new Competence(2, 1, 3);
    competence2.matiere = (matieresService.find(3));
    this.competences.push(competence2);
    let competence3: Competence = new Competence(3, 2, 6);
    competence3.matiere = (matieresService.find(6));
    this.competences.push(competence3);
    
  }

  findAll(id: number): Array<Competence> {
    let competenceTemp: Array<Competence> = new Array<Competence>();
    this.competences.forEach(element => {
      if (element.formateurId == id) {
        competenceTemp.push(element);
      }
    });
    // console.log(competenceTemp);
    return competenceTemp;
  }

  deleteByF(id: number): void {   
    this.competences.filter(m=> m.formateurId==id).forEach(element => {                 
        this.competences.splice(this.competences.indexOf(element), 1);        
      })
  };


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
    competence.matiere = (this.matieresService.find(competence.matiereId));
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



}
