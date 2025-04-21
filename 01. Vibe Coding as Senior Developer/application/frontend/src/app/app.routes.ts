import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VersandjobCreateComponent } from './components/versandjob-create/versandjob-create.component';
import { VersandjobListComponent } from './components/versandjob-list/versandjob-list.component';
import { VersandjobDetailComponent } from './components/versandjob-detail/versandjob-detail.component';
import { VersandjobSuccessComponent } from './components/versandjob-success/versandjob-success.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'versandjobs', component: VersandjobListComponent, canActivate: [authGuard] },
  { path: 'versandjob/neu', component: VersandjobCreateComponent, canActivate: [authGuard] },
  { path: 'versandjob/erfolg', component: VersandjobSuccessComponent, canActivate: [authGuard] },
  { path: 'versandjob/:id', component: VersandjobDetailComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/dashboard' }
];