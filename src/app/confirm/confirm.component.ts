import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import {link} from '../../link';
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  id = "";
  htmlstr:string ="";
  li:any;
  type ="";
  link = "";

  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-gray'
    },
    buttonsStyling: false
});
  constructor(private httpClient: HttpClient,private activatedRoute: ActivatedRoute,private router:Router) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
          this.id = params['id'];
      }
  })
  let path = link.baselink+"api/user/confirm/";
  console.log(this.type)
     this.link =path+this.id;
  let data = {id: this.id}
  this.httpClient.patch(this.link,data).subscribe(data =>{
    this.li = data;
    console.log(data)
    console.log(this.li.confirm.confirm)
    if (this.li.confirm.confirm == "no"){
      this.swalWithBootstrapButtons.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error: Contact the developer or check your mail again',
      }).then((result)=>{
        this.router.navigate(['/signin'])
      });
      }
    else {
      this.swalWithBootstrapButtons.fire({
        icon: 'success',
        title: 'OK',
        text: 'Account confirmed !',
        showConfirmButton: true
    }).then((result)=>{
      this.router.navigate(['/signin'])})
       }
  }
    )
  }

}
