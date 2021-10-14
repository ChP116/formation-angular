import { Injectable } from '@angular/core';
import { Stagiaire } from '../model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StagiairesHttpService {

  
  private Stagiaires: Array<Stagiaire> = new Array<Stagiaire>();

  constructor(private http: HttpClient) {
 this.load();
  }

  findAll(): Array<Stagiaire> {
    return this.Stagiaires;
  }

  find(id: number): Stagiaire {
    return this.Stagiaires.find(m => m.id == id);
  }

  findByC(id: number): Array<Stagiaire> {
    return this.Stagiaires.filter(m => m.CursusId == id);
  }

  create(stagiaire: Stagiaire) : void {
    // let max: number = 0;

    // for(let mat of this.Stagiaires) {
    //   if(max < mat.id) {
    //     max = mat.id;
    //   }
    // }

    // cursus.id = ++max;

    // this.Stagiaires.push(cursus);
    this.http.post<Stagiaire>("http://localhost:5000/api/Stagiaires", stagiaire).subscribe(response => {
      this.load();
    }, error => console.log(error));
  }

  update(stagiaire: Stagiaire) : void {
    // const position: number = this.Stagiaires.findIndex(m => m.id == cursus.id);

    // this.Stagiaires[position] = cursus;
    this.http.put<Stagiaire>("http://localhost:5000/api/stagiaires/"+stagiaire.id, stagiaire).subscribe(response => {
      this.load();
    }, error => console.log(error));
  }

  delete(id: number): void {
    // const position: number = this.Stagiaires.findIndex(m => m.id == id);

    // this.Stagiaires.splice(position, 1);
    this.http.delete<void>("http://localhost:5000/api/stagiaires/"+id).subscribe(response => {
      this.load();
    }, error => console.log(error));
  }

  private load(): void {
    this.http.get<Array<Stagiaire>>("http://localhost:5000/api/stagiaires").subscribe(response => {
      this.Stagiaires = response;
    }, error => console.log(error));
  }

 

}
