import { Component, OnInit } from '@angular/core';
import { CursusService } from '../cursus.service';
import { Cursus } from '../model';

@Component({
  selector: 'cursus',
  templateUrl: './cursus.component.html',
  styleUrls: ['./cursus.component.scss']
})
export class CursusComponent implements OnInit {

  public cursus: Cursus;

  constructor(private cursusService: CursusService) { }

  ngOnInit(): void {
  }

}
