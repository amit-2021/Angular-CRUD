import { ApiService } from './services/api.service';
import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CRUD';
  displayedColumns: string[] = ['productName', 'category', 'date','freshness', 'price', 'comment', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

   constructor(private dialog: MatDialog, private api: ApiService) {}

   ngOnInit() {
    this.getAllProduct();
    // console.log(this.displayedColumns.map((data) => {var new12 = data.indexOf('date'); console.log(new12)}));
   }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(value => {
      if(value === 'save') {
        this.getAllProduct();
      }
    })
  }

  getAllProduct() {
    this.api.getProduct().subscribe({
      next:(res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // console.log(res);
      },
      error:(err) => {
        console.log("error in fetching data." + err);
      }
    })
  }

  // this method also work for get product and get grid data
  // getAllProduct1() {
  //   this.api.getProduct().subscribe((data) => {
  //     if(data) {
  //       this.dataSource = new MatTableDataSource(data);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //       // console.log(res);
  //     }
  //   })
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProdut(row: any) {
    console.log(row);
    this.dialog.open(DialogComponent, {
      width:'30%',
      data:row
    }).afterClosed().subscribe(value => {
      if(value === 'Update') {
        this.getAllProduct();
      }
    })
  }

  deleteProduct(id: number) {
    this.api.deleteProduct(id).subscribe({
      next:(res) => {
        alert("delete successfully.");
        this.getAllProduct();
      },
      error:() => {
        alert("problem while deleting.");
        this.getAllProduct();
      }
    })
}

}
