// card.component.ts
import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements AfterViewInit {
  @Input() title!: string;
  @Input() content!: string | undefined;
  @Input() workspaceId!: string;
// checking the more button clicked or not
  isExpanded:boolean = false;
  isOverflow:boolean = false;
// selecting the content section of the card
  @ViewChild('contentPreview') contentPreview!: ElementRef;
  @ViewChild('contentFull') contentFull!: ElementRef;

  ngAfterViewInit() {
    this.checkOverflow();
  }
// checking the content height of the card and adjusting the overflow
  checkOverflow() {
    const contentPreviewElement = this.contentPreview.nativeElement;
    this.isOverflow = contentPreviewElement.scrollHeight > contentPreviewElement.clientHeight;
  }
// expanding and collapsing the content 
  toggleContent(event: Event) {
    event.stopPropagation();
    this.isExpanded = !this.isExpanded;
  }

}
