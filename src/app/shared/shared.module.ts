import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMappingComponent } from './error-mapping/error-mapping.component';

@NgModule({
  declarations: [ErrorMappingComponent],
  imports: [CommonModule],
  exports: [ErrorMappingComponent]
})
export class SharedModule {}
