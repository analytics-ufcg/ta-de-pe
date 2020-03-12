import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { Faq } from '../models/faq.model';
import { faqsData } from './faq.data';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  private faqs: BehaviorSubject<Faq[]>;

  constructor() {
    this.faqs = new BehaviorSubject(faqsData);
  }

  getFaqs(): Observable<Faq[]> {
    return this.faqs;
  }
}
