import { Component,ViewChild, AfterViewInit, ElementRef, ViewChildren,QueryList,HostListener, Output,EventEmitter } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { fromEvent, Subscription } from 'rxjs';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';  


@Component({
  selector: 'app-maingame',
  templateUrl: './maingame.component.html',
  styleUrls: ['./maingame.component.css'],
})
export class MaingameComponent implements AfterViewInit {
  counter: number = 0;
  totalScore: number = 0;
  scoreDisp : string = '';
  pointCount: number = 0;
  correctCount: number = 0;
  incorrectCounter: number = 0;
  percent: number = 0;
  question : string = "";
  questNum: string = "";
  userChoice: string = "";
  answerChoice0 : string = "";
  answerChoice1 : string = "";
  answerChoice2 : string = "";
  answerChoice3 : string = "";
  resultOne : string = "";
  resultTwo : string = "";
  jokeText : string = "";
  questionCat: string = "";
  faArrowRight = faArrowRight;
  @ViewChild('questionsContainer') questionsContainerRef!: ElementRef;
  @ViewChild('nextBTN') nextBTNRef!: ElementRef;
  @ViewChild('resultsContainer') resultsContainerRef!: ElementRef;
  @ViewChild('exit') exitRef!: ElementRef;
  @ViewChildren('answerChoice') answerChoiceRef!: QueryList<ElementRef>;

  @HostListener('document:click', ['$event.target'])
  onClick(element: HTMLElement) {
    this.resetBTN()
    if(element.classList.contains('answerChoice')) {
      this.userChoice = element.innerText;
     this.checker(this.userChoice);
    }}

    checker(userChoice: string){
      if (userChoice) {
        if (userChoice === `${this.arr[this.counter].answer}`) {

          this.answerChoiceRef.toArray().forEach(element => {
            if(element.nativeElement.innerText === userChoice){
              element.nativeElement.style.backgroundColor = "#0c725a"; 
            }})
          
          this.correctCount++;
          this.disableBTNS();
          this.nextBTNRef.nativeElement.style.visibility = 'visible';
          if (this.questionCat == 'easy') {
            this.pointCount += 5;
            this.totalScore += 5;
          } else if (this.questionCat == 'medium') {
            this.pointCount += 10;
            this.totalScore += 10;
          } else if (this.questionCat == 'hard') {
            this.pointCount += 15;
            this.totalScore += 15;
          }
    }
  else{
    this.answerChoiceRef.toArray().forEach(element => {
      if (element.nativeElement.innerText === `${this.arr[this.counter].answer}`) {
        element.nativeElement.style.backgroundColor = '#0c725a';}
        else if (element.nativeElement.innerText === this.userChoice){
        element.nativeElement.style.backgroundColor = '#850707';
        }
    })
    this.disableBTNS();
          this.nextBTNRef.nativeElement.style.visibility = 'visible';
          this.incorrectCounter += 1;
    }}}
  
  clickedElement: Subscription = new Subscription();

  arr = [] as any;
  URL : string = '';
  
  enableBTNS(){
    this.answerChoiceRef.toArray().forEach(element => {
      element.nativeElement.disabled = false;
    })
  }

  disableBTNS(){
    this.answerChoiceRef.toArray().forEach(element => {
      element.nativeElement.disabled = true;
    })
  }
  resetBTN(){
  this.answerChoiceRef.toArray().forEach(element => {
    element.nativeElement.style.backgroundColor = 'white';
  })
  }

  joke (percent: number){
    if (percent < 55) {
      this.jokeText = `"Well, performance issues, it's not uncommon. One out of five...": Tony Stark`;
    } else if (percent >= 80 && percent <= 100) {
      this.jokeText = `"Genius, billionaire, playboy, philanthropist.": Tony Stark`;
    } else {
      this.jokeText = `"Dude you’re embarrassing me in front of the wizards.": Tony Stark`;
    }
  
  }

  @Output() newItemEvent = new EventEmitter<any>();
  clearAll (score: any){
    this.resultsContainerRef.nativeElement.style.display = 'none';
    this.counter = 0;
    this.pointCount = 0;
    this.correctCount = 0;
    this.incorrectCounter = 0;
    this.questionCat = '';
    this.newItemEvent.emit(score);
  }

  getData(questionCat: string){
    this.questionCat = questionCat;
    if (questionCat == 'easy'){
this.URL = 'https://api.jsonbin.io/b/5f9349c63895f90cd22e617b';
    }
    else if (questionCat == 'medium'){
      this.URL = 'https://api.jsonbin.io/b/5f9349f13895f90cd22e618a';
          }
          else {
            this.URL = 'https://api.jsonbin.io/b/5f934a21bd69750f00c2b806';
                }
                if(this.counter === 0){
    this.getDataService.getData(this.URL).subscribe(data =>{
      this.arr = data; 
      this.questNum = `Question #${this.arr[this.counter].questionNum}`;
      this.question = `${this.arr[this.counter].question}`;
      this.answerChoice0 = `${this.arr[this.counter].choice1}`;
      this.answerChoice1 = `${this.arr[this.counter].choice2}`;
      this.answerChoice2 = `${this.arr[this.counter].choice3}`;
      this.answerChoice3 = `${this.arr[this.counter].choice4}`;
    }
  
  ) }
  else if(this.counter > 0){
    this.questNum = `Question #${this.arr[this.counter].questionNum}`;
      this.question = `${this.arr[this.counter].question}`;
      this.answerChoice0 = `${this.arr[this.counter].choice1}`;
      this.answerChoice1 = `${this.arr[this.counter].choice2}`;
      this.answerChoice2 = `${this.arr[this.counter].choice3}`;
      this.answerChoice3 = `${this.arr[this.counter].choice4}`;
  }
  }
  constructor(private getDataService: GetDataService) {}
ngAfterViewInit(){
   
    this.clickedElement = fromEvent(this.nextBTNRef.nativeElement,'click').subscribe(()=>
    {
      if(this.counter < 9){
      this.resetBTN();
      this.enableBTNS();
      this.nextBTNRef.nativeElement.style.visibility = 'hidden';
      this.counter++;
      this.getData(this.questionCat);
    }
    else if ((this.counter === 9)) {
      this.percent = (10 - this.incorrectCounter) * 10;
      this.questionsContainerRef.nativeElement.style.display = 'none';
      this.resultsContainerRef.nativeElement.style.display = "block";
      this.resultOne = `You have accumulated ${this.pointCount} points`;
      this.resultTwo = `Your percentage for this quiz is ${this.percent}%`;
      this.joke(this.percent);
      this.scoreDisp= `Total Score: ${this.totalScore}`;
    }
    }
    )
  }
 }


  

