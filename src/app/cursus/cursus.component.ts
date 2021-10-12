import { Component, OnInit } from '@angular/core';
import { CursusService } from '../cursus.service';
import { Cursus, Stagiaire } from '../model';
import { StagiairesService } from '../stagiaires.service';

@Component({
  selector: 'cursus',
  templateUrl: './cursus.component.html',
  styleUrls: ['./cursus.component.scss']
})
export class CursusComponent implements OnInit {

  public cursusForm: Cursus = null;

  // public stagiaires: Array<Stagiaire>;


  constructor(private cursusService: CursusService, private stagiairesService: StagiairesService) { }

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
    this.cursusForm.Stagiaires = [];
  }

  edit(id: number): void {
    this.cursusForm = { ... this.cursusService.find(id) };
  }

  remove(id: number): void {
    this.cursusService.delete(id);
  }

  save(): void {
    // console.log(this.cursusForm);
    if (this.cursusForm.Id) {
      this.cursusService.update(this.cursusForm);
    } else {
      this.cursusService.create(this.cursusForm);
    }
    this.cancel();
  }

  cancel(): void {
    this.cursusForm = null;
  }

  aff(id: number): boolean {
    if (this.cursusForm.Stagiaires.find(m => m.Id == id)) {
      return true;
    }
    else
      return false;
  }

}
