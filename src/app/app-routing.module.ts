import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsDemoComponent } from './forms-demo/forms-demo.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ItemComponent } from './item/item.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: InventoryComponent },
  { path: 'item',  component: ItemComponent },
  { path: 'item/:id',  component: ItemComponent },
  { path: 'forms-demo', component: FormsDemoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
