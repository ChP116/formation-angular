import { Injectable } from '@angular/core';
import { Cursus, Stagiaire } from '../model';
import { StagiairesService } from '../stagiaires/stagiaires.service';

@Injectable({
  providedIn: 'root'
})
export class CursusService {

  private cursusList: Array<Cursus> = new Array<Cursus>();

  constructor(private stagiaireService: StagiairesService) {
    this.cursusList.push(new Cursus(1, "DOTNet", "10/07/2021", "10/10/2021"));
    this.cursusList.push(new Cursus(2, "Java", "10/06/2020", "10/9/2021"));
    let cursus : Cursus = new Cursus(3, "Java", "10/06/2020", "10/9/2021");
    cursus.stagiaires.push(stagiaireService.find(1));
    cursus.stagiaires.push(stagiaireService.find(2));
  
   
    this.cursusList.push(cursus);
  }

  findAll(): Array<Cursus> {
    return this.cursusList;
  }

  find(id: number): Cursus {
    return this.cursusList.find(m => m.id == id);
  }

  create(cursus: Cursus) : void {
    let max: number = 0;

    for(let mat of this.cursusList) {
      if(max < mat.id) {
        max = mat.id;
      }
    }

    cursus.id = ++max;

    this.cursusList.push(cursus);
  }

  update(cursus: Cursus) : void {
    const position: number = this.cursusList.findIndex(m => m.id == cursus.id);

    this.cursusList[position] = cursus;
  }

  delete(id: number): void {
    const position: number = this.cursusList.findIndex(m => m.id == id);

    this.cursusList.splice(position, 1);
  }
}
