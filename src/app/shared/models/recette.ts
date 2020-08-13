import {Compte} from '../enum/compte.enum';

export class Recette {
    public id:string = 'test';
    public date:Date;
    public compte:Compte = Compte.PERSO;
    public objet:string;
    public montant:number;
    public partage:boolean = false;
    public commentaire:string;
    public waiting:boolean = false;


    constructor(init?:Partial<Recette>) {
      Object.assign(this, init);
    }

    public get montantPercu():number {
        return this.partage?(this.montant/2):this.montant;
    }
}
