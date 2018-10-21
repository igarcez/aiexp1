import { AbstractEntity } from "./AbstractEntity";
import { World } from "./World";

export class MaleEntity extends AbstractEntity {
    public sex: string;

    constructor(world: World) {
        super(world);
        this.sex = "male";
    }
}
