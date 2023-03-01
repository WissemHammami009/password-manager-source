import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {link} from '../../link';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  username = new FormControl()
  surname = new FormControl()
  email = new FormControl()
  password  = new FormControl()
  password_verif = new FormControl()
  li:any
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-gray',
        
    },
    buttonsStyling: false
  });

  constructor(private http :HttpClient,private router:Router) { }

  ngOnInit(): void {
  }
 
  create_user(){
   

    let path = link.baselink+"api/user/add";
    if (this.username.value == null || this.surname.value == null || this.email.value == null || this.password.value == null) {
      this.swalWithBootstrapButtons.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Field required!',
          confirmButtonText:"Roger that"
      })
    }
    else {
      Swal.fire({
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        
      })
      let data = {
        name : this.username.value,
        surname : this.surname.value,
        email : this.email.value,
        password : this.password.value
      }
      this.http.post(path,data).subscribe(data=> {
      this.li = data
      Swal.close()
      if (this.li.signup.added == "no") {
        this.swalWithBootstrapButtons.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email Already in use!',
          confirmButtonText:"Roger that",
          allowOutsideClick: false
      })
      
      }
      else {
        this.swalWithBootstrapButtons.fire({
          icon: 'success',
          title: 'Signup',
          text: 'Account Created!',
          confirmButtonText:"Roger that",
          allowOutsideClick: false
      })
      this.router.navigate(['/signin'])
      }
      })
     
    }
  }

}
