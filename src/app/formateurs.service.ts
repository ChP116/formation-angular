import { Injectable } from '@angular/core';
import { Formateur, Matiere } from './model';

@Injectable({
  providedIn: 'root'
})
export class FormateursService {

  private formateurs: Array<Formateur> = new Array<Formateur>();
  private matieres: Array<Matiere> = new Array<Matiere>();

  constructor() {
    this.formateurs.push(new Formateur(1, false));
    this.formateurs.push(new Formateur(2, false));
    this.formateurs.push(new Formateur(3, true));

  }

  findAll(): Array<Formateur> {
    return this.formateurs;
  }

  find(id: number): Formateur {
    return this.formateurs.find(m => m.Id == id);
  }

  create(formateur: Formateur): void {
    let max: number = 0;

    for (let mat of this.formateurs) {
      if (max < mat.Id) {
        max = mat.Id;
      }
    }

    formateur.Id = ++max;

    this.formateurs.push(formateur);
  }

  update(formateur: Formateur): void {
    const position: number = this.formateurs.findIndex(m => m.Id == formateur.Id);
    // console.log(formateur);
    this.formateurs[position] = formateur;
  }

  delete(id: number): void {
    const position: number = this.formateurs.findIndex(m => m.Id == id);

    this.formateurs.splice(position, 1);
  }

}
