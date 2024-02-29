import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './layout/home/home.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { LayoutService } from './service/layout/layout.service';
import { LoginComponent } from './layout/login/login.component';
import { AuthenticationService } from './service/authentication/authentication.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { RegisterComponent } from './layout/register/register.component';
import { UserInformationComponent } from './layout/user-information/user-information.component';
import { UserInfoService } from './service/information/user-info.service';
import {CalendarModule} from 'primeng/calendar';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {CreateAccountService} from "./service/create-account/create-account.service";
import { AccountManagementComponent } from './account-management/account-management.component';
import { WatermarkingService } from './service/watermarking/watermarking.service';
import { ExamManagementComponent } from './exam-management/exam-management.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { ExamManagementListComponent } from './exam-management-list/exam-management-list.component';
import { ExamStudentListComponent } from './exam-student-list/exam-student-list.component';
import { ExamStudentComponent } from './exam-student/exam-student.component';
import { ExamDetailComponent } from './exam-detail/exam-detail.component';
import { CookieService } from 'ngx-cookie-service';
import { JWT_OPTIONS, JwtInterceptor } from '@auth0/angular-jwt';
import { BlankPageComponent } from './layout/blank-page/blank-page.component';

export function tokenGetter(){
  return localStorage.getItem('auth_token')
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SideBarComponent,
    LoginComponent,
    RegisterComponent,
    UserInformationComponent,
    AccountManagementComponent,
    ExamManagementComponent,
    ExamManagementListComponent,
    ExamStudentListComponent,
    ExamStudentComponent,
    ExamDetailComponent,
    BlankPageComponent
  ],
  imports: [
    InputNumberModule,
    MultiSelectModule,
    ReactiveFormsModule,
    CKEditorModule,
    CalendarModule,
    BrowserModule,
    NgbNavModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: () => ({
          tokenGetter: tokenGetter,
          allowedDomains: ["localhost:8080"]

        }),
        deps: [],
        
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    LayoutService, 
    AuthenticationService, 
    UserInfoService, 
    CreateAccountService,
    WatermarkingService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
