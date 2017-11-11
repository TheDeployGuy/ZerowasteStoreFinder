import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AgmCoreModule } from '@agm/core';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StoreFinderComponent } from './components/store-finder/store-finder.component';
import { MapComponent } from './components/map/map.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { AddStoreComponent } from './components/add-store/add-store.component';
import { StoreComponent } from './components/store/store.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { DonateComponent } from './components/donate/donate.component';

// Import our services for the application
import { BackendService } from './services/backend.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchNavComponent } from './components/search-nav/search-nav.component';

// Tells angular where to direct the requests
const appRoutes: Routes = [
  {path: '', component: StoreFinderComponent},
  {path: 'about', component: AboutComponent},
  {path: 'addstore', component: AddStoreComponent},
  {path: 'search/:query', component: SearchResultsComponent},
  {path: 'donate', component: DonateComponent},
  {path: 'store/:id', component: StoreComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: '**', component: StoreFinderComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StoreFinderComponent,
    MapComponent,
    ContactComponent,
    AboutComponent,
    AddStoreComponent,
    StoreComponent,
    DashboardComponent,
    LoginComponent,
    FooterComponent,
    DonateComponent,
    SearchResultsComponent,
    SearchNavComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyAY6CukXgRddILNPPXpJ5j8CUepn2pX7p8',
        libraries: ['places'],
        language: 'en'
    })
  ],
  providers: [BackendService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
