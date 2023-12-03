import { Component } from '@angular/core';
import { viewdat, Viewdata, doclist, doctorlist } from './view.data';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent {
  OrderDetails: Viewdata[];
  viewdatalist: any[] = [];
  // doctor list
  docdetails: doclist[];
  //search table
  searchText: string = '';
  filteredData: any[] = [];
  sortcolumn: string = '';
  sortDirection: string = 'asc';
  // adddoctors form
  form : FormGroup;
  loading= false;
  submitted= false;
  resut: any

  constructor(public router: Router, 
    private activatedRoute: ActivatedRoute,    
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, 
    private authservice:AuthService,) {
    this.OrderDetails = viewdat;
    this.docdetails = doctorlist;

  }

  ngOnInit(): void {
    this.viewdatalist = this.OrderDetails;
    this.filteredData = doctorlist;

    this.form = this.formBuilder.group({
      docname: ['',[Validators.required,Validators.pattern(/^[A-z]*$/),Validators.minLength(3)]],
    });
  }

  get f() { return this.form.controls; }

  //form submit
  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.authservice.adddoctor(this.form.value)
    .pipe(first())
    .subscribe({
      next: () => {
        this.router.navigate(['/det/profile/view']);
      },
      error: error => {
        // this.alertService.error(error);
        this.loading = false;
      }
    });
  }

  //table doctors
  //sort coloumn
  sortColumn(column: string) {
    // Check if the column is already sorted
    if (this.sortcolumn === column) {
      // If the same column is clicked again, toggle the sorting order
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // If a different column is clicked, set the sorting column and direction
      this.sortcolumn = column;
      this.sortDirection = 'asc'; // Default to ascending order
    }

    // Sort the filtered data based on the chosen column and direction
    this.filteredData.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (this.sortDirection === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
  }

  filterData() {
    if (this.searchText) {
      console.log('Hi');
      this.filteredData = this.docdetails.filter((item) => {
        console.log('My data', this.filteredData);
        // Customize the filtering logic as needed
        return (
          item.clinicid.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.doctorid.includes(this.searchText) ||
          item.doctorname.includes(this.searchText)
        );
      });
    } else {
      this.filteredData = this.docdetails; // If searchText is empty, show all data
    }
  }
}
