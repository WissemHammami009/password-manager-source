import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  li:any = [{link:"/home",class:" nav-link ",name:"Home"},{link:"/signin",class:"nav-link",name:"Signin"},{link:"/signup",class:"nav-link",name:"Signup"}]
  constructor(private router:Router) { }

  ngOnInit(): void {
    let url = this.router.url
    console.log(url)
    let json :any
    if (url == "/home") {
       json = [{link:"/home",class:"nav-link active",name:"Home"},{link:"/signin",class:"nav-link",name:"Signin"},{link:"/signup",class:"nav-link",name:"Signup"}]
    }
    else if (url == "/signin") {
       json = [{link:"/home",class:"nav-link ",name:"Home"},{link:"/signin",class:"nav-link active",name:"Signin"},{link:"/signup",class:"nav-link",name:"Signup"}]
    }
    else if(url == "/signup"){
       json = [{link:"/home",class:"nav-link ",name:"Home"},{link:"/signin",class:"nav-link",name:"Signin"},{link:"/signup",class:"nav-link active",name:"Signup"}]
    }
    else {
      json = [{link:"/home",class:"nav-link ",name:"Home"},{link:"/signin",class:"nav-link",name:"Signin"},{link:"/signup",class:"nav-link ",name:"Signup"}]
    }
    this.li = json
  }
  

}
