import { Injectable } from '@angular/core';
import { IConfigService } from './iconfig.service';

@Injectable()
export class ConfigService {
    public current: IConfigService;

    constructor() {
        this.current = {
            jsonDataURL: 'http://agl-developer-test.azurewebsites.net/people.json'
        };
    }
}