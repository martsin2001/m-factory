import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'prefix'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/auth/auth.module').then(m => m.AuthModule),
    pathMatch: 'prefix'
  },
  {
    path: 'about-us',
    loadChildren: () =>
      import('./components/about-us/about-us.module').then(m => m.AboutUsModule)
  },
  {
    path: 'main-toolbar',
    loadChildren: () =>
      import('./components/main-toolbar/main-toolbar.module').then(
        m => m.MainToolbarModule
      ),
    canActivate: [AuthGuardService]
  },
  { path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
