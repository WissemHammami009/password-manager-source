import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmComponent } from './confirm/confirm.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SettingsComponent } from './settings/settings.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
    {path:"home",component:HomeComponent},
    {path:"signin",component:LoginComponent},
    {path:"signup",component:SignupComponent},
    {path:"dashboard",component:DashboardComponent},
    {path:"settings",component:SettingsComponent},
    {path:"confirm/:id",component:ConfirmComponent},
    {path:"navbar",component: NavbarComponent},
    {path:"",pathMatch:"full",redirectTo:"home"}
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }