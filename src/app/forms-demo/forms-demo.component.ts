import { Component, OnInit } from '@angular/core';

interface User {
  name: string;
  email: string;
  age: number;
}

@Component({
  selector: 'app-forms-demo',
  templateUrl: './forms-demo.component.html',
  styleUrls: ['./forms-demo.component.scss']
})
export class FormsDemoComponent implements OnInit {
  user = {
    name: undefined,
    email: undefined,
    age: undefined
  };

  constructor() { }

  ngOnInit() {
  }

  save() {
    console.log(this.user);
  }

}
