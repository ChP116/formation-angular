import { Injectable } from '@angular/core';
import { Cursus } from './model';

@Injectable({
  providedIn: 'root'
})
export class CursusService {

  private cursusList: Array<Cursus> = new Array<Cursus>();

  constructor() {
    this.cursusList.push(new Cursus(1, "DOTNet", new Date(2021, 7, 10), new Date(2021, 10, 10)));
    this.cursusList.push(new Cursus(2, "Java", new Date(2020, 6, 10), new Date(2021, 9, 23)));
  }
}
