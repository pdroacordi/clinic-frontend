import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { AuthGuard } from './services/auth/login.guard';
import { AnamnesisComponent } from './components/anamnesis/anamnesis.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", component: MainComponent, canActivate: [AuthGuard] },
  { path: "anamnesis/:id", component: AnamnesisComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
