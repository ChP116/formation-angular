import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { Component, Input, OnInit } from '@angular/core';
import { CompetencesService } from '../competences.service';
import { FormateursService } from '../formateurs.service';
import { MatiereService } from '../matieres/matiere.service';
import { Competence, Formateur, Matiere } from '../model';

@Component({
  selector: 'formateurs',
  templateUrl: './formateurs.component.html',
  styleUrls: ['./formateurs.component.scss']
})
export class FormateursComponent implements OnInit {

  constructor(private formateursService: FormateursService, private matieresService: MatiereService, private competencesService: CompetencesService) {

  }

  @Input() formateurForm: Formateur = null;

  ngOnInit(): void {
  }

  badge(formateurId: number, matiere: Matiere): boolean {

    if (this.competencesService.findAll(formateurId).includes(matiere)) return true else return false

  }

  list(): Array<Formateur> {
    return this.formateursService.findAll();
  }

  listMatiere(): Array<Matiere> {
    return this.matieresService.findAll();
  }

  listCompetence(id: number): Array<Competence> {
    return this.competencesService.findAll(id);
  }

  add(): void {
    this.formateurForm = new Formateur();
  }

  edit(id: number): void {
    this.formateurForm = { ... this.formateursService.find(id) };
  }

  remove(id: number): void {
    this.formateursService.delete(id);
  }

  save(): void {
    if (this.formateurForm.Id) {
      this.formateursService.update(this.formateurForm);
    } else {
      this.formateursService.create(this.formateurForm);
    }
  }

  cancel(): void {
    this.formateurForm = null;
  }

}
