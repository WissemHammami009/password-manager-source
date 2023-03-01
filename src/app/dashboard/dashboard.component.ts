import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {link} from '../../link';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }
  ipAddress = '';
  
  isShow = false;
  show = localStorage.getItem('visi') || "block";
  password = new FormControl()
  name = new FormControl()
  link = new FormControl()
  email = new FormControl()
  password1 = new FormControl()
  name1 = new FormControl()
  link1 = new FormControl()
  email1 = new FormControl()
  id_item = new FormControl()
  ipinfo : any

  info:any

  ngOnInit(): void {
    if (!("session" in localStorage)) {
      localStorage.setItem('directcnx',"yes")
      this.router.navigate(['signin'])
      }
    this.getdata()
    this.getIPAddress();
    this.info = {name: localStorage.getItem("name")}  
  }
  alert(x : string ){
    let json = {password:x}
     let ldata : any
    this.http.post("http://localhost:3000/api/storage/showpassword",json).subscribe(data =>{
      ldata = data
      this.swalWithBootstrapButtons.fire({
        icon: 'info',
        title: 'Information',
        html: 'Password: <b>'+ldata.password+'</b>',
      });
    })
    
  }

  toggle (){
    this.isShow = !this.isShow
  }
  toggle1 (){
    this.isShow = this.isShow 
  }
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-gray',
        
    },
    buttonsStyling: false
  });
  

  li:any 
  li_get :any
  getIPAddress()
  {
    this.http.get("https://ipgeolocation.abstractapi.com/v1/?api_key=506a3b0208fd497883f298c4dc5ea4d0").subscribe((res:any)=>{
      this.ipAddress = res.ip_address;
      this.ipinfo = res
      console.log(res)
    });
  }
  show_ipinfo(){
    this.swalWithBootstrapButtons.fire({
      icon: 'info',
      title: 'Information Related to your ip',
      html: 'Ip: '+this.ipinfo.ip_address+"<br> Country: "+this.ipinfo.country+"<br> Time: "+this.ipinfo.timezone.current_time+"<br> Currency Name: "+this.ipinfo.currency.currency_name+"<br> ISP Name: "+this.ipinfo.connection.isp_name,
    });
  }
  verif (x:FormControl){
    if (x.value == null) {
      return false
    }else {
      return true
    }
    
  }
  link_update(){
    this.link.setValue(this.name.value.toLowerCase().replace(/ /g, '')+".com") 
  }
  link1_update(){
    this.link1.setValue(this.name1.value.toLowerCase().replace(/ /g, '')+".com") 
  }
  getdata(){
    let path = link.baselink+"api/storage/items_get";
    let data = {
      author_id : localStorage.getItem('id_user')
    }
    this.http.post(path,data).subscribe(data=>{
      this.li = data
      this.li = this.li.data.items;
     
      
    })
  }
  reset_mod_add(){
    this.name.reset()
        this.link.reset()
        this.email.reset()
        this.password.reset()
  }
  modal(x:string,y:string,z:string,a:string,id:string){
    let json = {password:a}
     let ldata : any
     this.http.post("http://localhost:3000/api/storage/showpassword",json).subscribe(data =>{
      ldata = data
      
    });

    this.name1.setValue(x)
    this.link1.setValue(y)
    this.email1.setValue(z)
    this.password1.setValue(a)
    this.id_item.setValue(id)
  }
  update(){
    if (this.id_item.value == null || this.verif(this.name1)==false || this.verif(this.link1)==false || this.verif(this.email1)==false ||this.verif(this.password1)==false ) {
      this.swalWithBootstrapButtons.fire({
        icon: 'error',
        title: 'Information',
        html: 'All fields is required!',
      });
      return
    }
    let json = {
      id:this.id_item.value,
      name: this.name1.value,
      link : this.link1.value,
      email: this.email1.value,
      password : this.password1.value
    }
    console.log(json)
    Swal.fire({
      title: 'Loading...',
      timerProgressBar: true,
      
      didOpen: () => {
        Swal.showLoading()
      },
      willClose: () => {
     
      }
    })
    let path = link.baselink+"api/storage/modify";
    Swal.isTimerRunning()
    console.table(json)
    this.http.patch(path,json).subscribe(data=>{
      this.li = data;
      Swal.close()
      if (this.li.data.update == "yes") {
        this.swalWithBootstrapButtons.fire({
          icon: 'info',
          title: 'Information',
          html: 'ENTRY UPDATED',
        });
              
        
        this.ngOnInit()
      }
      else {
        this.swalWithBootstrapButtons.fire({
          icon: 'error',
          title: 'Information',
          html: 'ENTRY NOT UPDATED',
        });
        
      }
    })
  }

  delete(x:String){
    let path = link.baselink+"api/storage/delete";
    Swal.fire({
      title: 'Loading...',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      },
      willClose: () => {
     
      }
    })
    this.http.post(path,{id:x}).subscribe(data=>{
      this.li_get = data
      Swal.close()
      if (this.li_get.data.delete == "yes") {
        this.swalWithBootstrapButtons.fire({
          icon: 'info',
          title: 'Information',
          html: 'ENTRY DELETED',
        });
        
        this.ngOnInit()
      }
      else {
        this.swalWithBootstrapButtons.fire({
          icon: 'error',
          title: 'Information',
          html: 'ENTRY NOT DELETED',
        });
        
      }
    })
    
  }

  create_item(){
    if (!this.verif(this.name) || !this.verif(this.link) || !this.verif(this.email) || !this.verif(this.password) ) {
      this.swalWithBootstrapButtons.fire({
        icon: 'error',
        title: 'Information',
        html: 'All fields is required!',
      });
      this.reset_mod_add()
      return
    }
    let json = {
      name : this.name.value,
      link: this.link.value,
      email: this.email.value,
      password: this.password.value,
      author_id: localStorage.getItem('id_user')
    }
    let path = link.baselink+"api/storage/add";

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
    this.http.post(path,json).subscribe(data=>{
      this.li_get = data
      Swal.close()
      if (this.li_get.added.item == "yes") {
        this.swalWithBootstrapButtons.fire({
          icon: 'info',
          title: 'Information',
          html: 'ENTRY ADDED',
        });
        
        this.reset_mod_add()
        this.ngOnInit()
        
        
      }
      else {
        this.swalWithBootstrapButtons.fire({
          icon: 'error',
          title: 'Information',
          html: 'ENTRY NOT ADDED',
        });
        Swal.close()
      }
    })
  }
 
logout(){
  localStorage.removeItem("session")
  this.router.navigate(['signin'])
  localStorage.clear()
}
change_visi(){
  this.show= "none"
  localStorage.setItem('visi',"none")
}
}
