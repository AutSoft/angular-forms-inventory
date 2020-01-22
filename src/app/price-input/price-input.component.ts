import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Price } from '../api/inventory.generated';

@Component({
  selector: 'app-price-input',
  templateUrl: './price-input.component.html',
  styleUrls: ['./price-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PriceInputComponent),
      multi: true
    }
  ]
})
export class PriceInputComponent implements OnInit, ControlValueAccessor {
  @Input() currencies: { value: number, label: string }[];
  priceForm: FormGroup;
  private onTouched: any;

  constructor() {
    this.priceForm = new FormGroup({
      value: new FormControl(),
      currency: new FormControl()
    });
  }

  ngOnInit() {
  }

  writeValue(v: Price) {
    this.priceForm.controls.value.setValue(v == null ? null : v.value);
    this.priceForm.controls.currency.setValue(v == null ? null : v.currency);
  }

  registerOnChange(fn: (price: Price) => void) {
    this.priceForm.valueChanges
      .pipe(
        map(p => (p.value === null || p.currency === null) ? null : p )
      )
      .subscribe(fn);
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.priceForm.disable();
    } else {
      this.priceForm.enable();
    }
  }

  blurred() {
    this.onTouched();
  }

}
