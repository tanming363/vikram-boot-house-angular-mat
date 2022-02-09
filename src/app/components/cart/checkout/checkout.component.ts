import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      fullname: ['', Validators.required],
      address1: ['', Validators.required],
      state: ['Maharashtra',
        Validators.required],
      mobile: ['', Validators.required],
      city: ['', Validators.required],
      address2: [''],
      landmark: [''],
      email: [''],
      pincode: [''],
      country: ['India'],
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }

  onSubmitFirstFormGroup() {
    console.log(this.firstFormGroup.value);
  }

  onSubmitSecondFormGroup() {
    console.log(this.secondFormGroup.value);
  }

}