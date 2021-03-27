import { AbstractControl } from "@angular/forms";

export function passwordvalidator(control: AbstractControl): { [key: string]: boolean}| null{
    const password=control.get('password');
    const conpassword= control.get('conpassword');
    if(password!.pristine || conpassword!.pristine){
        return null;
    }
    return password && conpassword && password.value != conpassword.value ?
    {'mismatch' : true}:
    null;
}