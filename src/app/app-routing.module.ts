import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';
import { ItemComponent } from './item/item.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: InventoryComponent },
  { path: 'item',  component: ItemComponent },
  { path: 'item/:id',  component: ItemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
