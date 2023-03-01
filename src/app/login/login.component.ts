import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {link} from '../../link';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  htmlStr:string= ""
  
  //Form Control .. 
  username = new FormControl()
  password = new FormControl()
  checkbox = new FormControl()

  path = link.baselink;
  li:any
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-gray',
        
    },
    buttonsStyling: false
  });
  constructor(private router: Router,private http: HttpClient,private title:Title) { }
    verif (x:FormControl){
      if (x.value == null) {
        return false
      }else {
        return true
      }
      
    }
  ngOnInit(): void {
    console.log(this.path)
    if ("email" in localStorage) {
      this.username.setValue(localStorage.getItem("email"));
      localStorage.removeItem('email');
    }
    if ('directcnx' in localStorage) {
      this.swalWithBootstrapButtons.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You should connect first!',
      });
       localStorage.removeItem('directcnx');
    }
  }

  login(){
    if (this.checkbox.value != null) {
      localStorage.setItem("email",this.username.value)
    }
    if (this.username.value == "" || this.password.value == "" || this.password.value == null || this.username.value == null) {
      this.swalWithBootstrapButtons.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Field required!',
        confirmButtonText:"Roger that"
    })
      return 

    }
    let json  = {
      email: this.username.value,
      password : this.password.value
    }
    Swal.fire({
      title: 'Loading!',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      },
      willClose: () => {
       
        
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      
    })
    let path = link.baselink+"api/user/login";
    this.http.post(path, json).subscribe(data => {
      this.li = data;
    if (this.li.login.confirm == "no") {
      this.htmlStr = "<div class=\"alert alert-warning\" role=\"alert\"><strong>Info: </strong>Merci de <b>confirmer</b> votre email pour valider votre <b>account</b></div>"
      this.swalWithBootstrapButtons.fire({
        icon: 'info',
        title: 'Information',
        html: 'You need to <b>confirm</b> your <b>account</b> first',
      });
        
      }
      else if (this.li.login.check == true) {
          Swal.close()
          localStorage.setItem('name',this.li.login.name);
          localStorage.setItem('session', '12345678');
          localStorage.setItem('id_user',this.li.login.id)
          this.router.navigate(['/dashboard'])
      }
      else{
        this.swalWithBootstrapButtons.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'email ou password est incorrecte!',
        });
        this.username.setValue(null)
        this.password.setValue(null)
        this.checkbox.setValue(null)
        this.ngOnInit()  
      }
    })
   
  }
}
