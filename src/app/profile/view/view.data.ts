export interface Viewdata {
  clinicname: string;
  clinicno: number;
  clinicaddress: string;
  Specialisation: string;
  Email: string;
  cliniccity: string;
  clinicstate: string;
  dob: string;
  image: string;
  affiliation: string;
  licenseid: string;
  Clinicname: string;
  clinicclinicaddress: string;
  clinicnumber: number;
  Yearsofexperience: number;
  profilecompletionpercentage: string;
  gst: string;
  bankacc: string;
  ifsc: string;
  bankbranch: string;
  paymentmethod: string;
}

export const viewdat: Viewdata[] = [
  {
    clinicname: 'Rajan Hospital',
    clinicno: 8900898898,
    clinicaddress: 'Bay Area, San Francisco, CA',
    Specialisation: 'Orthodontics',
    Email: 'example@google.com',
    cliniccity: 'Velacherry',
    clinicstate: 'Chennai',
    dob: '24-04-1994',
    image: '../../../assets/images/users/user.svg',
    affiliation: 'Senior dentist',
    licenseid: 'FHFHJFC56467',
    Clinicname: 'Dantech',
    clinicclinicaddress: 'new road , New york',
    clinicnumber: 9876543210,
    Yearsofexperience: 5,
    profilecompletionpercentage: '80',
    gst: '0987',
    bankacc: '09876543212345',
    ifsc: 'ytyt1234',
    bankbranch: 'Chennai',
    paymentmethod: 'UPI',
  },
];

// table doctors
export interface doclist {
  clinicid: string;
  doctorid: string;
  doctorname: string;
}

export const doctorlist: doclist[] = [
  {
    clinicid: 'CLI123',
    doctorid: 'CLI12301',
    doctorname: 'Dr.Ahiva',
  },
  {
    clinicid: 'CLI123',
    doctorid: 'CLI12302',
    doctorname: 'Dr.Ahiva bro',
  },
  {
    clinicid: 'CLI123',
    doctorid: 'CLI12303',
    doctorname: 'Dr.Nanthitha',
  },
  {
    clinicid: 'CLI123',
    doctorid: 'CLI12304',
    doctorname: 'Dr.Elsheba',
  },
  {
    clinicid: 'CLI123',
    doctorid: 'CLI12305',
    doctorname: 'Dr.Lalika',
  },
  {
    clinicid: 'CLI123',
    doctorid: 'CLI12306',
    doctorname: 'Dr.Diana',
  },
];
