import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-shopping-form',
  templateUrl: './shopping-form.component.html',
  styleUrls: ['./shopping-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
