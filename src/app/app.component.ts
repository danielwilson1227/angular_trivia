import { Component, OnDestroy, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { MaingameComponent } from './maingame/maingame.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('instructionsBTN') instructionsBTNRef!: ElementRef;
  @ViewChild('instructionsContainer') instructionsContainerRef!: ElementRef;
  @ViewChild('close') closeRef!: ElementRef;
  @ViewChild('easyBTN') easyBTNRef!: ElementRef;
  @ViewChild('mediumBTN') mediumBTNRef!: ElementRef;
  @ViewChild('hardBTN') hardBTNRef!: ElementRef;
  @ViewChild('difficultyBTNS') difficultyBTNSRef!: ElementRef;
  @ViewChild('refresh') refreshRef!: ElementRef;
  @ViewChild(MaingameComponent) mainchild!: MaingameComponent;
  instructionsCont: any = '';
  totScore: string = '';
  chooseDiffText : string = "CHOOSE A DIFFICULTY: "
  questionCat: string = '';
  counter: number = 0;
  clickedElement: Subscription = new Subscription();
  

  instructionsText : string= 'There are 3 Marvel quizzes ranging from easy to hard. There are 10 questions per quiz. You cannot take the same quiz twice in a row. You will get 5 points for each correct easy question, 10 points for each correct medium question and 15 points for each correct hard question. The top of the page shows the total accumulation of points after each quiz is completed. See if you can score 100% on all the quizzes.';

  diffClicked(){
  this.mainchild.correctCount = 0;
  this.mainchild.questionsContainerRef.nativeElement.style.display = 'block';
  this.mainchild.nextBTNRef.nativeElement.style.visibility = 'hidden';
  };

  scoreChange(score: any){
  this.totScore = `${score} Points`
  this.finishedChecker();
  };

  finishedChecker(){
  if(this.easyBTNRef.nativeElement.classList.contains('hover-On') === false &&
  this.mediumBTNRef.nativeElement.classList.contains('hover-On') === false &&
  this.hardBTNRef.nativeElement.classList.contains('hover-On') === false){
  this.difficultyBTNSRef.nativeElement.style.display = 'none';
  this.chooseDiffText = 'Thanks for Playing!!';
  this.refreshRef.nativeElement.style.display = 'block';
}
  };

  setGame(){
    this.diffClicked();
    this.mainchild.nextBTNRef.nativeElement.visibility = 'hidden';
    this.mainchild.enableBTNS();
    this.totScore = '';
    this.mainchild.getData(this.questionCat);
  }

  ngAfterViewInit(){
    this.instructionsCont = this.instructionsContainerRef.nativeElement;
    
    this.clickedElement = fromEvent(this.instructionsBTNRef.nativeElement, 'click').subscribe(()=> this.instructionsCont.style.display = 'block')

    this.clickedElement = fromEvent(this.closeRef.nativeElement,'click').subscribe(()=>
    this.instructionsCont.style.display = 'none')

    this.clickedElement = fromEvent(this.easyBTNRef.nativeElement,'click').subscribe(()=>
    {
      this.questionCat = 'easy';
      this.easyBTNRef.nativeElement.classList.remove('hover-On');
      this.easyBTNRef.nativeElement.style.visibility = 'hidden';
      this.setGame();
    })
   
    this.clickedElement = fromEvent(this.mediumBTNRef.nativeElement,'click').subscribe(()=>
    {
      this.questionCat = 'medium';
      this.mediumBTNRef.nativeElement.classList.remove('hover-On');
      this.mediumBTNRef.nativeElement.style.visibility = 'hidden';
      this.setGame();
    })

    this.clickedElement = fromEvent(this.hardBTNRef.nativeElement,'click').subscribe(()=>
    {
      this.questionCat = 'hard';
      this.hardBTNRef.nativeElement.classList.remove('hover-On');
      this.hardBTNRef.nativeElement.style.visibility = 'hidden';
      this.setGame();
    })
  }
  ngOnDestroy() {
    // add this for performance reason
    this.clickedElement.unsubscribe();
  }
}
