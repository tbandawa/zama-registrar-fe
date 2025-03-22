import { NgModule } from '@angular/core'
import { CommonModule, JsonPipe, NgIf, NgTemplateOutlet } from '@angular/common'
import { DashboardComponent } from './dashboard.component'
import { RouterModule, Routes } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { HammerModule } from '@angular/platform-browser'
import { ImageCropperModule } from 'ngx-image-cropper'
import { NgbToastModule, NgbTypeaheadModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'
import { NgLetModule } from 'ng-let'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { DecimalPipe, NgFor } from '@angular/common'
import { CalendarModule, DateAdapter } from 'angular-calendar'
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns'
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component'
import { SidebarComponent } from './navigation/sidebar/sidebar.component'
import { HeaderComponent } from './navigation/header/header.component'
import { FooterComponent } from './navigation/footer/footer.component'
import { SidenavComponent } from './navigation/sidenav/sidenav.component'
import { WrapperComponent } from './navigation/wrapper/wrapper.component'
import { authGuard } from 'src/app/utils/auth.guard'
import { ToastComponent } from './toasts/toast.component'
import { ProfileComponent } from './profile/components/profile/profile.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { UsersComponent } from './users/components/users/users.component'
import { UserComponent } from './users/components/user/user.component'
import { NewUserComponent } from './users/components/new-user/new-user.component'
import { MembersComponent } from './members/components/members/members.component'
import { MembersPaginationComponent } from './members/containers/members-pagination/members-pagination.component'
import { MembersTableComponent } from './members/containers/members-table/members-table.component'
import { ButtonModule } from 'primeng/button'
import { TableModule } from 'primeng/table'
import { PrintModalComponent } from './modals/print-modal/print-modal.component'
import { MemberComponent } from './members/components/member/member.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/members', pathMatch: 'full' },
  {
    path: '', component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: 'members', component: MembersComponent },
      { path: 'members/:id', component: MemberComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'users', component: UsersComponent },
      { path: 'user/new', component: NewUserComponent },
      { path: 'user/:id', component: UserComponent }
    ]
  }
]

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    UsersComponent,
    UserComponent,
    ProfileComponent,
    DeleteModalComponent,
    PrintModalComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    WrapperComponent,
    ToastComponent,
    NewUserComponent,
    MembersComponent,
    MemberComponent,
    MembersPaginationComponent,
    MembersTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HammerModule,
    NgbToastModule,
    NgbTooltipModule,
    NgbToastModule,
    NgIf,
    NgTemplateOutlet,
    NgFor,
    NgLetModule,
    DecimalPipe,
    FormsModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    ImageCropperModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgbTimepickerModule,
    FormsModule,
    JsonPipe,
    DragDropModule,
    ButtonModule,
    TableModule
  ],
  providers: [
    
  ]
})
export class DashboardModule { }
