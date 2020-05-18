import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ErrorInterceptor } from './helpers/error.interceptor';
import { fakeBackendProvider } from './helpers/fake.backend';
import { MaterialModule } from './shared/material.module';
import { NotAuthGuard } from './guards/not-auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderComponent } from './shared/common/header/header.component';
import { FooterComponent } from './shared/common/footer/footer.component';
import { FormInputComponent } from './shared/common/form-components/form-input/form-input.component';
import { SearchComponent } from './shared/common/header/search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScheduleComponent } from './main-page/components/schedule/schedule.component';
import { ScheduleItemComponent } from './main-page/components/schedule-item/schedule-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginPageComponent,
    RegisterPageComponent,
    MainPageComponent,
    HeaderComponent,
    FooterComponent,
    FormInputComponent,
    SearchComponent,
    ScheduleComponent,
    ScheduleItemComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    fakeBackendProvider,
    NotAuthGuard,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
