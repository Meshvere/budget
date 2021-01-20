import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pellets-form',
  templateUrl: './pellets-form.component.html',
  styleUrls: ['./pellets-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PelletsFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
