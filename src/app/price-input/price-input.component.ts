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

  constructor() {
    this.priceForm = new FormGroup({
      value: new FormControl(undefined, Validators.min(0)),
      currency: new FormControl()
    });
  }

  ngOnInit() {
  }

  registerOnChange(fn: any): void {
    this.priceForm.valueChanges
      .pipe(map((p: Price) => (p.value == null || p.currency == null) ? null : p))
      .subscribe(fn);
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.priceForm.disable();
    } else {
      this.priceForm.enable();
    }
  }

  writeValue(v: Price): void {
    this.priceForm.controls.value.setValue((v && v.value) || null);
    this.priceForm.controls.currency.setValue((v && v.currency) || null);
  }

}
