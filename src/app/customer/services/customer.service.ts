import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/model/product';
import { StorageService } from 'src/service/storage-service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient,private storageService: StorageService) { }
 
  BASE_URL:string = "http://localhost:8080/api/customer";

  public getAllProduct():Observable<Product[]>{
   return this.http.get<Product[]>(this.BASE_URL+"/products",{
    headers : this.createHttpHeaders()
   })

  }


  public addToCart(productId:any):Observable<any>{
    const cart = {
      productId: productId,
      userId: this.storageService.getUserId()
    }
    return this.http.post<any>(this.BASE_URL+"/cart", cart,{
     headers : this.createHttpHeaders()
    })
   }

  public getProductByName(name:String):Observable<Product[]>{
    return this.http.get<Product[]>(this.BASE_URL+`/products/${name}`,{
      headers: this.createHttpHeaders()
    })
  }

  public getCartByUserId():Observable<any>{
    return this.http.get<any>(this.BASE_URL+ `/cart/${this.storageService.getUserId()}`,{
      headers: this.createHttpHeaders()
    })
  }

private createHttpHeaders():HttpHeaders{
  return new HttpHeaders().set(
      "Authorization" , this.storageService.getAuthToken()
  );   
  }

}
