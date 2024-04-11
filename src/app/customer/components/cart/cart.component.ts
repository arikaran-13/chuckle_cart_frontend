import { Component } from '@angular/core';
import { StorageService } from 'src/service/storage-service';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  
  cartItemDetails :any[]=[];
  order:any;

  constructor(private storageService: StorageService,
    private customerService:CustomerService,
    private snackBar:MatSnackBar,
    private db: FormBuilder,
    private dialog : MatDialog){
  }

  ngOnInit(){
    this.getCart();
  }

  getCart(){
    this.cartItemDetails=[];
    this.customerService.getCartByUserId().subscribe(
      data =>{
        this.order = data;
        data.cartItems.forEach(element=>{
          element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
          this.cartItemDetails.push(element); 
        })
        console.log(this.cartItemDetails);
         
      }
    )
  }
}
