import { Observable } from 'rxjs/Observable';
import { People } from '../model/people.model';

export abstract class IApiService {
    public abstract getPeople(): Observable<People[]>;
}