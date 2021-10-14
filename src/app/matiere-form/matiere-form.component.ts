import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatiereService } from '../matieres/matiere.service';
import { Matiere } from '../model';


@Component({
  selector: 'matiere-form',
  templateUrl: './matiere-form.component.html',
  styleUrls: ['./matiere-form.component.scss']
})
export class MatiereFormComponent implements OnInit {

  @Input() matiereForm: Matiere = null;

  constructor(private matiereService: MatiereService) { }

  ngOnInit(): void {
  }

  save(): void {
    if (this.matiereForm.id) {
      this.matiereService.update(this.matiereForm);
    } else {
      this.matiereService.create(this.matiereForm);
    }
  }

  cancel(): void {
    this.matiereForm = null;
  }

}
