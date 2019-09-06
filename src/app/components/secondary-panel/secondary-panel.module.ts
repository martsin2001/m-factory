import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondaryPanelComponent } from './container/secondary-panel/secondary-panel.component';
import { CollocutorCardComponent } from './presentational/collocutor-card/collocutor-card.component';
import { MaterialModule } from 'src/app/material/material.module';
import { MappingFoundUsersComponent } from './presentational/mapping-found-users/mapping-found-users.component';

const COMPONENTS: any[] = [SecondaryPanelComponent];

@NgModule({
  declarations: [...COMPONENTS, CollocutorCardComponent, MappingFoundUsersComponent],
  imports: [CommonModule, MaterialModule],
  exports: [...COMPONENTS]
})
export class SecondaryPanelModule {}
