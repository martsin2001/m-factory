import { NgModule } from '@angular/core';
import { AboutUsComponent } from './containers/about-us/about-us.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AboutUsComponent],
  imports: [RouterModule.forChild([{ path: '', component: AboutUsComponent }])]
})
export class AboutUsModule {}
