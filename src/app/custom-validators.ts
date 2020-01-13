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

  static validVolume(control: AbstractControl): ValidationErrors | null {
    const w = control.get('width')  && control.get('width').value;
    const h = control.get('height') && control.get('height').value;
    const d = control.get('depth')  && control.get('depth').value;
    if ((w > 0 && h > 0 && d > 0) || (w === null && h === null && d === null)) {
      return null;
    }
    return { invalidvolume: true };
  }

}
