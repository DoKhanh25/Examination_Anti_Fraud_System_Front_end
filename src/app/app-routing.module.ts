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
import { BlankPageComponent } from './layout/blank-page/blank-page.component';
import { AdminGuard } from './service/admin.guard';
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
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'examManagement',
    component: ExamManagementComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'examManagementList',
    component: ExamManagementListComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'examStudentList',
    component: ExamStudentListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'exam-detail/:id',
    component: ExamStudentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'examDetail/:id/:studentUsername',
    component: ExamDetailComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'blank-page',
    component: BlankPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
