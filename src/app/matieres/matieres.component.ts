import { Component, OnInit } from '@angular/core';
import { Matiere } from '../model';
import { MatiereService } from './matiere.service';

@Component({
  selector: 'matieres',
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.scss']
})
export class MatieresComponent implements OnInit {

  matiereForm: Matiere = null;

  constructor(private matiereService: MatiereService) {
  }

  ngOnInit(): void {
  }

  list(): Array<Matiere> {
    return this.matiereService.findAll();
  }

  add(): void {
    this.matiereForm = new Matiere();
  }

  edit(id: number): void {
    this.matiereForm = { ... this.matiereService.find(id) };
  }

  remove(id: number): void {
    this.matiereService.delete(id);
  }
}
