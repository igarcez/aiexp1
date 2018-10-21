import {AbstractEntity} from "./AbstractEntity";
import {MaleEntity} from "./MaleEntity";
import {World} from "./World";

export class FemaleEntity extends AbstractEntity {
    public sex: string;

    constructor(world: World) {
        super(world);
        this.sex = "female";
    }

    public mate() {
        const partner: MaleEntity = this.world.findMale();
        const child: AbstractEntity = this.generateChild(partner);

        this.world.spawnEntity(child);
    }

    public generateChild(partner: MaleEntity): AbstractEntity {
        // todo mix up 'genes'
        let child;
        if (this.defineSex() === "male") {
            child = new MaleEntity(this.world);
        } else {
            child = new FemaleEntity(this.world);
        }

        return child;
    }

    private defineSex() {
        // todo change algorithm to be able to tweak chance percentage
        const sexIndex = Math.floor(Math.random() * Math.floor(2)) + 1;
        if (sexIndex === 1) {
            return "male";
        } else {
            return "female";
        }
    }
}
