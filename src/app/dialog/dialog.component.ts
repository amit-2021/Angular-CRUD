import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  freshnessList = ['Brand New', 'Second Hand', 'Fresh'];
  productForm!: FormGroup;
  actionButton: string = "save";

  constructor
  (
    private formBuilder: FormBuilder,
    private services: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit() {
    this.validateForm();
    console.log(this.editData)
    if(this.editData) {
      this.actionButton = "Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }

  validateForm() {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  addProduct() {
    if(!this.editData) {
      if (this.productForm.valid) {
        console.log(this.productForm.value);
        this.services.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            alert('product added successfully');
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            console.log("Error while adding the product");
          },
        });
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.services.putProdut(this.productForm.value, this.editData.id).subscribe({
      next:(res) => {
        alert("product updated successefully");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert("error while updating the product.")
      }
    })
  }

}
