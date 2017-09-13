import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import {ProductServiceApi} from '../shared/shared';
import {DataTableModule,SharedModule,DialogModule} from 'primeng/primeng';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.component.html',
  styleUrls: ['./viewproducts.component.scss'],
  animations: [routerTransition()]
})
export class ViewProductsComponent implements OnInit {

    products : any[] = [];
    displayProductDialog : boolean = false;
    ProductModel : any = {};
    productId : any = "0";
    busy: Subscription;
    

    constructor(private productServiceApi:ProductServiceApi) {
        this.ProductModel.Name = "";
        this.listProductsApi();
     }

    ngOnInit() {
        
    }

    refreshVariables(){
      this.productId = "0";
      this.ProductModel.Name = "";
    }

    showProductDialog() {
      this.refreshVariables();
      this.displayProductDialog = true;
    }

    hideProductDialog(){
      this.refreshVariables();
      this.displayProductDialog = false;
    }

    saveProduct(){
      if(this.productId==="0"){
        this.saveProductApi();
      }else{
        this.updateProductApi();
      }
    }

    editProduct(product) {
       this.showProductDialog();
       this.productId = product.id;
       this.ProductModel.Name = product.name;
    }

    saveProductApi(){
      let ProductDtoIn = {
         id: 1,
         name: this.ProductModel.Name
      };
      this.busy = this.productServiceApi.addProduct(ProductDtoIn)
      .subscribe(
          res => {
             this.hideProductDialog();
             this.listProductsApi();
          },err => {
            console.log(err.message);
            return;
        });
    }

    updateProductApi() {
      let ProductDtoIn = {
        id: this.productId,
        name: this.ProductModel.Name
     };
     this.busy = this.productServiceApi.updateProduct(ProductDtoIn)
     .subscribe(
         res => {
            this.hideProductDialog();
            this.listProductsApi();
         },err => {
            console.log(err.message);
            return;
        });
    }

    listProductsApi() {
        this.products = [];
        this.busy = this.productServiceApi.getProducts()
        .subscribe(
            res => {
              this.products = res;
            },err => {
              console.log(err.message);
              return;
          });
    }

    deleteProductApi(productvar) {
        if (window.confirm('Are you sure you want to delete?')) {
          this.busy = this.productServiceApi.deleteProduct(productvar.id)
            .subscribe(
                res => {
                  this.listProductsApi();
                },err => {
                  console.log(err.message);
                  return;
              });
        }else{
           return;
        }
    }

}
