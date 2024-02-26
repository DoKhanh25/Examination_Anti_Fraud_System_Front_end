import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {ChangeEvent} from "@ckeditor/ckeditor5-angular";
import { WatermarkingService } from '../../service/watermarking/watermarking.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CreateAccountService } from '../../service/create-account/create-account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  

  msv: string = "";
  data: string = "";

  textAreaForm: FormGroup

  constructor(
    public watermarkingService: WatermarkingService, 
    public httpClient: HttpClient,
    public createAccountService: CreateAccountService,
    public toastrService: ToastrService,
    public fb: FormBuilder
    ){
      this.textAreaForm = fb.group({
        textArea: ""
      })

    this.msv = localStorage.getItem("msv") || "";

  }
  

  @HostListener('window:copy', ['$event'])
  onCopy(event: ClipboardEvent){

    navigator.clipboard.readText().then((value) => {
      console.log('copy event: ' + value);
      navigator.clipboard.writeText(this.watermarkingService.Embed(value, this.msv)).then((va) => {
        console.log('after embed: ' + va);

      })
      
    });
  }
  @HostListener('window:paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    navigator.clipboard.readText().then((value) => {
      console.log('paste event: ' + value);
      console.log('after extract event', this.watermarkingService.Extract(value))
      let data = this.watermarkingService.Extract(value);
      if(data.key){
        if(data.key.includes(this.msv.toString()) == false){
          if(localStorage.getItem("hiddenValue")){
            localStorage.removeItem("hiddenValue")
          }
          localStorage.setItem("hiddenValue", data.key);
        }
      }

    });
  }
 
  public onClickForm(){
    let hiddenValue = localStorage.getItem("hiddenValue") || "";
    let username = localStorage.getItem("username");

    let obj = {
      examSolution: this.textAreaForm.get("textArea")?.value,
      hiddenValue: hiddenValue,
      author: username
        }

    this.createAccountService.postExam(obj).subscribe((res) => {
      if(res.errorCode =="0"){
        this.toastrService.info("Nộp thành công");
      }      
    }, 
    (err) => {
      console.log(err);
      this.toastrService.error("Lỗi sever")
      
    })
  }



}
