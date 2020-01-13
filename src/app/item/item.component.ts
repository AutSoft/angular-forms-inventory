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

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private inventoryClient: InventoryClient) {
    this.itemForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      type: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      description: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.params.id);
  }

  save() {
    const requestModel = new Item(this.itemForm.value);
    this.inventoryClient.createItem(requestModel).subscribe(
      () => this.router.navigate(['..'], { relativeTo: this.activatedRoute })
    );
  }

}
