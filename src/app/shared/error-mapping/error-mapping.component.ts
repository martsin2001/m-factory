import { Component, OnInit, Input } from '@angular/core';
import { ErrorContent } from './error-content';

@Component({
  selector: 'app-error-mapping',
  templateUrl: './error-mapping.component.html',
  styleUrls: ['./error-mapping.component.scss']
})
export class ErrorMappingComponent implements OnInit {
  @Input() set currentError(error: { errorKey: any; mappingKey: string }) {
    this.setErrorMessage = {
      ...error,
      errorKey: Object.keys(error.errorKey)[0]
    };
  }
  errorMessage: string;

  constructor() {}

  ngOnInit() {}

  private set setErrorMessage(error: { errorKey: string; mappingKey: string }) {
    if (ErrorContent[error.mappingKey]) {
      this.errorMessage =
        ErrorContent[error.mappingKey][error.errorKey] || ErrorContent.default;
    }
  }
}
