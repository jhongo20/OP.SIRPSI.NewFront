import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './app-question.component.html',
})
export class QuestionComponent {
  responseSelected: number = 0;
  questionPoints: number = 0;
  @Input() question: string;
  @Input() options: any;

  constructor() {}

  checkAnswer(event: any) {
    console.log(event);
    console.log(this.questionPoints);
    console.log(this.responseSelected);
    console.log((this.questionPoints = this.questionPoints + event.value));
  }
}
