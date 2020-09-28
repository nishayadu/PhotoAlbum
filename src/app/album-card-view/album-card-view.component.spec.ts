import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumCardViewComponent } from './album-card-view.component';

describe('AlbumCardViewComponent', () => {
  let component: AlbumCardViewComponent;
  let fixture: ComponentFixture<AlbumCardViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumCardViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
