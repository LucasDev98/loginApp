import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import {  NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
    usuario : UsuarioModel = new UsuarioModel();
    recordar : boolean = false;
  constructor( private authService : AuthService,
               private router : Router ) {

   }

  ngOnInit() {
    //Instancia de usuario Model
    if( localStorage.getItem('usuario') ){
        this.recordar = true;
    }

   }

   onSubmit( form : NgForm ) {

        if ( form.invalid ) { return };
        if( this.recordar ){
          localStorage.setItem('usuario', this.usuario.email );
        }

        Swal.fire({
            icon:'info',
            text:'espere por favor',
            allowOutsideClick:true,
          });
        Swal.showLoading(null);
        this.authService.register( this.usuario ).subscribe( ( data : any ) => {
          Swal.close();
          this.router.navigate(['home']);
        },( err => {
          Swal.fire({
            title: 'Error!',
            text: err.error.error.message,
            icon: 'error',
            confirmButtonText: 'Cool'
          })

        }))
   }


}
