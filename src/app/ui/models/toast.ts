export class Toast {
    public id:number;
    public title: string;
    public message: string;
    public type: string = Toast.NORMAL;
    public autoClose:boolean = false;
    public autoCloseDelay:number;

    public static LOADING:string = 'toast-loading';
    public static NORMAL:string = 'toast-primary';
    public static SUCCESS:string = 'toast-success';
    public static WARNING:string = 'toast-warning';
    public static ERROR:string = 'toast-error';

    constructor(init?:Partial<Toast>) {
        Object.assign(this, init);

        this.id = new Date().getTime();

        if(this.type == Toast.LOADING) {
             this.autoClose = true;
        } else if(this.type == Toast.SUCCESS) {
            this.autoClose = true;

            if(this.autoCloseDelay == undefined) {
                this.autoCloseDelay = 3;
            }
        }
    }
}
