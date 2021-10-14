import { findLast } from '@angular/compiler/src/directive_resolver';
import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CompetencesHttpService } from '../competences-http.service';
import { FormateursHttpService } from './formateurs-http.service';
import { MatiereHttpService } from '../matieres/matiere-http.service';
import { Competence, Formateur, Matiere } from '../model';


@Component({
  selector: 'formateurs',
  templateUrl: './formateurs.component.html',
  styleUrls: ['./formateurs.component.scss']
})
export class FormateursComponent implements OnInit {

  constructor(private formateursService: FormateursHttpService, private matieresService: MatiereHttpService, private competencesService: CompetencesHttpService) {

  }


  @Input() formateurForm: Formateur = null;

  @Output() cancelRequest = new EventEmitter<void>();

  // selection: Array<Competence>;
  // selectionC: Array<Competence> = [];
  // selectionC_D: Array<Competence> = [];
  // status: boolean[] = [];
  // check: boolean;


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
    return this.competencesService.findByF(id);
  }

  add(): void {
    this.formateurForm = new Formateur();
    this.formateurForm.competences = [];
  }

  edit(id: number): void {
    // this.formateurForm = { ... this.formateursService.find(id) };
    // this.formateurForm.Competences = this.competencesService.findAll(id);
    this.formateursService.find(id).subscribe(response => {
      this.formateurForm = response;
      this.formateurForm.competences = [];
      console.log(this.formateurForm)
      this.competencesService.findByF(id).forEach(e => {
        // console.log(response)        
        this.formateurForm.competences.push(e);
      });
    }, error => console.log(error));
    // this.stagiairesService.findByC(id).subscribe(response =>{
    //  console.log(this.competencesService.findByF(id))   
  }

  // compareMatiere(mat1: Matiere, mat2: Matiere): boolean {
  //   return mat1 && mat2 ? mat1.id == mat2.id : false;
  // }

  remove(id: number): void {
    console.log(id);
    this.competencesService.deleteByFormateur(id);

    this.formateursService.delete(id);
  }

  cancel(): void {
    // this.selection = null;
    this.cancelRequest.emit();
    this.formateurForm = null;
    // nécessaires pour la version checkbox
    // this.selectionC = [];
    // this.selectionC_D = [];
    // this.status = [];

  }
  // fin méthodes communes



  // Version select
  save(): void {
    if (this.formateurForm.id) {
      console.log(this.formateurForm)
      this.formateursService.update(this.formateurForm);


    } else {

      this.formateursService.create(this.formateurForm);
    }
    this.cancel()


    // console.log(this.selection)

    // if (this.formateurForm.id) {
    //   this.formateursService.update(this.formateurForm);

    //   if (this.selection != null) {
    //     this.competencesService.deleteByF(this.formateurForm.id);
    //     this.selection.forEach(element => {
    //       this.competencesService.create(element);
    //     });
    //   }
    // } else {

    //   this.formateursService.create(this.formateurForm);

    //   this.selectionC.forEach(element => {
    //     element.formateurId = this.formateurForm.id;
    //     this.competencesService.create(element);
    //   });
    // }
    // this.cancel();
  }

  // selectChange(formateurId: number, event: any) {
  //   console.log(event)
  //   this.selection = [];
  //   for (let option of event.target.selectedOptions) {
  //     let competence: Competence = new Competence(null, formateurId, parseInt(option.value));
  //     competence.matiere = this.matieresService.find(option.value);
  //     this.selection.push(competence);
  //   }

  // }
  // select(id: number, matiere: Matiere): boolean {
  //   if (this.competencesService.competences.find(m => m.matiere == matiere && m.formateurId == id)) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }

  selectCheck(matiere: Matiere): boolean {
    if (this.formateurForm.competences.find(c => c.matiereId == matiere.id)) {
      return true;
    }
    else {
      return false;
    }
  }

  //// fin version select



  // 

  // Version checkbox : bug si check/uncheck intempestifs, ok en utilisation normale
  // saveCBis(): void {
  //   if (this.formateurForm.id) {
  //     this.competencesService.deleteByF(this.formateurForm.id);
  //     this.formateurForm.competences.forEach(c => {
  //       this.competencesService.competences.push(c);
  //     })
  //   }
  //   else {
  //     this.formateursService.create(this.formateurForm);

  //     this.selectionC.forEach(element => {
  //       element.formateurId = this.formateurForm.id;
  //       this.competencesService.create(element);
  //     });

  //   }
  //   this.cancel();

  // }

  // saveC(): void {
  //   // this.status.splice(0, 1)
  //   // console.log(this.status)


  //   if (this.formateurForm.id) {
  //     //   this.formateursService.update(this.formateurForm)
  //     //   this.status.forEach(e => {
  //     //     e.forEach(f => {
  //     //       if (typeof (f) == "boolean") {
  //     //         this.statusBool = f;
  //     //       }
  //     //       else {
  //     //         this.element = f;

  //     //       }

  //     //       if (this.element && this.statusBool) {
  //     //         this.competencesService.create(this.element);
  //     //       }
  //     //       if (this.element && !this.statusBool) {
  //     //         if (this.competencesService.competences.find(m => m.Matiere == this.element.Matiere && m.FormateurId == this.element.FormateurId)) {
  //     //           this.element.Id = this.competencesService.competences.find(m => m.Matiere == this.element.Matiere && m.FormateurId == this.element.FormateurId).Id
  //     //           console.log(this.element.Id)
  //     //           this.competencesService.delete(this.element.Id);}
  //     //         };
  //     //       })
  //     //     })

  //     // console.log("pop")
  //     // console.log(this.status.pop())

  //     if (this.selectionC.length != 0) {
  //       this.selectionC.forEach(element => {
  //         if (this.selectionC_D.length != 0) {
  //           this.selectionC_D.forEach(element_D => {
  //             if (element.matiere == element_D.matiere && element.matiereId == element_D.matiereId && element.formateurId == element_D.formateurId) {
  //               this.check = false
  //             }
  //             else {
  //               this.check = true
  //             }
  //           })

  //           if (this.check) {
  //             this.competencesService.create(element);
  //           }
  //         }
  //         else {
  //           this.competencesService.create(element);
  //         }

  //       });
  //     }
  //     if (this.selectionC_D.length != 0) {
  //       // console.log(this.selectionC_D)
  //       // console.log(this.statusBool)
  //       this.selectionC_D.forEach(element_D => {
  //         if (this.selectionC.length != 0) {
  //           this.selectionC.forEach(element => {
  //             if (element.matiere == element_D.matiere && element.matiereId == element_D.matiereId && element.formateurId == element_D.formateurId) {
  //               this.check = false
  //             }
  //             else {
  //               this.check = true
  //             }
  //           })

  //           if (this.check) {
  //             if (this.competencesService.competences.find(m => m.matiere == element_D.matiere && m.formateurId == element_D.formateurId)) {
  //               element_D.Id = this.competencesService.competences.find(m => m.matiere == element_D.matiere && m.formateurId == element_D.formateurId).Id
  //               this.competencesService.delete(element_D.Id);
  //             }
  //           }
  //         }
  //         else {
  //           this.competencesService.delete(element_D.Id);
  //         }
  //       });
  //     }
  //   }

  //   else {

  //     this.formateursService.create(this.formateurForm);

  //     this.selectionC.forEach(element => {
  //       element.formateurId = this.formateurForm.id;
  //       this.competencesService.create(element);
  //     });

  //   }
  //   this.cancel();

  // }

  checkboxChangeBis(event: any) {
    let id: number = parseInt(event.target.value);

    if (event.currentTarget.checked) {
      let competence: Competence = new Competence(null, this.formateurForm.id, id);
      this.matieresService.find(event.target.value).subscribe(resp => {
        competence.matiere = resp;
        this.formateurForm.competences.push(competence);
      }, error => console.log(error));

    } else {
      let position;
      this.formateurForm.competences.forEach((c, i) => {
        if (c.matiereId == id) {
          position = i;
        }
      });
      this.formateurForm.competences.splice(position, 1);
    }

    console.log(this.formateurForm);
  }

  // checkboxChange(formateurId: number, event: any) {
  //   // console.log(event.currentTarget.checked)
  //   if (event.currentTarget.checked) {
  //     let competence: Competence = new Competence(null, formateurId, parseInt(event.target.value));
  //     competence.matiere = this.matieresService.find(event.target.value);

  //     let boolC: boolean;
  //     if (this.selectionC.length != 0) {
  //       this.selectionC.forEach(e => {
  //         // console.log(e)
  //         // console.log(competence)
  //         if (e.formateurId == competence.formateurId && e.matiereId == competence.matiereId && e.matiere == competence.matiere && event.currentTarget.checked)
  //           boolC = false;
  //         else
  //           boolC = true;
  //       }
  //       )
  //     }
  //     else {
  //       boolC = true;
  //     }
  //     if (boolC) {
  //       this.selectionC.push(competence);
  //       // this.status.push(event.currentTarget.checked);
  //     }
  //   }
  //   else {
  //     let competence: Competence = new Competence(null, formateurId, parseInt(event.target.value));
  //     competence.matiere = this.matieresService.find(event.target.value);

  //     let boolC_D: boolean;
  //     if (this.selectionC_D.length != 0) {
  //       this.selectionC_D.forEach(e => {
  //         // console.log(e)
  //         // console.log(competence)
  //         if (e.formateurId == competence.formateurId && e.matiereId == competence.matiereId && e.matiere == competence.matiere && !event.currentTarget.checked)
  //           boolC_D = false;
  //         else
  //           boolC_D = true;
  //       }
  //       )
  //     }
  //     else {
  //       boolC_D = true;
  //     }

  //     if (boolC_D) {
  //       this.selectionC_D.push(competence);
  //       // this.status.push(event.currentTarget.checked)
  //     }

  //   }

  //   console.log("C")
  //   console.log(this.selectionC)
  //   console.log("C_D")
  //   console.log(this.selectionC_D)
  //   // console.log("sta")
  //   // console.log(this.status)
  // }
  //// fin version checkbox









}
