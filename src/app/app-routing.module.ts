import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursusComponent } from './cursus/cursus.component';
import { FormateursComponent } from './formateurs/formateurs.component';
import { MatieresComponent } from './matieres/matieres.component';
import { StagiairesComponent } from './stagiaires/stagiaires.component';

const routes: Routes = [
  { path: "matieres", component: MatieresComponent },
  { path: "stagiaires", component: StagiairesComponent },
  { path: "cursus", component: CursusComponent },
  { path: "formateurs", component: FormateursComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
