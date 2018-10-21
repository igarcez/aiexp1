import {ImportanceFactor} from "./ImportanceFactor";
import {World} from "./World";

export class AbstractEntity {
    public age: number;
    public alive: boolean;
    public world: World;
    public sex: string;
    public importanceFactorCollection: ImportanceFactor[];

    constructor(world: World) {
        this.age = 0;
        this.alive = true;
        this.world = world;
    }

    public gather() {
        // todo maybe google-trends-api package?
        // console.log('gathering');
    }

    public guess(coinName: string = null) {
        // todo
        // console.log('guessing');
    }

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
