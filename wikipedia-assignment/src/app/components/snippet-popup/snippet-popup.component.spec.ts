import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnippetPopupComponent } from './snippet-popup.component';

describe('SnippetPopupComponent', () => {
  let component: SnippetPopupComponent;
  let fixture: ComponentFixture<SnippetPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnippetPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnippetPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
