import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
/**
 * **Use like this:**
 * 1. import
 * ```
   import { MockDocumentService } from '../../../mocks/mock-document.service.spec';
   ```
 * 2. create
 * ```
   let mockDocumentService = new MockDocumentService();
   ```
 * 3. Add to providers
 * ```
   providers: [
     { provide: 'Document', useValue: mockDocumentService }
   ]
 * ```
 */
@Injectable()
export class MockDocumentService {
  events$ = {};
  activeElement;
  newEvent(event, eventObject) {
    this.events$[event].next(eventObject);
  }
  addEventListener(event, callback) {
    this.events$[event] = new Subject();
    this.events$[event].asObservable().subscribe(eventObject => {
      callback(eventObject);
    });
  }
  setActiveElement(newActiveElement) {
    this.activeElement = newActiveElement;
  }
}
