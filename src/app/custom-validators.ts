import { ValidationErrors, AbstractControl } from '@angular/forms';

export class CustomValidators {

  static onlyWeekDays(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const day = control.value.getDay();
    if (day !== 0 && day !== 6) {
      return null;
    }
    return { weekend: true };
  }

}
