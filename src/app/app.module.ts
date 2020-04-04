import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FirebaseService } from './services/firebase.service';
import { HomeComponent } from './home/home.component';
import { ViewRestaurantComponent } from './view-restaurant/view-restaurant.component';
import { ViewRestaurantrResolver } from './view-restaurant/view-restaurant.resolver';
import { AgmCoreModule } from '@agm/core';
import { MapsAPILoader } from '@agm/core';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ViewRestaurantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAR_S2FNyZx2yewwCwv3Z48X3bE6sy_t1k'
    })
  ],
  providers: [FirebaseService, ViewRestaurantrResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
