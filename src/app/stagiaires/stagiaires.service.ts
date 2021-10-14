import { Injectable } from '@angular/core';
import { Stagiaire } from '../model';

@Injectable({
  providedIn: 'root'
})
export class StagiairesService {

  private stagiaires: Array<Stagiaire> = new Array<Stagiaire>();

  constructor() {
    this.stagiaires.push(new Stagiaire(1, "M", "Bruneau", "Alexandre", "a-b@mail.com","0601020304",new Date(1989, 7, 10)));
    this.stagiaires.push(new Stagiaire(2, "M", "Peducelle", "Christian", "c-p@mail.com","0605060708",new Date(1979, 5, 15)));
    this.stagiaires.push(new Stagiaire(4, "M", "Donnadieu", "Guillaume", "g-d@mail.com","0609080706",new Date(1992, 2,23)));
    
  }

  findAll(): Array<Stagiaire> {
    return this.stagiaires;
  }

  find(id: number): Stagiaire {
    return this.stagiaires.find(m => m.id == id);
  }

  create(stagiaire: Stagiaire) : void {
    let max: number = 0;

    for(let sta of this.stagiaires) {
      if(max < sta.id) {
        max = sta.id;
      }
    }

    stagiaire.id = ++max;

    this.stagiaires.push(stagiaire);
  }

  update(stagiaire: Stagiaire) : void {
    const position: number = this.stagiaires.findIndex(m => m.id == stagiaire.id);

    this.stagiaires[position] = stagiaire;
  }

  delete(id: number): void {
    const position: number = this.stagiaires.findIndex(m => m.id == id);

    this.stagiaires.splice(position, 1);
  }

  // findStagiairesCursus(id:number) : Array<Stagiaire> {

  // }
}
