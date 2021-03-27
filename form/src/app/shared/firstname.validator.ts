import { AbstractControl, ValidatorFn } from "@angular/forms";


export function forbiddennameValidator(forbiddenname:RegExp):ValidatorFn{
   return (control: AbstractControl): {[key:string]:any}|null=> {
        const forbidden= forbiddenname.test(control.value);
        return forbidden ?{'forbiddenname': {value: control.value}}:null;
    
    };

}