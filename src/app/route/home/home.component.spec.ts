import { async, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { IApiService } from '../../service/iapi.service';
import { ApiServiceMock } from '../../mocks/api.service.mock';
import { ComponentFixture } from '@angular/core/testing';
import { People } from '../../model/people.model';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HomeComponent
            ],
            providers: [
                { provide: IApiService, useClass: ApiServiceMock }
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(HomeComponent);
            component = fixture.componentInstance;
        });
    }));

    it('initially component error flag should be false', async(() => {
        // assert
        expect(component.viewModel.error).toBe(false);
    }));

    it('component should call api to get data', async(() => {
        // arrange
        const api = fixture.debugElement.injector.get(IApiService);
        spyOn(api, 'getPeople').and.callThrough();

        // act
        component.ngOnInit();

        // assert
        expect(api.getPeople).toHaveBeenCalledTimes(1);
    }));

    it('component should call filterCatsByOwnerGender function after getting it', async(() => {
        // arrange
        spyOn(component, 'filterCatsByOwnerGender');

        // act
        component.ngOnInit();

        // assert
        expect(component.filterCatsByOwnerGender).toHaveBeenCalledTimes(1);
    }));

    it('data should be grouped under Male and Female for the mock data', async(() => {
        // act
        component.ngOnInit();

        // assert
        expect(component.viewModel.catData.length).toBe(2);
        expect(component.viewModel.catData[0].ownerGender).toBe('Male');
        expect(component.viewModel.catData[1].ownerGender).toBe('Female');
    }));

    it('there should be 4 cats under Male and 3 under Female for the mock data', async(() => {
        // act
        component.ngOnInit();

        // assert
        expect(component.viewModel.catData.length).toBe(2);
        expect(component.viewModel.catData[0].cats.length).toBe(4);
        expect(component.viewModel.catData[1].cats.length).toBe(3);
    }));

    it('cat names should be ordered', async(() => {
        // act
        component.ngOnInit();

        // assert
        expect(component.viewModel.catData[0].cats.join()).toBe('Garfield,Jim,Max,Tom');
        expect(component.viewModel.catData[1].cats.join()).toBe('Garfield,Simba,Tabby');
    }));

    it('owner gender group will be omitted if there is no cat under that group', async(() => {
        // arrange
        const inputData: People[] = JSON.parse('[{"name":"Bob","gender":"Male","age":23,"pets":[{"name":"Fido","type":"Dog"}]},{"name":"Jennifer","gender":"Female","age":18,"pets":[{"name":"Garfield","type":"Cat"}]}]');

        // act
        let filteredData = component.filterCatsByOwnerGender(inputData);

        // assert
        expect(filteredData.length).toBe(1);
        expect(filteredData[0].ownerGender).toBe('Female');
    }));

    it('display error message if view model error flag is true', async(() => {
        // arrange
        component.viewModel.error = true;
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;

        // assert
        expect(compiled.querySelector('div.error').textContent).toContain('Oops, something went wrong...Please try again later.');
    }));

    it('should render group headings in a h2 tag', async(() => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h2:first-of-type').textContent).toContain('Male');
      }));
});
