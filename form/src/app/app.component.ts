import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {forbiddennameValidator } from './shared/firstname.validator';
import { passwordvalidator } from './shared/password.validator';
import { RegistrationService }  from './registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  registrationform!: FormGroup;
  get firstname(){
    return this.registrationform.get('firstname');
  }
  get email(){
    return this.registrationform.get('email');
  }
  get alternateemail(){
    return this.registrationform.get('alternateemail') as FormArray;
  }
  addalternateemail(){
    this.alternateemail.push(this.fb.control(''));
  }

  constructor(private fb:FormBuilder, private _registrationService: RegistrationService){}
  ngOnInit(){
    this.registrationform = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3),forbiddennameValidator(/password/),forbiddennameValidator(/admin/)]], 
      lastname: [''],
      username: [''],
      email: [''],
      subscribe: [false],
      password: [''],
      conpassword: [''],
      address: this.fb.group({
        city: [''],
        state: [''],
        country: ['']
      }),
      alternateemail: this.fb.array([])
    },{validator: passwordvalidator} );


    this.registrationform.get('subscribe')!.valueChanges
      .subscribe(checkedValue =>{
        const email = this.registrationform.get('email');
        if(checkedValue){
          email?.setValidators(Validators.required);
        }
        else{
          email!.clearValidators();
        }
        email!.updateValueAndValidity();
      })
    
  }


 
 
  title = 'Form';
  // registrationform= new FormGroup({
  //   firstname: new FormControl('Ritik'),
  //   lastname: new FormControl(''),
  //   username: new FormControl(''),
  //   password: new FormControl(''),
  //   conpassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     country: new FormControl('')
  //   })
  // });
  load(){
    this.registrationform.patchValue({
      username:'Ritik123',
      address:{
        country:'India'
      }
    });

  }
  onSubmit(){
    console.log(this.registrationform.value);
    this._registrationService.register(this.registrationform.value)
    .subscribe(
      response=> console.log('success',response),
      error => console.log('error', error)
    )
  }
}
  function subscribe(arg0: (checkedValue: any) => void) {
    throw new Error('Function not implemented.');
  }

