import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatieresComponent } from './matieres/matieres.component';
import { MatiereService } from './matieres/matiere.service';
import { FormsModule } from '@angular/forms';
import { MatiereFormComponent } from './matiere-form/matiere-form.component';
import { StagiairesComponent } from './stagiaires/stagiaires.component';
import { CursusComponent } from './cursus/cursus.component';
import { FormateursComponent } from './formateurs/formateurs.component';

@NgModule({
  declarations: [
    AppComponent,
    MatieresComponent,
    MatiereFormComponent,
    StagiairesComponent,
    CursusComponent,
    FormateursComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [MatiereService],
  bootstrap: [AppComponent]
})
export class AppModule { }
