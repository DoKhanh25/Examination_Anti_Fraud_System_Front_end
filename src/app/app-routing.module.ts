import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './layout/login/login.component';
import { AuthGuard } from './service/auth.guard';
import { LoginGuard } from './service/login.guard';
import { RegisterComponent } from './layout/register/register.component';
import { UserInformationComponent } from './layout/user-information/user-information.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { ExamManagementComponent } from './exam-management/exam-management.component';
import { ExamManagementListComponent } from './exam-management-list/exam-management-list.component';
import { ExamStudentListComponent } from './exam-student-list/exam-student-list.component';
import { ExamStudentComponent } from './exam-student/exam-student.component';
import { ExamDetailComponent } from './exam-detail/exam-detail.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'information',
    component: UserInformationComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'accountManagement',
    component: AccountManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'examManagement',
    component: ExamManagementComponent
  },
  {
    path: 'examManagementList',
    component: ExamManagementListComponent
  },
  {
    path: 'examStudentList',
    component: ExamStudentListComponent
  },
  {
    path: 'exam-detail/:id',
    component: ExamStudentComponent
  },
  {
    path: 'examDetail/:id/:studentUsername',
    component: ExamDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
