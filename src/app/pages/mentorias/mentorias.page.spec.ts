import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MentoriasPage } from './mentorias.page';

describe('MentoriasPage', () => {
  let component: MentoriasPage;
  let fixture: ComponentFixture<MentoriasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MentoriasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
