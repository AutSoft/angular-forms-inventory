import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { Item, InventoryClient, Currency } from '../api/inventory.generated';
import { CustomValidators } from '../custom-validators';
import { CustomErrorStateMatcher } from '../custom-error-state-matcher';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  itemForm: FormGroup;
  itemId: number;
  dimensionToggleControl = new FormControl();
  customErrorMatcher: CustomErrorStateMatcher;
  currencies: { value: number, label: string }[] = Object.keys(Currency)
    .filter(x => !isNaN(+x))
    .map(x => ({ value: +x, label: Currency[x] as string }));
  typeItems: Observable<string[]>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private inventoryClient: InventoryClient) {
    this.itemForm = new FormGroup({
      name: new FormControl(undefined, [Validators.required, Validators.maxLength(20)]),
      type: new FormControl(undefined, [Validators.required, Validators.maxLength(50)]),
      description: new FormControl(undefined, Validators.required),
      count: new FormControl(undefined, [Validators.required, Validators.min(0)]),
      countDate: new FormControl(undefined, [Validators.required, CustomValidators.onlyWeekDays]),
      dimension: new FormGroup({
        width: new FormControl(),
        height: new FormControl(),
        depth: new FormControl(),
      }, CustomValidators.validVolume),
      price: new FormControl()
    });

    this.customErrorMatcher = new CustomErrorStateMatcher(this.itemForm.get('dimension'));

    this.dimensionToggleControl.valueChanges.subscribe(x => this.dimensionToggleChange(x));

    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.itemId = params.id;
        this.loadItem();
      } else {
        this.itemForm.reset();
        this.dimensionToggleControl.setValue(false);
      }
    });
  }

  ngOnInit() {
    this.typeItems = this.itemForm.controls.type.valueChanges
      .pipe(
        filter(x => !!x && x.length >= 3),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => this.inventoryClient.typeaheadType(term))
      );
  }

  save() {
    const requestModel = new Item(this.itemForm.value);
    if (this.itemId) {
      this.inventoryClient.updateItem(this.itemId, requestModel).subscribe(
        () => this.router.navigate(['/'])
      );
    } else {
      this.inventoryClient.createItem(requestModel).subscribe(
        () => this.router.navigate(['..'], { relativeTo: this.activatedRoute })
      );
    }
  }

  private loadItem() {
    this.inventoryClient.getItemsById(this.itemId).subscribe(item => {
      this.itemForm.patchValue({
        ...item,
        dimension: item.dimension || {}
      });
      this.dimensionToggleControl.setValue(item.dimension ? true : false);
    });
  }

  private dimensionToggleChange(checked: boolean) {
    if (checked) {
      this.itemForm.controls.dimension.enable();
    } else {
      this.itemForm.controls.dimension.disable();
    }
  }

}
