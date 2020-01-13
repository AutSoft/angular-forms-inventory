import { ErrorStateMatcher } from '@angular/material';
import { FormGroupDirective, NgForm, FormControl, AbstractControl } from '@angular/forms';

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  constructor(private control: AbstractControl) {}

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return this.control.dirty && this.control.invalid;
  }
}
