import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthStateService } from '../service/auth-state.service'
import { SharedtokenService } from '../service/sharedtoken.service'
import { AppServiceService } from '../service/app-service.service'
import { Meta } from '@angular/platform-browser'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  errors: any = null
  results: any[] = []
  email?: string
  password?: string
  constructor (
    public router: Router,
    public fb: FormBuilder,
    public authService: AppServiceService,
    private token: SharedtokenService,
    private authState: AuthStateService,
    private metaService: Meta
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: []
    })
  }
  ngOnInit () {}

  onSubmit () {
    this.authService.returnClients().subscribe(result => {
      this.responseHandler(result)

      // iterating through password
      for (let index = 0; index < result.length; index++) {
        if (
          this.loginForm.value.email == result[index].email ||
          this.loginForm.value.password == result[index].password
        ) {
          this.email = result[index].email
          this.password = result[index].password
          break
        } else {
          ;(this.email = ''), (this.password = '')
        }
      }

      if (
        this.loginForm.value.email == this.email &&
        this.loginForm.value.email != '' &&
        this.loginForm.value.password == this.password
      ) {
        this.authState.setAuthState(true)
        this.loginForm.reset()
        this.router.navigate(['All'])
      } else {
        if (
          this.loginForm.value.email == '' ||
          this.loginForm.value.email !== this.email
        ) {
          this.errors = 'Please enter a correct email address'
        } else {
          this.errors = 'Please enter a correct password'
        }
      }

      console.log(this.email)
    })
    console.log(this.loginForm.value)
    console.log('button clicked.')
  }
  // Handle response
  responseHandler (data: any) {
    this.token.handleData(data.access_token)
    sessionStorage.setItem('loggedUser', data.user)
    sessionStorage.setItem('User_Id', data.user_id)
    sessionStorage.setItem('Client', data.client)
    
  }
}
