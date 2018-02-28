import { async, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { IApiService } from '../../service/iapi.service';
import { ApiServiceMock } from '../../mocks/api.service.mock';
import { ComponentFixture } from '@angular/core/testing';

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

    it('should categorize dataset by owner gender', async(() => {
        // act
        component.getData();

        // assert
        expect(component.viewModel.error).toBe(false);
    }));
});
