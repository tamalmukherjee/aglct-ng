import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IApiService } from '../../service/iapi.service';
import { People } from '../../model/people.model';
import { CatsByOwnerGender } from '../../model/catsByOwnerGender';
import * as _ from 'lodash';
import { HomePageViewModel } from '../../model/homePageView.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public viewModel: HomePageViewModel;

    constructor(private _api: IApiService) {
        this.viewModel = new HomePageViewModel();
    }

    filterCatsByOwnerGender(data: People[]): CatsByOwnerGender[] {
        const returnData: CatsByOwnerGender[] = [];
        if (data === undefined) { return returnData; }

        const reducedData = _.reduce(data, function (result, owner) {
            const petCats = _.filter(owner.pets, { 'type': 'Cat' });
            _.forEach(petCats, function (value) {
                if (!result[owner.gender]) {
                    result[owner.gender] = [];
                }
                result[owner.gender].push(value.name);
            });
            return result;
        }, {});

        _.forEach(reducedData, function (value, key) {
            returnData.push({
                ownerGender: key,
                cats: _.sortBy(value)
            });
        });
        return returnData;
    }

    getData() {
        this._api.getPeople().subscribe((data) => {
            this.viewModel.catData = this.filterCatsByOwnerGender(data);
        }, (err) => {
            console.error(err);
            this.viewModel.error = true;
        });
    }

    ngOnInit(): void {
        this.getData();
    }
}
