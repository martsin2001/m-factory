import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainToolbarComponent } from './containers/main-toolbar/main-toolbar.component';
import { Routes, RouterModule } from '@angular/router';
import { SecondaryPanelModule } from '../secondary-panel/secondary-panel.module';
import { ChatPlatformModule } from '../chat-platform/chat-platform.module';

const routes: Routes = [
  { path: '', component: MainToolbarComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [MainToolbarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SecondaryPanelModule,
    ChatPlatformModule
  ]
})
export class MainToolbarModule {}
