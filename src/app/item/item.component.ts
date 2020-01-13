import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Item, InventoryClient } from '../api/inventory.generated';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  itemForm: FormGroup;
  itemId: number;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private inventoryClient: InventoryClient) {
    this.itemForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      type: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      description: new FormControl('', Validators.required)
    });

    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.itemId = params.id;
        this.loadItem();
      } else {
        this.itemForm.reset();
      }
    });
  }

  ngOnInit() {  }

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
    this.inventoryClient.getItemsById(this.itemId).subscribe(item => this.itemForm.patchValue(item));
  }

}
