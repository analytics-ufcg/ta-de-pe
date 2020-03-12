import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Faq } from '../shared/models/faq.model';
import { FaqService } from '../shared/services/faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject();

  faqs: Faq[];

  constructor(private faqService: FaqService) { }

  ngOnInit() {
    this.getFaqs();
  }

  getFaqs() {
    this.faqService
      .getFaqs()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(faqs => {
        this.faqs = faqs;
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
