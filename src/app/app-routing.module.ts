import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'studente',
    loadChildren: () =>
      import('./modules/studente/studente.module').then(
        (m) => m.StudenteModule
      ),
  },
  {
    path: 'corso',
    loadChildren: () =>
      import('./modules/corso/corso.module').then((m) => m.CorsoModule),
  },
  {
    path: 'professore',
    loadChildren: () =>
      import('./modules/professore/professore.module').then(
        (m) => m.ProfessoreModule
      ),
  },
  {
    path: 'studente-form',
    loadChildren: () =>
      import('./modules/studente-form/studente-form.module').then(
        (m) => m.StudenteFormModule
      ),
  },
  {
    path: 'professore-form',
    loadChildren: () =>
      import('./modules/professore-form/professore-form.module').then(
        (m) => m.ProfessoreFormModule
      ),
  },
  {
    path: 'corso-form',
    loadChildren: () =>
      import('./modules/corso-form/corso-form.module').then(
        (m) => m.CorsoFormModule
      ),
  },
  {
    path: 'registration-form',
    loadChildren: () =>
      import('./modules/registration-form/registration-form.module').then(
        (m) => m.RegistrationFormModule
      ),
  },
  {
    path: 'insegnamento-form',
    loadChildren: () =>
      import('./modules/insegnamento-form/insegnamento-form.module').then(
        (m) => m.InsegnamentoFormModule
      ),
  },
  {
    path: 'registrations',
    loadChildren: () =>
      import('./modules/registrations/registrations.module').then(
        (m) => m.RegistrationsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
