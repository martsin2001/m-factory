import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './core/auth/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { ChatEffects } from './core/chat/chat.effects';
import { StoreModule } from '@ngrx/store';
import { ChatReducer } from './core/chat/chat.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppReducers } from './core/app.reducer';
import { UserEffects } from './core/auth/auth.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('app-state', AppReducers),
    EffectsModule.forRoot([ChatEffects, UserEffects]),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    ChatEffects,
    UserEffects
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
