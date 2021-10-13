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

  selection: Array<Competence> = [];
  bool: boolean;

  ngOnInit(): void {
  }

  // badge(formateurId: number, matiere: Matiere): boolean {
  //   console.log("formateur:" + formateurId + " - matiere:" + matiere.Id);
  //   if (!this.competencesService.competences.find(m => m.Matiere == matiere && m.FormateurId == formateurId)) {
  //     // console.log(this.competencesService.competences.find(m => m.Matiere == matiere && m.FormateurId == formateurId))    

  //     return false;
  //   }
  //   else {
  //     //this.ajoutSelection(formateurId, matiere.Id)
  //     return true;
  //   }
  // }

  // ajoutSelection(formateurId: number, matiere: Matiere) {
  //   let competence: Competence = new Competence(null, formateurId, matiere.Id);
  //   competence.Matiere = matiere;
  //   this.selection.push(competence);
  //   //console.log(this.selection)

  // }

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
      this.competencesService.deleteByF(this.formateurForm.Id);
      this.selection.forEach(element => {

        this.competencesService.create(element);
      });

    } else {
      this.formateursService.create(this.formateurForm);
    }
    this.cancel();
  }

  test(formateurId: number, event: any) {
    this.selection = [];
    for (let option of event.target.selectedOptions) {
      let competence: Competence = new Competence(null, formateurId, parseInt(option.value));
      competence.Matiere = this.matieresService.find(option.value);
      this.selection.push(competence);
    }
  }

  cancel(): void {
    this.formateurForm = null;
  }

}
