/* tslint:disable:no-unused-variable */
import { Injectable } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Route, Router} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs/Rx';

import { LayoutComponent } from './layout.component';
import { CoreModule  } from '../core.module';
import { FooterComponent } from '../footer/footer.component';
import { GlobalEventsService } from '../global-events/global-events.service';
import { NavComponent } from '../nav/nav.component';
import { HomeComponent } from '../../home/home.component';
import { HomeModule } from '../../home/home.module';
import { ApiService } from '../api/api.service';
import { MockDocumentService } from '../../../mocks/mock-document.service.spec';

@Injectable()
export class MockApiService {
  public recipeList$;
  private mockArray = [
    {
      title: 'test title 1'
    },
    {
      title: 'test title 2'
    }
  ];
  constructor() {
    this.recipeList$ = new Subject();
    this.update();
  }
  update() {
    this.recipeList$.next(this.mockArray);
  }
}

describe('LayoutComponent', () => {
  const config: Route[] = [
    { path: '', component: HomeComponent },
    { path: 'test', component: HomeComponent, data: { layout: { paddingTop: true } }}
  ];
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let location: Location;
  let router: Router;
  let mockDocumentService = new MockDocumentService();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        HomeModule,
        RouterTestingModule.withRoutes(config)
      ],
      providers: [
        GlobalEventsService,
        { provide: ApiService, useValue: MockApiService },
        { provide: 'Document', useValue: mockDocumentService },
        { provide: 'Window', useValue: window }
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([Router, Location], (_router: Router, _location: Location) => {
    location = _location;
    router = _router;
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update padding on Height changes', () => {
    component.onHeightChange('top', 40, 10);
    expect(component.padding.top).toEqual('50px');
  });

  it('should set fixed to true on route change', () => {
    router.navigate(['/test']).then(() => {
      expect(location.path()).toBe('/test');
      expect(component.layout['paddingTop']).toBe(true);
    });
  });

});
