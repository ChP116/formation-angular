import { Injectable } from '@angular/core';
import { Cursus, Stagiaire } from '../model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursusHttpService {

  private cursusList: Array<Cursus> = new Array<Cursus>();
  private Stagiaires: Array<Stagiaire> = new Array<Stagiaire>();

  constructor(private http: HttpClient) {
 this.load();
//  this.loadStagiaires();
  }

  findAll(): Array<Cursus> {
    return this.cursusList;
  }

  find(id: number): Observable<Cursus> {
    // return this.cursusList.find(m => m.id == id);
     return this.http.get<Cursus>("http://localhost:5000/api/cursus/"+id)
  }

  create(cursus: Cursus) : void {
    // let max: number = 0;

    // for(let mat of this.cursusList) {
    //   if(max < mat.id) {
    //     max = mat.id;
    //   }
    // }
    // cursus.id = ++max;
    // this.cursusList.push(cursus);
    this.http.post<Cursus>("http://localhost:5000/api/Cursus", cursus).subscribe(response => {
      this.load();
    }, error => console.log(error));
  }

  update(cursus: Cursus) : void {
    // const position: number = this.cursusList.findIndex(m => m.id == cursus.id);
console.log(cursus);
    // this.cursusList[position] = cursus;
    this.http.put<Cursus>("http://localhost:5000/api/Cursus/"+cursus.id, cursus).subscribe(response => {
      this.load();
    }, error => console.log(error));
  }

  delete(id: number): void {
    // const position: number = this.cursusList.findIndex(m => m.id == id);

    // this.cursusList.splice(position, 1);
    this.http.delete<void>("http://localhost:5000/api/Cursus/"+id).subscribe(response => {
      this.load();
    }, error => console.log(error));
  }

  private load(): void {
    this.http.get<Array<Cursus>>("http://localhost:5000/api/Cursus").subscribe(response => {
      this.cursusList = response;
    }, error => console.log(error));
  }

  // private loadStagiaires(): void {
  //   this.http.get<Array<Stagiaire>>("http://localhost:5000/api/Stagiaires").subscribe(response => {
  //     this.Stagiaires = response;
  //   }, error => console.log(error));
  // }

 
}

