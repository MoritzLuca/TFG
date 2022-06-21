import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { T1_addPage } from './t1_add.page';

describe('T1_addPage', () => {
  let component: T1_addPage;
  let fixture: ComponentFixture<T1_addPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [T1_addPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(T1_addPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
