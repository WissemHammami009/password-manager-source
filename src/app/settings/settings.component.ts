import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { link } from 'src/link';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  pass:string= ""
  pass1:string= ""
  pass2:string= ""
  name = new FormControl()
  surname = new FormControl()
  email = new FormControl()

  password = new FormControl()
  password1 = new FormControl()
  password2 = new FormControl()
  li:any 
  constructor(private http:HttpClient,private router:Router) { }
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-gray',
        
    },
    buttonsStyling: false
  });
  ngOnInit(): void {
    if (!("session" in localStorage)) {
      localStorage.setItem('directcnx',"yes")
      this.router.navigate(['signin'])
      }
    let path = link.baselink+"api/user/data";
    let id = localStorage.getItem('id_user')
    let data = {
      id:id
    }
    this.http.post(path,data).subscribe(data=>{
      this.li = data
      this.li = this.li.data
    })
    
  }
  reset(){
    this.name.reset()
    this.surname.reset()
    this.email.reset()
  }

  update(){
    if (this.name.value == null || this.name.value == "") {
      this.name.setValue(this.li.name)
    }
    if (this.surname.value == null || this.surname.value == "") {
      this.surname.setValue(this.li.surname)
    }
    if (this.email.value == null || this.email.value == "") {
      this.email.setValue(this.li.email)
    }
    
    let path = link.baselink+"api/user/updateprofile";
    let json = {
      id: localStorage.getItem('id_user'),
      name:this.name.value,
      surname : this.surname.value,
      email: this.email.value
    }
    Swal.fire({
      title: 'Loading...',
      timerProgressBar: true,
      
      didOpen: () => {
        Swal.showLoading()
      },
      willClose: () => {
     
      }
    })
    Swal.isTimerRunning()
    console.table(json)
    this.http.patch(path,json).subscribe(data=>{
      this.li = data;
      Swal.close()
      if (this.li.data.update == "yes") {
        this.swalWithBootstrapButtons.fire({
          icon: 'info',
          title: 'Information',
          html: 'PROFILE <b>UPDATED</b>',
        });
        this.ngOnInit()
        this.reset()
      }
      else if (this.li.data.message == "exist") {
        this.swalWithBootstrapButtons.fire({
          icon: 'error',
          title: 'Information',
          html: 'MAIL ALREADY IN USE',
          footer:"PROFILE NOT UPDATED"
        });
        this.ngOnInit()
        this.reset()
      }
      else{
        this.swalWithBootstrapButtons.fire({
          icon: 'error',
          title: 'Information',
          html: 'PROFILE NOT UPDATED',
        });
        this.ngOnInit()
        this.reset()
      }
    })

  }


  update_pass(){
    if (this.password.value == null || this.password.value == "") {
      this.pass = "border border-danger form-control"
      this.swalWithBootstrapButtons.fire({
        icon: 'error',
        title: 'Information',
        html: 'field required!',
      });
      
      return
    }
    if (this.password1.value == null || this.password1.value == "") {
      this.swalWithBootstrapButtons.fire({
        icon: 'error',
        title: 'Information',
        html: 'field required!',
      });
      this.pass1 = "border border-danger"
      return
    }
    if (this.password2.value == null || this.password2.value == "") {
      this.swalWithBootstrapButtons.fire({
        icon: 'error',
        title: 'Information',
        html: 'field required!',
      });
      this.pass2 = "border border-danger"
      return
    }
    if (this.password1.value != this.password2.value) {
      this.swalWithBootstrapButtons.fire({
        icon: 'error',
        title: 'Information',
        html: 'Passwords are not the same!',
      });
      this.pass1 = "border border-danger"
      this.pass2 = "border border-danger"
      return
    }
    
    let path = link.baselink+"api/user/updatepassword";
    let json = {
      id: localStorage.getItem('id_user'),
      password:this.password.value,
      newpassword : this.password1.value
    }
    Swal.fire({
      title: 'Loading...',
      timerProgressBar: true,
      
      didOpen: () => {
        Swal.showLoading()
      },
      willClose: () => {
     
      }
    })
    Swal.isTimerRunning()
    console.table(json)
    this.http.patch(path,json).subscribe(data=>{
      this.li = data;
      Swal.close()
      if (this.li.updated.password == "yes") {
        this.swalWithBootstrapButtons.fire({
          icon: 'info',
          title: 'Information',
          html: 'PASSWORD <b>UPDATED</b>',
        });
        this.ngOnInit()
        this.password.reset()
        this.password1.reset()
        this.password2.reset()
      }
      else if (this.li.updated.message == "wrongpass") {
        this.swalWithBootstrapButtons.fire({
          icon: 'error',
          title: 'Information',
          html: 'Old password is wrong',
          footer:"PASSWORD NOT UPDATED"
        });
        this.ngOnInit()
        this.password.reset()
        this.password1.reset()
        this.password2.reset()
      }
      else{
        this.swalWithBootstrapButtons.fire({
          icon: 'error',
          title: 'Information',
          html: 'PASSWORD NOT UPDATED',
        });
        this.ngOnInit()
        this.password.reset()
        this.password1.reset()
        this.password2.reset()
      }
    })

  }
  logout(){
    localStorage.clear()
    this.router.navigate(['signin'])
  }
}
