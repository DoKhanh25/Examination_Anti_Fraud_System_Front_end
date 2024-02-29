import { Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { WatermarkingService } from '../service/watermarking/watermarking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultModel } from '../model/result.model';
import { CountdownService } from '../service/countdown/countdown.service';
import { Subscription } from 'rxjs';
import { ExamStudentService } from '../service/exam-student/exam-student.service';
import { CookieService } from 'ngx-cookie-service';
import { CountdonwEndTimeService } from '../service/countdown-endTime/countdonw-end-time.service';
@Component({
  selector: 'app-exam-student',
  templateUrl: './exam-student.component.html',
  styleUrl: './exam-student.component.css'
})
export class ExamStudentComponent implements OnInit, OnDestroy{
  msv: string = "";
  data: any;

   subscription: any;

  countdown: number = 0;

  textAreaForm: FormGroup

  examParticipant = {
    examId: "" as string | null,
    username: "" as string | null
  }

  examSolutionDTO = {
    examId: "" as string | null,
    username: "" as string | null,
    examSolution: "" as string | null,
    submitTime: new Date(),
    submitDuration: 0,
    hiddenValue: "" as string | null,
    examDone: false
  }

  constructor(
    public watermarkingService: WatermarkingService,
    public toastrService: ToastrService,
    public fb: FormBuilder,
    public activateRouter: ActivatedRoute,
    public httpClient: HttpClient,
    public countDownService: CountdownService,
    public router: Router,
    public examStudentService: ExamStudentService,
    public cookieService: CookieService,
    public countdonwEndTime: CountdonwEndTimeService
    ){
      this.textAreaForm = fb.group({
        textArea: ""
      })

    this.msv = localStorage.getItem("username") || "";
  }



  ngOnInit(): void {
    this.examParticipant.examId = this.activateRouter.snapshot.params['id'];
    this.examParticipant.username = localStorage.getItem("username");
    let postExpired = localStorage.getItem("postExpired");
    let expiredTime = "" as string;
    
    if(this.examParticipant.username == null || this.examParticipant.examId == null){
      this.router.navigate(['/examStudentList']);
      return;  
    }

    if(postExpired == null || postExpired == "" || postExpired == undefined){
      this.examStudentService.postExamFinishTime(this.examParticipant).subscribe((res) => {
        if(res.errorCode == "0"){
          expiredTime = res.data.toString();
          localStorage.removeItem("postExpired");
          localStorage.setItem("postExpired", "true");
          this.cookieService.set("expiredTime", res.data);
        }
        if(res.errorCode == "-1"){
          console.log(res);
        }
      }, 
      (err) => {
        this.router.navigate(['/blank-page']);
      })
    }

    this.subscription = this.countdonwEndTime.countdown(expiredTime || this.cookieService.get("expiredTime")).subscribe((value) => {
      this.countdown = value;
      if (this.countdown == 0) {
        this.finishExamReset();
        this.postExamSolution(true).subscribe((res) => {
            console.log(res);
          this.toastrService.error("Bài thi đã kết thúc", "Thông báo");
          this.router.navigate(['/examStudentList']);
        })
      }
    });

    this.examStudentService.getExamDetail(this.examParticipant).subscribe((res) => {
      this.data = res.data;
      if(res.errorCode == "-1"){
        this.toastrService.error("Bài thi chưa diễn ra", "Thông báo");
        this.router.navigate(['/examStudentList']);
        return;
      }
      if(res.errorCode == "-2"){
        this.toastrService.error("Bài thi đã kết thúc", "Thông báo");
        this.router.navigate(['/examStudentList']);
        return;
      }
      if(res.errorCode == "-3") {
        this.toastrService.error("Bạn đã nộp bài", "Thông báo");
        this.router.navigate(['/examStudentList']);
        return;
      }
      this.textAreaForm.setValue({
        textArea: res.data.examSolution
      })
    }, 
    (err) => {
      this.router.navigate(['/blank-page']);
    })
  }

  finishExamReset(){
    this.cookieService.delete("expiredTime");
    localStorage.removeItem("hiddenValue");
    localStorage.removeItem("postExpired");
  }

  ngOnDestroy(): void {
    this.postExamSolution(false).subscribe((res) => {
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
    this.postExamSolution(true).subscribe((res) => {
      if(res.errorCode == "0"){
        this.finishExamReset();
        this.toastrService.success("Nộp bài thành công", "Thông báo");
        this.router.navigate(['/examStudentList']);
      }
    },
    (error) => {
      this.finishExamReset();
      this.toastrService.success("Nộp bài thành công", "Thông báo");
      this.router.navigate(['/examStudentList']);
    })
  }

  postExamSolution(done: boolean| null){
    this.examSolutionDTO.examId = this.examParticipant.examId;
    this.examSolutionDTO.username = this.examParticipant.username;
    this.examSolutionDTO.examSolution = this.textAreaForm.value.textArea;
    this.examSolutionDTO.submitTime = new Date();
    this.examSolutionDTO.hiddenValue = localStorage.getItem("hiddenValue");
    if(done != null)
    this.examSolutionDTO.examDone = done;

    return this.httpClient.post<ResultModel>(`http://localhost:8080/api/user/postExamSolution`, this.examSolutionDTO)
  }

  secondsToMinutesSeconds(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

  
}
