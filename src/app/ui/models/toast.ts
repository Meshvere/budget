export class Toast {
    public title: string;
    public message: string;
    public type: string = Toast.NORMAL;
    public autoClose:boolean = false;

    public static LOADING:string = 'toast-loading';
    public static NORMAL:string = 'toast-primary';
    public static SUCCESS:string = 'toast-success';
    public static WARNING:string = 'toast-warning';
    public static ERROR:string = 'toast-error';

    constructor(init?:Partial<Toast>) {
        Object.assign(this, init);
    }
}
