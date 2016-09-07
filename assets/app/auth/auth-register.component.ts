import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from "../shared/api-service/auth/auth.service";
import {storage} from "../shared/helpers/storage";
import {Router} from "@angular/router";
import {User} from "../shared/models/user.model";
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {Country} from "../shared/ng2-service/ng2-country/country";
import {State} from "../shared/ng2-service/ng2-country/state";
import {emailValidator, passwordValidator} from "../shared/helpers/validators";
import {Subscription, Observable} from "rxjs";
import {DataCountryService} from "../shared/ng2-service/ng2-country/country.service";
import {DataStateService} from "../shared/ng2-service/ng2-country/state.service";


@Component({
  moduleId: module.id,
  selector: 'sd-admin',
  templateUrl: 'templates/auth-register.component.html',
  styleUrls: ['styles/auth-register.component.css'],
})

export class AuthRegisterComponent implements OnInit, OnDestroy {

  sub:Subscription;
  auth$:Observable<any>;

  disabled:boolean = true;

  errorMessage:string;
  myForm:FormGroup;
  user:User;
  fCaptchaPassed:boolean = null;
  countries:Country[];
  states:State[];
  citys:State[];

  countrySelected:boolean = false;
  citytype:boolean = false;
  statetype:boolean = false;

  constructor(private _fb:FormBuilder,
              private _countryService:DataCountryService,
              private _stateService:DataStateService,
              private _authService:AuthService,
              private _router:Router) {

    this.myForm = this._fb.group({
      personal_name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.compose([Validators.required, passwordValidator])],
      password_confirmation: ['', Validators.required],
      company_name: ['', Validators.required],
      country: ['', Validators.required],
      state: [''],
      city: ['']
    });
  }

  ngOnInit() {
    this.getCountry();
      // {validator: matchingPasswords('password', 'password_confirmation')});
  }

  ngOnDestroy(){
    if(this.sub)this.sub.unsubscribe();
  }

  getCountry() {
    this.countries = this._countryService.getCountries();
  }

  onSubmit(value:Object) {
    console.log(value);
    // const user = new User(this.myForm.value.name, this.myForm.value.email,
    //   this.myForm.value.password, this.myForm.value.password_confirmation,
    //   this.myForm.value.company_name, this.myForm.value.country,
    //   this.myForm.value.state, this.myForm.value.city);

    this.auth$ = this._authService.signup(value);
    this.sub = this.auth$.subscribe((res) => {
          console.log(res);
        },
        error => this.errorMessage = <any>error);
  }

  onSelectCountry(country_name:string) {
    this.countrySelected = true;

    if (country_name == 'Thailand') {
      this.citys = this._stateService.getStates().filter(item=> item.country_name == country_name)
      this.citytype = true;
      this.statetype = false;
    }
    if (country_name == 'United States') {
      this.states = this._stateService.getStates().filter(item=> item.country_name == country_name)
      this.statetype = true;
      this.citytype = false;
    }
    if (country_name !== 'United States' && country_name !== 'Thailand') {
      this.statetype = false;
      this.citytype = false;
    }

  }

  goToLogin() {
    this._router.navigate(['']);
  }


  handleCorrectCaptcha(event:any) {
    return this.fCaptchaPassed = true;
  }

}
