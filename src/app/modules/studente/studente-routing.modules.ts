import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StudenteComponent } from "./studente.component";

const routes: Routes = [
    { path: '', component: StudenteComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudenteRoutingModule { }
