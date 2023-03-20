import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule],
  declarations: [AppComponent, AuthLayoutComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
