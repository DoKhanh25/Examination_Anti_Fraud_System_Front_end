import { Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {ChangeEvent} from "@ckeditor/ckeditor5-angular";
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { WatermarkingService } from '../service/watermarking/watermarking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultModel } from '../model/result.model';
import { CountdownService } from '../service/countdown/countdown.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-exam-student',
  templateUrl: './exam-student.component.html',
  styleUrl: './exam-student.component.css'
})
export class ExamStudentComponent implements OnInit, OnDestroy{
  msv: string = "";
  data: any;

  private subscription: any;

  countdown: number = 0;

  textAreaForm: FormGroup
  examParticipant = {
    examId: "",
    username: ""
  }

  examSolutionDTO = {
    examId: "",
    username: "",
    examSolution: "",
    submitTime: new Date(),
    submitDuration: 0,
    hiddenValue: ""
  }

  constructor(
    public watermarkingService: WatermarkingService,
    public toastrService: ToastrService,
    public fb: FormBuilder,
    public activateRouter: ActivatedRoute,
    public httpClient: HttpClient,
    public countDownService: CountdownService,
    public router: Router
    ){
      this.textAreaForm = fb.group({
        textArea: ""
      })

    this.msv = localStorage.getItem("msv") || "";
  }

  ngOnInit(): void {
    this.activateRouter.params.subscribe((params) => {

      let examId = params['id'];
      this.examParticipant.examId = examId;
      this.examParticipant.username = localStorage.getItem("username") || "";

      this.msv = localStorage.getItem("username") || "";

      if(this.examParticipant.username == ""){
        this.router.navigate(['/examStudentList']);
        return;  
      }

      this.httpClient.post<ResultModel>(`http://localhost:8080/api/admin/getExamDetail`, this.examParticipant).subscribe((res) => {
        this.data = res.data;
        if(res.errorCode == "-2"){
          this.toastrService.error("Bài thi đã kết thúc", "Thông báo");
          this.router.navigate(['/examStudentList']);
          return;
        }
        if(res.errorCode == "-3"){
          this.toastrService.error("Bài thi chưa diễn ra", "Thông báo");
          this.router.navigate(['/examStudentList']);
          return;
        }
        if(res.data.submitDuration == 0) {
          this.toastrService.error("Bài thi đã kết thúc", "Thông báo");
          this.router.navigate(['/examStudentList']);
          return;
        }
        
        this.textAreaForm.setValue({
          textArea: res.data.examSolution
        })
        
        
        this.subscription = this.countDownService.countdown(this.data.submitDuration).subscribe({
          next: value => this.countdown = value,
          complete: () => {
            this.postExamSolution(0).subscribe((res) => {});
            this.toastrService.error("Bài thi đã kết thúc", "Thông báo")
            this.router.navigate(['/examStudentList']);
          }
        })
        
      })
    })
  }

  ngOnDestroy(): void {
    this.postExamSolution(this.countdown).subscribe((res) => {
      console.log(res);
    })
    
    if (this.subscription) {
      this.subscription.unsubscribe();
    };
  }

  @HostListener('window:copy', ['$event'])
  onCopy(event: ClipboardEvent){

    navigator.clipboard.readText().then((value) => {
      navigator.clipboard.writeText(this.watermarkingService.Embed(value, this.msv)).then((va) => {
        console.log('copy event: ' + value);})
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
  
  onClickForm(){
    this.postExamSolution(0).subscribe((res) => {
      this.toastrService.success("Nộp bài thành công", "Thông báo");
    },
    (error) => {
      this.toastrService.success("Nộp bài thành công", "Thông báo");
      this.router.navigate(['/examStudentList']);
    })
  }

  postExamSolution(cd: number){
    this.examSolutionDTO.examId = this.examParticipant.examId;
    this.examSolutionDTO.username = this.examParticipant.username;
    this.examSolutionDTO.examSolution = this.textAreaForm.value.textArea;
    this.examSolutionDTO.submitDuration = cd;
    this.examSolutionDTO.hiddenValue = localStorage.getItem("hiddenValue") || "";

    return this.httpClient.post<ResultModel>(`http://localhost:8080/api/admin/postExamSolution`, this.examSolutionDTO)
  }

  secondsToMinutesSeconds(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

  
}
