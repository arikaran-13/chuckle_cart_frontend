import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin/service/admin-service';
import { Product } from 'src/model/product';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(
    private router:Router,
    private customerService:CustomerService, 
    private snackBar: MatSnackBar){}

    image:any;
    product:any[]=[];
    productDetails:any[]=[];

    ngOnInit(){
      this.getAllProduct();
    }

    displaySearchedProducts(seachBar:any){
      if(seachBar.value === ''){
        this.getAllProduct();
      }
      else{
       this.customerService.getProductByName(seachBar.value).subscribe(
        (data:Product[]) =>{
          this.product = data;
          this.setByteImageToNormalImage(this.product);
          console.log(this.product);
        },
        (error)=>{
          console.log(error.message);
        },
      )
      }
    }

    getAllProduct(){
       this.customerService.getAllProduct().subscribe(
        (data:any)=>{
          this.product=data;
          this.setByteImageToNormalImage(this.product);
          console.log(this.product)
        }
       )
    }

    setByteImageToNormalImage(product:any[]){
      product.forEach(element => {
        element.processImage = "data:image/jpeg;base64,"+ element.byteImg;
      });
    }

    public encode(data:any):any{ 
      return encodeURIComponent(JSON.stringify(data));
    }

   public addToCart(productId:any){
      this.customerService.addToCart(productId).subscribe(
        (res)=> {
          this.snackBar.open("Prodcut added to cart Successfully ", "Close",{duration: 5000});
        },
        (err)=>{
           console.log(err);
        }
      )
   }


}
