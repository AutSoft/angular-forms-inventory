import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../custom-validators';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  itemForm: FormGroup;

  constructor() {
    this.itemForm = new FormGroup({
      name: new FormControl(undefined, Validators.required),
      type: new FormControl(undefined, Validators.required),
      description: new FormControl(undefined, Validators.required),
      count: new FormControl(undefined, [Validators.required, Validators.min(0)]),
      countDate: new FormControl(undefined, [Validators.required, CustomValidators.onlyWeekDays]),
      dimension: new FormGroup({
        width: new FormControl(),
        height: new FormControl(),
        depth: new FormControl(),
      }, CustomValidators.validVolume)
    });
  }

  save() {
    console.log(this.itemForm.value);
  }

  ngOnInit() { }

}
