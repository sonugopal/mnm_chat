import { ChangepasswordComponent } from './../../shared/changepassword/changepassword.component';
import { EditprofileComponent } from './../../shared/editprofile/editprofile.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-adminprofileview',
  templateUrl: './adminprofileview.component.html',
  styleUrls: ['./adminprofileview.component.scss']
})
export class AdminprofileviewComponent implements OnInit {
 
  url: string | ArrayBuffer;
  editname:boolean=false;
  displayName:boolean=true;
  constructor(private fb: FormBuilder,
    private location: Location,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.url="assets/pp.jpg"
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
}
  editData(){
    this.editname=true;
    this.displayName=false;
  }
  showData(){
    this.editname=false;
    this.displayName=true;
  }
  cancel() {
    setTimeout(()=>{
      window.location.reload();
    }, 50);
    this.location.back(); // <-- go back to previous location on cancel
  }
  openEditName() {
    const dialogRef = this.dialog.open(EditprofileComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openChangePassword() {
    const dialogRef = this.dialog.open(ChangepasswordComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
