export class Statistics {
    private females: number;
    private males: number;

    constructor() {
        this.females = 0;
        this.males = 0;
    }

    public addFemale(qty: number = 1) {
        this.females += qty;
    }

    public addMale(qty: number = 1) {
        this.males += qty;
    }

    public removeFemale(qty: number = 1) {
        this.females -= qty;
    }

    public removeMale(qty: number = 1) {
        this.males -= qty;
    }

    public getNumberOfFemales() {
        return this.females;
    }

    public getNumberOfMales() {
        return this.males;
    }

    public getPopulation() {
        return this.males + this.females;
    }
}

