import {ImportanceFactorCollection} from "./ImportanceFactorCollection";
import {World} from "./World";

export class AbstractEntity {
    public age: number;
    public alive: boolean;
    public world: World;
    public sex: string;

    public importanceFactorCollection: ImportanceFactorCollection;
    private importanceModifierIndex: number;

    constructor(world: World) {
        this.age = 0;
        this.alive = true;
        this.world = world;
        this.importanceFactorCollection = new ImportanceFactorCollection(this);
    }

    /**
     * this will be called when a child entity is being created
     * should be part of the parents genes
     *
     * @param value
     */
    public setImportanceModifierIndex(value: number) {
        this.importanceModifierIndex = value;
    }

    /**
     * @return number
     */
    public getImportanceModifierIndex(): number {
        return this.importanceModifierIndex;
    }

    public gather() {
        // todo maybe google-trends-api package?
        // console.log('gathering');
    }

    /**
     * this might be the second most important algorithm of the project, expect changes
     * @param coinName
     * @return number The multiplier for the price
     */
    public guess(coinName: string = null): number {
        let factorsImportanceSum = 0;
        this.importanceFactorCollection.byCoin(coinName).forEach((factor) => {
            factorsImportanceSum += factor.getImportanceFactorIndex();
        });

        return this.getImportanceModifierIndex() * factorsImportanceSum;
    }

    /**
     * @todo make this a bit random, it also means how many children a female
     * will have during its whole life, since it has a offspring per round
     */
    public aging() {
        this.age += 1;
        if (this.age > 3) {
            this.die();
        }
    }

    public die() {
        this.alive = false;
    }

    public mate() {
        // should be implemented in the female
    }
}
