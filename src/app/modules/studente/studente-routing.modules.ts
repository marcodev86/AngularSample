import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StudenteDetailComponent } from "../studente-detail/studente-detail.component";
import { StudenteComponent } from "./studente.component";

const routes: Routes = [
    { path: '', component: StudenteComponent },
    { path: 'detail', component: StudenteDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudenteRoutingModule { }
