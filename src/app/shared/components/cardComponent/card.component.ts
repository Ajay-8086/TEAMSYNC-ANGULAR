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

  isExpanded:boolean = false;
  isOverflow:boolean = false;

  @ViewChild('contentPreview') contentPreview!: ElementRef;
  @ViewChild('contentFull') contentFull!: ElementRef;

  ngAfterViewInit() {
    this.checkOverflow();
  }

  checkOverflow() {
    const contentPreviewElement = this.contentPreview.nativeElement;
    this.isOverflow = contentPreviewElement.scrollHeight > contentPreviewElement.clientHeight;
  }

  toggleContent(event: Event) {
    event.stopPropagation();
    this.isExpanded = !this.isExpanded;
  }

}
