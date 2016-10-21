/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { GlobalEventsService } from './global-events.service';

describe('Service: GlobalEvents', () => {
  let myMockWindow: Window;
  beforeEach(() => {
    myMockWindow = <any> {location: <any> {hostname: '127.0.0.1'}};
    TestBed.configureTestingModule({
      providers: [
        { provide: 'Window', useValue: window },
        GlobalEventsService
      ]
    });
  });

  beforeEach(async(() => {
    console.log('Compiling');
    TestBed.compileComponents().catch(error => console.error(error));
    console.log('Compiling again');
  }));

  it('should ...', inject([GlobalEventsService], (service: GlobalEventsService) => {
    expect(service).toBeTruthy();
  }));

  it('should call resize without error', inject([GlobalEventsService], (service: GlobalEventsService) => {
    service.resize();
    expect(service).toBeTruthy();
  }));

});