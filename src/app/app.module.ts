import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HomeComponent } from './shared/components/home/home.component';
import { PagenotfoundComponent } from './shared/components/pagenotfound/pagenotfound.component';
import { PostsdashboardComponent } from './shared/components/postsdashboard/postsdashboard.component';
import { PostComponent } from './shared/components/post/post.component';
import { PostsformComponent } from './shared/components/postsform/postsform.component';
import { PostscardComponent } from './shared/components/postscard/postscard.component';
import { MaterialModule } from './shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AuthinterceptorService } from './shared/services/authinterceptor.service';
import { ConfirmComponent } from './shared/components/confirm/confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PagenotfoundComponent,
    PostsdashboardComponent,
    PostComponent,
    PostsformComponent,
    PostscardComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthinterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
