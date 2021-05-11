export class Registration {

  id_user: number;
  id_grave : number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  number: string;

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
