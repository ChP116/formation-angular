import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatiereFormComponent } from './matiere-form.component';

describe('MatiereFormComponent', () => {
  let component: MatiereFormComponent;
  let fixture: ComponentFixture<MatiereFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatiereFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatiereFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
