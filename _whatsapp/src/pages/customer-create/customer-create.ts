import { CustomerHttpProvider } from './../../providers/http/customer-http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, TextInput } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-customer-create',
  templateUrl: 'customer-create.html',
})
export class CustomerCreatePage {

  form: FormGroup;
  photoPreview;

  @ViewChild('inputFilePhoto')
  inputFilePhoto: TextInput;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder,
              private customerHttp: CustomerHttpProvider) {
      this.form = this.formBuilder.group({
          name: ['', [Validators.required, Validators.maxLength(60)]],
          email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
          photo: null
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerCreatePage');
  }

  submit(){
    this.customerHttp
      .create(this.form.value)
      .subscribe( () => {
        console.log('Cliente cadastrado');
      })
  }

  selectPhoto(){
    const nativeElement = this.inputFilePhoto.getElementRef().nativeElement;
    const inputFile = nativeElement.querySelector('input');
    inputFile.click();
  }

  onChoosePhoto(files: FileList){
    if (!files.length){
      return;
    }
    this.makePhotoPreview(files[0]);
    this.form.get('photo').setValue(files[0]);
  }

  makePhotoPreview(file: File){
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (event: ProgressEvent) => {
      const target = event.target;
      this.photoPreview = (<any>target).result;
    }
  }

}
