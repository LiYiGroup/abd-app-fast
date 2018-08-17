import { Component, OnInit } from '@angular/core';
import { basicAndSealModel } from '../../../models/inner-order.model';

@Component({
  selector: 'app-inner-order',
  templateUrl: './inner-order.component.html',
  styleUrls: ['./inner-order.component.css']
})
export class InnerOrderComponent implements OnInit {

  constructor() { }

  // ORDER LIST FORM
  basicAndSealModel = new basicAndSealModel();

  ngOnInit() {
  }

}
