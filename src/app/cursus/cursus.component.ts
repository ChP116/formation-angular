import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { threadId } from 'worker_threads';
import { CursusService } from '../cursus/cursus.service';
import { Cursus, Stagiaire } from '../model';
import { StagiairesHttpService } from '../stagiaires/stagiaires-http.service';
import { CursusHttpService } from './cursus-http.service';

@Component({
  selector: 'cursus',
  templateUrl: './cursus.component.html',
  styleUrls: ['./cursus.component.scss']
})
export class CursusComponent implements OnInit {

  @Input()
  public cursusForm: Cursus = null;
  @Output() cancelRequest = new EventEmitter<void>();
  @Output() deleteRequest = new EventEmitter<void>();

  // public stagiaires: Array<Stagiaire>;


  constructor(private cursusService: CursusHttpService, private stagiairesService: StagiairesHttpService) { 

  }

  ngOnInit(): void {
  }

  list(): Array<Cursus> {
    return this.cursusService.findAll();
  }

  listStagiaires(): Array<Stagiaire> {
    return this.stagiairesService.findAll();
  }

  add(): void {
    this.cursusForm = new Cursus();
    this.cursusForm.stagiaires = [];
  }

  edit(id: number): void {
    this.cursusService.find(id).subscribe(response => {
      this.cursusForm = response;
    }, error => console.log(error));
    // this.stagiairesService.findByC(id).subscribe(response =>{
    this.stagiairesService.findByC(id).forEach(element => {
      this.cursusForm.stagiaires.push(element)
    });
    // console.log(this.cursusForm);
    // console.log(this.stagiairesService.findAll());    
    // )
  }

  compareStagiaire(stag1: Stagiaire, stag2: Stagiaire): boolean {
    return stag1 && stag2 ? stag1.id == stag2.id : false;
  }

  remove(id:number): void {
    //this.deleteRequest.emit(this.cursusForm.id);
    this.cursusService.delete(id);
  }

  save(): void {
    // console.log(this.cursusForm);
    if (this.cursusForm.id) {
      this.cursusService.update(this.cursusForm);
      // console.log(this.cursusForm.stagiaires)
      this.cursusForm.stagiaires.forEach(e => {
        e.CursusId = this.cursusForm.id;
        this.stagiairesService.update(e)
      })

    } else {
      this.cursusService.create(this.cursusForm);
      this.cursusForm.stagiaires.forEach(e => {
        this.stagiairesService.update(e)
      })
    }
    this.cancel()
  }

  cancel(): void {
    this.cancelRequest.emit();
    this.cursusForm = null;
  }

  // aff(id: number): boolean {
  //   if (this.cursusForm.stagiaires.find(m => m.id == id)) {
  //     return true;
  //   }
  //   else
  //     return false;
  // }

}
