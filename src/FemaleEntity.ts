import {AbstractEntity} from "./AbstractEntity";
import {MaleEntity} from "./MaleEntity";
import {World} from "./World";

export class FemaleEntity extends AbstractEntity {
    public sex: string;

    constructor(world: World) {
        super(world);
        this.world.statistics.addFemale(1);
        this.sex = "female";
    }

    public mate() {
        const partner: MaleEntity = this.world.findMale();
        const child: AbstractEntity = this.generateChild(partner);

        this.world.spawnEntity(child);
    }

    /**
     * this is probably the most important algorithm to have balanced, expect changes
     * @param partner
     */
    public generateChild(partner: MaleEntity): AbstractEntity {
        let child;
        if (this.defineSex() === "male") {
            child = new MaleEntity(this.world);
        } else {
            child = new FemaleEntity(this.world);
        }

        // todo mix up the importanceFactorCollection elements importanceFactor
        // that both parents have in common

        child.setImportanceModifierIndex(
            (this.getImportanceModifierIndex() + partner.getImportanceModifierIndex()) / 2,
        );

        // it is mutation time :D
        child.setImportanceModifierIndex(
            child.getImportanceModifierIndex() * this.generateMutation(),
        );

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

    private generateMutation(): number {
        let result = 1;

        /**
         * random() returns a random number between 0 and 1, if such number is
         * less than 0.001, it triggers a mutation
         */
        if ((Math.random() * 100000) < 10) {
            result = Math.random() + 0.5999;
        }

        return result;
    }
}
