import { AbstractEntity } from "./AbstractEntity";
import { World } from "./World";

export class MaleEntity extends AbstractEntity {
    public sex: string;

    constructor(world: World) {
        super(world);
        this.world.statistics.addMale(1);
        this.sex = "male";
    }
}
