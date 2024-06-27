import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LoadingAnimationComponent } from './components/loading-animation/loading-animation.component';
import { MainComponent } from './components/main/main.component';
import { AnamnesisComponent } from './components/anamnesis/anamnesis.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingAnimationComponent,
    MainComponent,
    AnamnesisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
