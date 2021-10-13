import { findLast } from '@angular/compiler/src/directive_resolver';
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

  selection: Array<Competence>;
  selectionC: Array<Competence> = [];
  selectionC_D: Array<Competence> = [];
  status: boolean[] =[];
  

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



  // méthodes communes

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
  cancel(): void {
    this.selection = null;
    this.formateurForm = null;
    // nécessaires pour la version checkbox
    this.selectionC = [];
    this.selectionC_D = [];
    this.status = [];

  }
  // fin méthodes communes



  // Version select
  save(): void {
    console.log(this.selection)

    if (this.formateurForm.Id) {
      this.formateursService.update(this.formateurForm);

      if (this.selection != null) {
        this.competencesService.deleteByF(this.formateurForm.Id);
        this.selection.forEach(element => {
          this.competencesService.create(element);
        });
      }
    } else {

      this.formateursService.create(this.formateurForm);

      this.selectionC.forEach(element => {
        element.FormateurId = this.formateurForm.Id;
        this.competencesService.create(element);
      });
    }
    this.cancel();
  }
  selectChange(formateurId: number, event: any) {
    console.log(event)
    this.selection = [];
    for (let option of event.target.selectedOptions) {
      let competence: Competence = new Competence(null, formateurId, parseInt(option.value));
      competence.Matiere = this.matieresService.find(option.value);
      this.selection.push(competence);
    }

  }
  select(id: number, matiere: Matiere): boolean {
    if (this.competencesService.competences.find(m => m.Matiere == matiere && m.FormateurId == id)) {
      return true;
    }
    else {
      return false;
    }
  }

  //// fin version select



  // Version checkbox
  saveC(): void {
    // this.status.splice(0, 1)
    // console.log(this.status)


    if (this.formateurForm.Id) {
      //   this.formateursService.update(this.formateurForm)
      //   this.status.forEach(e => {
      //     e.forEach(f => {
      //       if (typeof (f) == "boolean") {
      //         this.statusBool = f;
      //       }
      //       else {
      //         this.element = f;

      //       }

      //       if (this.element && this.statusBool) {
      //         this.competencesService.create(this.element);
      //       }
      //       if (this.element && !this.statusBool) {
      //         if (this.competencesService.competences.find(m => m.Matiere == this.element.Matiere && m.FormateurId == this.element.FormateurId)) {
      //           this.element.Id = this.competencesService.competences.find(m => m.Matiere == this.element.Matiere && m.FormateurId == this.element.FormateurId).Id
      //           console.log(this.element.Id)
      //           this.competencesService.delete(this.element.Id);}
      //         };
      //       })
      //     })

      console.log("pop")
      console.log(this.status.pop())

      if (this.selectionC.length != 0) {
        this.selectionC.forEach(element => {
          this.competencesService.create(element);
        });
      }
      if (this.selectionC_D.length != 0 ) {
        // console.log(this.selectionC_D)
        // console.log(this.statusBool)
        this.selectionC_D.forEach(element => {
          console.log(element)
          if (this.competencesService.competences.find(m => m.Matiere == element.Matiere && m.FormateurId == element.FormateurId)) {
            element.Id = this.competencesService.competences.find(m => m.Matiere == element.Matiere && m.FormateurId == element.FormateurId).Id
            this.competencesService.delete(element.Id);
          }
          else {
            console.log("else")
          }

        });
      }
    }

    else {

      this.formateursService.create(this.formateurForm);

      this.selectionC.forEach(element => {
        element.FormateurId = this.formateurForm.Id;
        this.competencesService.create(element);
      });

    }
    this.cancel();

  }

  checkboxChange(formateurId: number, event: any) {
    // console.log(event.currentTarget.checked)
    if (event.currentTarget.checked) {
      let competence: Competence = new Competence(null, formateurId, parseInt(event.target.value));
      competence.Matiere = this.matieresService.find(event.target.value);

      let boolC: boolean;
      if (this.selectionC.length != 0) {
        this.selectionC.forEach(e => {
          // console.log(e)
          // console.log(competence)
          if (e.FormateurId == competence.FormateurId && e.MatiereId == competence.MatiereId && e.Matiere == competence.Matiere && event.currentTarget.checked)
            boolC = false;
          else
            boolC = true;
        }
        )
      }
      else {
        boolC = true;
      }
      if (boolC) {
        this.selectionC.push(competence);
        this.status.push(event.currentTarget.checked);
      }
    }
    else {
      let competence: Competence = new Competence(null, formateurId, parseInt(event.target.value));
      competence.Matiere = this.matieresService.find(event.target.value);

      let boolC_D: boolean;
      if (this.selectionC_D.length != 0) {
        this.selectionC_D.forEach(e => {
          // console.log(e)
          // console.log(competence)
          if (e.FormateurId == competence.FormateurId && e.MatiereId == competence.MatiereId && e.Matiere == competence.Matiere && !event.currentTarget.checked)
            boolC_D = false;
          else
            boolC_D = true;
        }
        )
      }
      else {
        boolC_D = true;
      }

      if (boolC_D) {
        this.selectionC_D.push(competence);
        this.status.push(event.currentTarget.checked)
      }

    }

    console.log("C")
    console.log(this.selectionC)
    console.log("C_D")
    console.log(this.selectionC_D)
    // console.log("sta")
    // console.log(this.status)
  }
  //// fin version checkbox









}
