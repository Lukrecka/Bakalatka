export class Registration {

  id_user: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  number: string;
  town: string;
  street: string;
  number_house: string;
  postcode: string;

}

export class DeleteA {

  id:number;
  type: string;
}

export class Payment{
  id_user: number;
  id_grave: number;
  paidDay: Date;
  type: string;
}

export class BuyGrave{
  id_user: number;
  id_grave: number;
 // paidDate: Date;
}
