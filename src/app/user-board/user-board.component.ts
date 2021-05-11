import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { Cemetery, Corpses } from '../class/Cemetery';
import { Payment } from '../class/Registration';

@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.css']
})
export class UserBoardComponent implements OnInit {
  
  cemetery: Cemetery[];
  corpses : Corpses[];
  payment : Payment[];

  constructor(private ApiService: ApiService) { }

  ngOnInit(): void {
    console.log("user cemetery", this.cemetery);
    this.ApiService.readUserGraves().subscribe((cemetery: Cemetery[])=>{
      this.cemetery = cemetery;
    });

    console.log("user corpse", this.corpses);
    this.ApiService.readUserCorpses().subscribe((corpses: Corpses[])=>{
      this.corpses = corpses;
    });

    console.log("user corpse", this.corpses);
    this.ApiService.readUserPayment().subscribe((payment: Payment[])=>{
      this.payment = payment;
    });
  } 
}
