import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

export function fileExtensionValidator(allowedExtensions: string[]) {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const file = control.value as File;
    if (!file) {
      return null; // If there's no file, return no error
    }

    let extension = file.name.split('.').pop();
    extension = extension ? extension.toLowerCase() : '';

    if (!allowedExtensions.includes(extension)) {
      return { invalidExtension: true };
    }

    return null;
  };
}

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
})
export class CreateOrderComponent {
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

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private authservice: AuthService,
    private route: ActivatedRoute
  ) {}
  onServiceSelect(event: any) {
    this.selectedOption = event.target.value;
    console.log(this.selectedOption);
  }

  ngOnInit(): void {
    const { userToken } = JSON.parse(localStorage.getItem('user') ?? '{}');
    const { fullName } = JSON.parse(localStorage.getItem('user') ?? '{}');
    const { accessToken } = JSON.parse(localStorage.getItem('user') ?? '{}');
    this.accessToken = accessToken;
    this.userId = userToken;
    this.userType = fullName;

    //validation
    this.form = this.formBuilder.group({
      doctor_name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-z]*$/),
          Validators.min(3),
        ],
      ],
      clinicid: ['', [Validators.required]],
      phonenumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      patientname: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-z]*$/),
          Validators.min(3),
        ],
      ],
      clinicname: [
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
    });
    //user details
    this.userDetailsSubscription = this.authservice
      .getUserDetails(this.userId)
      .subscribe(
        (res: any) => {
          this.UserDetails = res;
          this.stat_user = this.UserDetails['statuscode'];
          console.log('status', this.stat_user);
          // console.log('My details', this.UserDetails['profile']);
          const userObject = this.UserDetails['profile'];
          if (this.userdata['image'] != 'assets/images/users/user.svg') {
            this.img_uploaded = true;
          }
          if (this.userdata['gst'] != 'None') {
            this.gst_no = true;
          }

          this.user_data = [this.userdata];
          // console.log(this.user_data);
        },
        (error: any) => {
          console.log('Error fetching user details:', error);
        }
      );

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
  get f() {
    return this.form.controls;
  }

  submit() {
    window.alert('File submitted');
    this.router.navigate(['/pages/casedetail']);
  }
}
