import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_KEY : string = 'AIzaSyBzP-UMy0pW-Bb1qNKFy5i_W0tqkJoKni0';
  token   : string = '';
  //Register URL
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  //login URL
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  constructor( private http : HttpClient ) {
      if( localStorage.getItem('token') ){
        this.token = localStorage.getItem('token');
      }
  }



  //Login in Dashboard
  login( usuario : UsuarioModel ) {

    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`, usuario)
          .pipe( map( ( data : any )=> {
              this.guardarTokenLS( data.idToken );
              return data;
          }))
  }
  //Dead Session
  logout() {
      localStorage.clear();
  }
  //Register User
  register( usuario : UsuarioModel ) {

      const authData = {
        ...usuario,
        returnSecureToken : true
      }
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`, authData)
        .pipe(map( ( data : any ) => {
            this.guardarTokenLS( data.idToke);

            return data;
        }))
  }
  //Save Token
  private guardarTokenLS( token : string ){
      this.token = token;
      localStorage.setItem('token', token);

      let fecha = new Date();
      let expiraEn = fecha.setSeconds(fecha.getSeconds() + 3600 );
      localStorage.setItem('expira',expiraEn.toString() )
  }

  //Read token
  readToken( ) {
        if( localStorage.getItem('token') ){
          this.token = localStorage.getItem('token');
        }else {
          this.token = '';
        }

        return this.token;
  }
  //is Authenticated
  isAuth( ) : boolean {
    let expira = Number (localStorage.getItem('expira'));
    if ( new Date(expira) < new Date() || this.token.length < 10) {
      return false;
    }else {
      return true;
    }
  }

}
