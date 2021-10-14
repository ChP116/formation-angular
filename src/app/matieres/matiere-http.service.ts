import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formateur, Matiere } from '../model';

@Injectable({
  providedIn: 'root'
})
export class MatiereHttpService {

  private matieres: Array<Matiere> = new Array<Matiere>();
  private formateurs: Array<Formateur> = new Array<Formateur>();

  constructor(private http: HttpClient) { 
    this.load();
    // this.loadFormateur();
  }

  findAll(): Array<Matiere> {
    return this.matieres;
  }

  findAllFormateur(): Array<Formateur> {
    return this.formateurs;
  }

  find(id: number): Observable<Matiere> {
    return this.http.get<Matiere>("http://localhost:5000/api/Matiere/"+id);
  }

  create(matiere: Matiere) : void {
    this.http.post<Matiere>("http://localhost:5000/api/Matiere", matiere).subscribe(response => {
      this.load();
    }, error => console.log(error));
  }

  update(matiere: Matiere) : void {
    this.http.put<Matiere>("http://localhost:5000/api/Matiere/"+matiere.id, matiere).subscribe(response => {
      this.load();
    }, error => console.log(error));
  }

  delete(id: number): void {
    this.http.delete<void>("http://localhost:5000/api/Matiere/"+id).subscribe(response => {
      this.load();
    }, error => console.log(error));
  }

  private load(): void {
    this.http.get<Array<Matiere>>("http://localhost:5000/api/Matiere").subscribe(response => {
      this.matieres = response;
    }, error => console.log(error));
  }

  // private loadFormateur(): void {
  //   this.http.get<Array<Formateur>>("http://localhost:5000/api/Matiere/Formateurs").subscribe(response => {
  //     this.formateurs = response;
  //   }, error => console.log(error));
  // }
}
