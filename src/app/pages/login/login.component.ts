import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import  Swal  from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario : UsuarioModel  = new UsuarioModel();
  recordar : boolean = false;
  constructor( private authService : AuthService,
               private router : Router ) {
   }

  ngOnInit() {

      if( localStorage.getItem('usuario') ) {
        this.usuario.email = localStorage.getItem( 'usuario' );
        this.recordar = true;
      }
  }

  onSubmit( form : NgForm ) {

      if( form.invalid ) { return };
      if( this.recordar ) {
        localStorage.setItem('usuario', this.usuario.email );
      }else {
        localStorage.removeItem('usuario');
      }
          Swal.fire({
            'title': 'Espere por favor',
            text   : 'procesando datos..',
            icon   : 'info'
          })
          Swal.showLoading(null)

      this.authService.login( this.usuario )
          .subscribe( data => {
            Swal.close();
            Swal.fire({
              'title': 'Exito',
              text   : 'procesando datos..',
              icon   : 'success'
            })
            this.router.navigate( ['home'] );

          },(err => {
            Swal.close();
            Swal.fire({
              'title': 'Error',
            text   : err.error.error.message,
            icon   : 'error'
            })

          }) )
  }


}
