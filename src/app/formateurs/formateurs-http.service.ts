import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Formateur, Competence, Matiere } from '../model';
import { Observable } from 'rxjs';
import { CompetencesHttpService } from '../competences-http.service';

@Injectable({
  providedIn: 'root'
})
export class FormateursHttpService {

  private Formateurs: Array<Formateur> = new Array<Formateur>();


  constructor(private http: HttpClient, private competencesService: CompetencesHttpService) {
    this.load();

  }

  findAll(): Array<Formateur> {
    return this.Formateurs;
  }

  find(id: number): Observable<Formateur> {
    // return this.cursusList.find(m => m.id == id);
    return this.http.get<Formateur>("http://localhost:5000/api/Formateur/" + id)
  }

  create(formateur: Formateur): void {
    // let max: number = 0;

    // for(let mat of this.cursusList) {
    //   if(max < mat.id) {
    //     max = mat.id;
    //   }
    // }
    // cursus.id = ++max;
    // this.cursusList.push(cursus);
    this.http.post<Formateur>("http://localhost:5000/api/Formateur", formateur).subscribe(response => {
      console.log(response);
      console.log(formateur);
            formateur.competences.forEach(e => {
        this.competencesService.create(new Competence(null,response.id, e.matiereId))
      })

      this.load();
    }, error => console.log(error));
  }

  update(formateur: Formateur): void {
    // const position: number = this.cursusList.findIndex(m => m.id == cursus.id);
    // console.log(formateur);
    // this.cursusList[position] = cursus;
    this.http.put<Formateur>("http://localhost:5000/api/Formateur/" + formateur.id, formateur).subscribe(response => {
      this.competencesService.deleteByFormateur(formateur.id)
        formateur.competences.forEach(e => {

          this.competencesService.create(new Competence(null, e.formateurId, e.matiereId))
          
        })

        this.load();     
    
    
  }, error => console.log(error));
}

delete (id: number): void {
  // const position: number = this.cursusList.findIndex(m => m.id == id);

  // this.cursusList.splice(position, 1);
  this.http.delete<void>("http://localhost:5000/api/Formateur/"+id).subscribe(response => {
    this.load();
  }, error => console.log(error));
}

  private load(): void {
  this.http.get<Array<Formateur>>("http://localhost:5000/api/Formateur").subscribe(response => {
    this.Formateurs = response;
  }, error => console.log(error));
}

  // private loadStagiaires(): void {
  //   this.http.get<Array<Stagiaire>>("http://localhost:5000/api/Stagiaires").subscribe(response => {
  //     this.Stagiaires = response;
  //   }, error => console.log(error));
  // }

 

}
