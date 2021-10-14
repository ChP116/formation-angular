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
import { FormateursService } from './formateurs.service';
import { CompetencesService } from './competences.service';
import { CursusService } from './cursus/cursus.service';
import { StagiairesService } from './stagiaires/stagiaires.service';
import { HttpClientModule } from '@angular/common/http';

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
    FormsModule,
    HttpClientModule
  ],
  providers: [MatiereService, FormateursService, CompetencesService, CursusService, StagiairesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
