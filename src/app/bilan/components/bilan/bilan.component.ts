import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bilan',
  templateUrl: './bilan.component.html',
  styleUrls: ['./bilan.component.scss']
})
export class BilanComponent implements OnInit {
    public deltaMonth:number = 6;
    public month:number[] = [];

    constructor() {
        for(let i:number = - this.deltaMonth; i <= this.deltaMonth; i++) {
            this.month.push(i);
        }
    }

    ngOnInit(): void {
    }

}
