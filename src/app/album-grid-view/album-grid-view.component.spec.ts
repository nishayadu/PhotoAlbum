import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumGridViewComponent } from './album-grid-view.component';

describe('AlbumGridViewComponent', () => {
  let component: AlbumGridViewComponent;
  let fixture: ComponentFixture<AlbumGridViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumGridViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
