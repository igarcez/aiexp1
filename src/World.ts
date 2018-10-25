import {AbstractEntity} from "./AbstractEntity";
import {FemaleEntity} from "./FemaleEntity";
import {MaleEntity} from "./MaleEntity";

export class World {
    public targePrice = 50000.00;
    public populationLimit = 10000;

    public entities: AbstractEntity[];
    private shouldExit: boolean;

    constructor() {
        this.entities = [];
        this.shouldExit = false;
    }

    public run() {
        this.addFirstCouples(3);
        let counter = 0;
        while (true) {
            this.printGenerationReport();

            if (this.shouldExit) {
                break;
            }

            this.removeExpiredEntities();
            this.performDataGathering();
            this.performPredictions();
            // this is where we gonna sleep for some time
            this.performRanking();
            // this has to happen after ranking to be sure we are not removing
            // mutated childs
            this.removeExcessivePopulation();
            this.performAging();
            this.performMating();
            console.log("finished round " + counter);

            counter += 1;
            if (counter > 300) {
                this.shouldExit = true;
            }
        }

        console.log("finishing execution, hope you had fun");
    }

    public findMale(): MaleEntity {
        // todo implement something to make this to not be the same male always, or maybe it should be?
        for (const entity of this.entities) {
            if (entity.sex === "male" && entity.alive) {
                return entity;
            }
        }
    }

    public spawnEntity(entity: AbstractEntity) {
        if (typeof entity === "undefined") {
            return;
        }
        this.entities.push(entity);
    }

    public performRanking() {
        this.entities.sort(
            (a, b) => {
                const aLastGuess = a.getLastGuess();
                const bLastGuess = b.getLastGuess();
                let aValue;
                let bValue;

                if (aLastGuess < this.targePrice) {
                    aValue = this.targePrice - aLastGuess;
                } else {
                    aValue = aLastGuess - this.targePrice;
                }

                if (bLastGuess < this.targePrice) {
                    bValue = this.targePrice - bLastGuess;
                } else {
                    bValue = bLastGuess - this.targePrice;
                }

                return aValue - bValue;
            });
    }

    private printGenerationReport() {
        const data = {
            age: {},
            alive: 0,
            entities: this.entities.length,
            sex: {
                female: 0,
                male: 0,
            },
        };

        this.entities.forEach((entity) => {
            for (const property in entity) {
                if (!entity.hasOwnProperty(property)) {
                    continue;
                }

                if (property === "world") {
                    continue;
                }

                if (property === "alive") {
                    if (entity[property] === true) {
                        data[property] += 1;
                    }
                    continue;
                }

                if (property === "sex" || property === "age") {
                    if (typeof data[property][entity[property]] === "undefined") {
                        data[property][entity[property]] = 0;
                    }

                    data[property][entity[property]] += 1;
                    continue;
                }
            }
        });

        console.log(data);
    }

    private removeExpiredEntities() {
        if (this.entities.length < 1) {
            console.log("there are no entities");
            return;
        }

        const aliveEntities = Array<AbstractEntity>();
        this.entities.forEach((entity) => {
            if (entity.alive) {
                aliveEntities.push(entity);
            }
        });

        this.entities = aliveEntities;
    }

    private addFirstCouples(qty: number) {
        let counter = 0;

        while (counter < qty) {
            counter++;
            const female = new FemaleEntity(this);
            female.setImportanceModifierIndex(1);
            this.entities.push(female);
            const male = new MaleEntity(this);
            male.setImportanceModifierIndex(1);
            this.entities.push(male);
        }
    }

    private performDataGathering() {
        this.entities.forEach((entity) => entity.gather());
    }

    private performPredictions() {
        const currentPrice = 100.00;

        this.entities.forEach((entity) => {
            const pricePrediction = entity.guess(currentPrice, "litecoin");
            console.log(pricePrediction);
        });
    }

    private performMating() {
        this.entities.forEach((entity) => !!entity.alive && entity.mate());
    }

    private performAging() {
        this.entities.forEach((entity) => entity.aging());
    }

    private removeExcessivePopulation() {
        if (this.entities.length <= this.populationLimit) {
            return;
        }

        const selectedEntities = Array<AbstractEntity>();
        let counter = 0;
        this.entities.forEach((entity) => {
            if (counter > this.populationLimit) {
                return;
            }

            selectedEntities.push(entity);
            counter++;
        });
        console.log("removing extra entities");
        this.entities = selectedEntities;
    }
}
