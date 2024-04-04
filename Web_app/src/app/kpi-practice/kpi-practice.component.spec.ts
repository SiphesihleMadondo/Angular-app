import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KPIPRACTICEComponent } from './kpi-practice.component';

describe('KPIPRACTICEComponent', () => {
  let component: KPIPRACTICEComponent;
  let fixture: ComponentFixture<KPIPRACTICEComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KPIPRACTICEComponent]
    });
    fixture = TestBed.createComponent(KPIPRACTICEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
