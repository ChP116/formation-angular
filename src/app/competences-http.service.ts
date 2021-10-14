import { Injectable } from '@angular/core';
import { Competence, Formateur, Matiere } from './model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CompetencesHttpService {

     private competences: Array<Competence> = new Array<Competence>();

  
    constructor(private http: HttpClient) {
   this.load();
  //  this.loadStagiaires();
    }
  
    findAll(): Array<Competence> {
      return this.competences;
    }

    findByF(id: number): Array<Competence> {
      return this.competences.filter(c=> c.formateurId==id)
    }

  
    find(formateurId: number,matiereId: number): Observable<Competence> {
      // return this.cursusList.find(m => m.id == id);
       return this.http.get<Competence>("http://localhost:5000/api/Competence/"+formateurId+"/"+matiereId)
    }
  
    create(competence: Competence) : void {
      // let max: number = 0;
  
      // for(let mat of this.cursusList) {
      //   if(max < mat.id) {
      //     max = mat.id;
      //   }
      // }
      // cursus.id = ++max;
      // this.cursusList.push(cursus);
      this.http.post<Competence>("http://localhost:5000/api/Competence", competence).subscribe(response => {
        this.load();
      }, error => console.log(error));
    }
  
    update(competence: Competence) : void {
      // const position: number = this.cursusList.findIndex(m => m.id == cursus.id);
  console.log(competence);
      // this.cursusList[position] = cursus;
      this.http.put<Competence>("http://localhost:5000/api/Competence/"+competence.matiereId+"/"+competence.formateurId, competence).subscribe(response => {
        this.load();
      }, error => console.log(error));
    }
  
    delete(formateurId: number,matiereId: number): void {
      // const position: number = this.cursusList.findIndex(m => m.id == id);
  
      // this.cursusList.splice(position, 1);
      this.http.delete<void>("http://localhost:5000/api/Competence/"+formateurId+"/"+matiereId).subscribe(response => {
        this.load();
      }, error => console.log(error));
    }

    // deleteByF(formateurId: number): string {   
    //   console.log(this.competences)
    //   this.competences.filter(c=>c.formateurId==formateurId).forEach(c=> 
    //            {console.log(c)
    //     this.http.delete<void>("http://localhost:5000/api/Competence/"+formateurId+"/"+c.matiereId).subscribe(response => {
    //       this.load();
          
    //     }, error => console.log(error));
    //     })
    //     return "ok";
    //   // this.competences.filter(m=> m.formateurId==id).forEach(element => {                 
    //   //     this.competences.splice(this.competences.indexOf(element), 1);        
    //   //   })
    // };

    deleteByFormateur(formateurId: number): void {  
       this.http.delete<void>("http://localhost:5000/api/Competence/"+formateurId).subscribe(response => {
        
      }, error => console.log(error));
    } 
  
  
    private load(): void {
      this.http.get<Array<Competence>>("http://localhost:5000/api/competence").subscribe(response => {
        
      this.competences=response;
      
      }, error => console.log(error));
      
    }

}
