import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginError:string="";
  loginForm= this.formBuilder.group({
    email:['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(private formBuilder:FormBuilder, private router:Router, private loginService: LoginService){}


  get email(){
    return this.loginForm.controls.email;
  }

  get password(){
    return this.loginForm.controls.password;
  }

  login(){
    if(this.loginForm.valid){

      const formData = this.loginForm.value;

      if (formData.email === 'test01' && formData.password === 'test01') {

        this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
          next: (userData) => {
            console.log(userData);
          }, 
          error: (errorData) => {
            console.log(errorData);
            this.loginError=errorData
          },
          complete: () =>{
            console.info('Login Completo');
            this.router.navigateByUrl('/dashboard');
            this.loginForm.reset();
          }
        });

        this.loginForm.reset();
      } else {
        console.log('Error de inicio de sesión');
        this.loginError = 'Credenciales incorrectas';
      }
    }else{
      this.loginForm.markAllAsTouched();
    }

  }
}
