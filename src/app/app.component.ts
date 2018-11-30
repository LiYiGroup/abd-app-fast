import { Component } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { element } from 'protractor';
import { elementAt } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;
  showFlag = true;
  MouseEnterFlag = false;

  HideAndShow(): void {
    this.showFlag = this.showFlag ? false : true;
  }

  OnMouseEnter(): void {
    this.MouseEnterFlag = true;
  }
  OnMouseLeave(): void {
    this.MouseEnterFlag = false;
  }
}