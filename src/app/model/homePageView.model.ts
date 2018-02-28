import { CatsByOwnerGender } from './catsByOwnerGender';

export class HomePageViewModel {
    public catData: CatsByOwnerGender[];
    public error: boolean;

    constructor() {
        this.catData = [];
        this.error = false;
    }
}