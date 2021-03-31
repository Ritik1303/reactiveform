import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
import {FormBuilder, FormGroup, Validators, FormArray, AbstractControl, FormControl} from '@angular/forms';
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
  get alternatemobile(){
    return this.registrationform.get('alternatemobile') as FormArray;
  }
  get lastname(){
    return this.registrationform.get('lastname');
  }
  get username(){
    return this.registrationform.get('username');
  }
  get mobile(){
    return this.registrationform.get('mobile');
  }
  get password(){
    return this.registrationform.get('password');
  }
  get conpassword(){
    return this.registrationform.get('conpassword');
  }
 


  addalternateemail(){
    this.alternateemail.push(this.fb.control(''));
  }
  addalternatemobile(){
    this.alternatemobile.push(this.fb.control(''));
  }
  randomNumber = (min = 1, max = 10) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  constructor(private fb:FormBuilder, private _registrationService: RegistrationService){}
  ngOnInit(){
    this.registrationform = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3),forbiddennameValidator(/password/),forbiddennameValidator(/admin/)]], 
      lastname: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      subscribe: [false],
      password: ['', [Validators.required, Validators.minLength(6)]],
      conpassword: [''],
      address: this.fb.group({
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required]
      }),
      alternateemail: this.fb.array([]),
      alternatemobile: this.fb.array([]),
      firstNumber:[this.randomNumber()],
      secondNumber:[this.randomNumber()],
      answer:['',[Validators.required, this.answerValidator]]
      
    },{validator: passwordvalidator} );
  }


  answerValidator(control: AbstractControl) {
    console.log(control.value);
    const { firstNumber, secondNumber, answer } = control.value;
    console.log(firstNumber);

    if (parseInt(answer) === parseInt(firstNumber) + parseInt(secondNumber)) {
      return null;
    }
    return { math: true };
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

