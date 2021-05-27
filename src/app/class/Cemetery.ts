export class Cemetery {

  id_grave: number;
  id_user: number;
  coor1: number;
  coor2: number;
  coor3: number;
  coor4: number;
  type: string;
}

export class Corpses{
  id_corpse: number;
  id_grave: number;
  name: string;
  lastname: string;
  birthDay: Date;
  deadDay: Date;
  paidBy: Date;

}