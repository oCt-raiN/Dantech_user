import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent {
  //form
  form: FormGroup;
  loading = false;
  submitted = false;
  result: any;
  clinicid: any;
  phone_number: any;
  clinic_name: any;

  // authenticate user
  user_data: any;
  stat_user: string;
  userId: string;
  userType: string;
  accessToken: string;
  userToken: any;
  userdata: any;
  UserDetails: any;
  userDetailsSubscription: Subscription;
  userObject: void;
  //form
  selectedOption: string = '';
  // check prescence
  gst_no = false;
  img_uploaded = false;
  type1Checkboxes = [
    'Wax-Up',
    'Crown',
    'Veener',
    'Inlay',
    'Bridge',
    'Onlay',
    'Endocrown',
    'Interim',
  ];
  type2Checkboxes = ['Screw', 'Cement', 'Hole'];

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private authservice: AuthService,
    private route: ActivatedRoute
  ) {}

  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    const { userToken } = JSON.parse(localStorage.getItem('user') ?? '{}');
    const { fullName } = JSON.parse(localStorage.getItem('user') ?? '{}');
    const { accessToken } = JSON.parse(localStorage.getItem('user') ?? '{}');
    this.accessToken = accessToken;
    this.userId = userToken;
    this.userType = fullName;

    const type1Array = this.formBuilder.array(
      this.type1Checkboxes.map(() => false),
      Validators.required
    );

    const type2Array = this.formBuilder.array(
      this.type2Checkboxes.map(() => false),
      Validators.required
    );

    //validation
    this.form = this.formBuilder.group({
      doctor_name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-z]*$/),
          Validators.minLength(3),
        ],
      ],

      patientname: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-z]*$/),
          Validators.min(3),
        ],
      ],

      doctorid: ['', [Validators.required]],
      service: ['', [Validators.required]],
      orderdate: ['', [Validators.required]],
      orderduedate: ['', [Validators.required]],
      type1: type1Array,
      type2: type2Array,
    });
    //user details
    this.userDetailsSubscription = this.authservice
      .getUserDetails(this.userId)
      .subscribe(
        (res: any) => {
          this.UserDetails = res;
          this.stat_user = this.UserDetails['statuscode'];
          console.log('My User details', this.UserDetails);
          const userObject = this.UserDetails['profile'];

          this.user_data = [this.userdata];
          // console.log(this.user_data);
        },
        (error: any) => {
          console.log('Error fetching user details:', error);
        }
      );

    //For teeth selection

    $(document).ready(function () {
      var selectedTeeth: { [key: string]: boolean } = {}; // Object to store selected teeth states
      var $toothNumber = $('.tooth-number');

      $('.tooth').on('click touchstart', function (event) {
        var $this = $(this);
        var toothText: string = $this.data('title');

        if (!selectedTeeth[toothText]) {
          // If the tooth is not already selected, mark it as selected
          selectedTeeth[toothText] = true;
          $this.addClass('active');
        } else {
          // If the tooth is already selected, unselect it
          selectedTeeth[toothText] = false;
          $this.removeClass('active');
        }

        updateNextStepButton();
      });

      function updateNextStepButton() {
        var selectedTeethCount =
          Object.values(selectedTeeth).filter(Boolean).length;

        if (selectedTeethCount > 0) {
          $toothNumber
            .removeClass('disabled')
            .data('nextStep', selectedTeethCount);
          $toothNumber.html('Selected: ' + selectedTeethCount + ' &times;');
        } else {
          $toothNumber.addClass('disabled').data('nextStep', '');
          $toothNumber.html('test &times;');
        }

        console.log(selectedTeeth); // Log the selected teeth
      }
    });
  }

  updateCheckbox(index: number, type: string): void {
    const checkboxArray = this.form.get(type) as FormArray;
    checkboxArray.controls[index].setValue(
      !checkboxArray.controls[index].value
    );
  }
  // Rename the original getSelectedOptions method
  getSelectedOptionsForType1(): string {
    const selectedOptions: string[] = [];
    const type1Array = this.form.get('type1') as FormArray;

    type1Array.controls.forEach((control, index) => {
      if (control.value) {
        selectedOptions.push(this.type1Checkboxes[index]);
      }
    });

    return selectedOptions.join(','); // Convert the array to a string separated by commas
  }

  // Add a new method for getting selected options for type2
  getSelectedOptionsForType2(): string {
    const selectedOptions: string[] = [];
    const type2Array = this.form.get('type2') as FormArray;

    type2Array.controls.forEach((control, index) => {
      if (control.value) {
        selectedOptions.push(this.type2Checkboxes[index]);
      }
    });

    return selectedOptions.join(','); // Convert the array to a string separated by commas
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    const selectedOptionsType1 = this.getSelectedOptionsForType1();
    const selectedOptionsType2 = this.getSelectedOptionsForType2();

    console.log('Selected Options Type1:', selectedOptionsType1);
    console.log('Selected Options Type2:', selectedOptionsType2);

    const formdata = {
      result: {
        type1: 'Crown & Bridge',
        options1: selectedOptionsType1,
        type2: 'Implant crown & Bridge',
        options2: selectedOptionsType2,
      },
    };

    console.log('My form data', formdata);
    console.log(this.form.value);

    if (this.form.invalid) {
      return;
    }
  }
}
