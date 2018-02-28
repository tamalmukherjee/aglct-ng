import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { IApiService } from './iapi.service';
import { People } from '../model/people.model';
import { ConfigService } from './config.service';

@Injectable()
export class ApiService implements IApiService {
    constructor(
        private _http: Http,
        private _config: ConfigService
    ) { }

    public getPeople(): Observable<People[]> {
        return this._http.get(this._config.current.jsonDataURL)
            .catch((err: Response) => {
                console.error(err);
                return Observable.throw(err.json());
            })
            .map((response) => response.json() as People[]);
    }
}