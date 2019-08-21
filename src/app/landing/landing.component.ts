import { Component, OnInit, HostListener, Inject } from "@angular/core";
import { MetaService } from "@ngx-meta/core";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';

export interface DialogData {
  name: string;
}
@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.css"]
})
export class LandingComponent implements OnInit {
  public myform: FormGroup;
  public stateslist: any;
  public name: string = 'Thanks for your submission';

  windowScrolled: boolean;

  constructor(private readonly meta: MetaService, public router: Router, public route: ActivatedRoute, public fb: FormBuilder, public http: HttpClient, public dialog: MatDialog) {
    this.meta.setTitle("consult 4 health:Home");
    this.meta.setTag("og:description", "consult 4 health ");
    this.meta.setTag("og:title", "consult 4 health ");
    this.meta.setTag("og:type", "https://consult4health.com");
    this.meta.setTag(
      "og:image",
      "https://consult4health.com/assets/images/logo1.png"
    );

    this.getState();

    this.myform = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      telephone: ['', Validators.compose([Validators.required, Validators.pattern(/[0-9\+\-\ ]/)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
      address: ['', Validators.required],
      // city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      floatLabel: ['', Validators.required],
      // message: ['', Validators.required],
      // country: ['', Validators.required],
    })

  }


  @HostListener("window:scroll", [])

  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }


  scrollToTop() {
    (function smoothscroll() {

      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }

    })();
  }


  toTop() {
    document.getElementById("formclsblock").scrollIntoView({ behavior: 'smooth' });
  }

  ngOnInit() {
    this.router.events.subscribe(() =>
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    );
  }


  getState() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    var result = this.http.get('assets/data/state.json').subscribe(res => {
      this.stateslist = res;
      console.log('stateslist');
      console.log(this.stateslist);
    });
    return result;
  }
  doSubmit() {
    let x: any;
    for ( x in this.myform.controls) {
      this.myform.controls[x].markAsTouched();
    }

    console.log(this.myform.value);
    if (this.myform.valid) {
      const dialogRef = this.dialog.open(SuccessModal, {
        width: '550px',
        height: '250px',
        data: {name: this.name}
      });
      let link = '';
      // let link = '';
      let data = { data: this.myform.value };
      this.http.post(link, data)
        .subscribe(res => {
          let result: any = {};
          result = res;
          console.log(result);
          if (result.status == 'success') {
            this.myform.reset();
            const dialogRef = this.dialog.open(SuccessModal, {
              data: {name: this.name}
            });
            setTimeout(() => {

            }, 2000);
          }
        })
    }
  }
  inputUntouch(form: any, val: any) {
    console.log('on blur .....');
    form.controls[val].markAsUntouched();
  }
}



@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'successmodal.html',
})
export class SuccessModal {

  constructor(
    public dialogRef: MatDialogRef<SuccessModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}