import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InventoryClient } from '../api/inventory.generated';
import { CustomValidators } from '../custom-validators';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  itemForm: FormGroup;

  constructor(private route: ActivatedRoute, private inventoryClient: InventoryClient) {
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

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.inventoryClient.getItemsById(params.id).subscribe(item => this.itemForm.patchValue(item));
      } else {
        this.itemForm.reset();
      }
    });
  }

  save() {
    console.log(this.itemForm.value);
  }

}
