import { HeaderComponent } from '@components/header/header.component'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { IState } from '@store/store'

describe('HeaderComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>
  let router: Router
  let route: ActivatedRoute
  let store: Store<IState>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), HeaderComponent],
      providers: [provideMockStore()]
    }).compileComponents()

    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    router = TestBed.inject(Router)
    route = TestBed.inject(ActivatedRoute)
    store = TestBed.inject(Store)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should navigate to selected route', () => {
    const navigateSpy = spyOn(router, 'navigate')
    component.menuItemClickHandler({ route: '/statistics' })
    expect(navigateSpy).toHaveBeenCalledWith(['/statistics'])
  })
})
