import { async, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { IApiService } from '../../service/iapi.service';
import { ApiServiceMock } from '../../mocks/api.service.mock';
import { ComponentFixture } from '@angular/core/testing';

describe('HomeComponent', () => {
    let comp: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [
                HomeComponent
            ],
            providers: [
                { provide: IApiService, useClass: ApiServiceMock }
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(HomeComponent);
            comp = fixture.componentInstance;
        });
    });

    it('should categorize dataset by owner gender', async(() => {
        // act
        comp.getData();

        // assert
        expect(comp.viewModel.error).toBe(false);
    }));
});
