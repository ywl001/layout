import { Component } from '@angular/core';
import { ResizeEvent } from './resize-event';
import { TweenMax } from 'gsap';
import { Observable, fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private isLeftOpen = true;
  private isMaxMiddle = false;
  private isMinMiddle = true;
  private middleWidth = 500;
  private totalWidth;

  constructor(){
    
  }

  ngOnInit(): void {
    this.totalWidth = window.innerWidth;
    fromEvent(window,'resize').subscribe(e=>{
      this.totalWidth = (<Window>(e.target)).innerWidth;
      console.log(this.totalWidth);
    })
  }
  onResizeStop(e: ResizeEvent) {
    this.middleWidth = e.size.width;
    console.log(this.middleWidth);
  }

  resizeMiddle() {
    this.isMaxMiddle ? this.resetMiddle() : this.maxMiddle();
  }

  resizeRight(){
    this.isMinMiddle ? this.resetMiddle() : this.minMiddle();
  }

  maxMiddle(){
    let w;
    this.isLeftOpen ? w = this.totalWidth - 250 : w = this.totalWidth;
    this.setMiddleWidth(w);
    this.isMaxMiddle = true;
    this.isMinMiddle = false;
  }

  minMiddle(){
    this.setMiddleWidth(0);
    this.isMinMiddle = true;
    this.isMaxMiddle = false;
  }

  resetMiddle(){
    this.setMiddleWidth(this.middleWidth);
    this.isMinMiddle = false;
    this.isMaxMiddle = false;
  }

  onToggleLeft() {
    this.isLeftOpen ? this.closeLeftContainer() : this.openLeftContainer();
  }

  setMiddleWidth(middleWidth){
    TweenMax.to('.middleContainer', 0.5, { width: middleWidth + 'px' });
  }

  openLeftContainer() {
    TweenMax.to(".leftContainer", 0.5, { width: "250px" });
    TweenMax.to("#toggleLeft", 0.5, { transform: "rotate(0deg)" });
    this.isLeftOpen = true;
  }
  closeLeftContainer() {
    TweenMax.to(".leftContainer", 0.5, { width: "0px" });
    TweenMax.to("#toggleLeft", 0.5, { transform: "rotate(180deg)" });
    this.isLeftOpen = false;
  }
}
