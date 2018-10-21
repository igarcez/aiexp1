import {AbstractEntity} from "./AbstractEntity";
import {FemaleEntity} from "./FemaleEntity";
import {MaleEntity} from "./MaleEntity";

export class World {
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
            this.performAging();
            this.performMating();
            console.log("finished round " + counter);
            // this.report();
            counter += 1;
            if (counter > 30) {
                // 2kk~ at round 63~
                this.shouldExit = true;
            }
        }

        console.log("finishing execution, hope you had fun");
    }

    public findMale(): MaleEntity {
        // todo sort entities by performance, so this return the best male
        // todo implement something to make this to not be the same male always, or maybe it should be?
        for (const entity of this.entities) {
            if (entity.sex === "male" && entity.alive) {
                return entity;
            }
        }
    }

    public spawnEntity(entity) {
        if (typeof entity === "undefined") {
            return;
        }
        this.entities.push(entity);
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

        const aliveEntities = [];
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
            this.entities.push(new FemaleEntity(this));
            this.entities.push(new MaleEntity(this));
        }
    }

    private performDataGathering() {
        this.entities.forEach((entity) => entity.gather());
    }

    private performPredictions() {
        this.entities.forEach((entity) => entity.guess());
    }

    private performRanking() {
        // console.log("ranking...");
    }

    private performMating() {
        this.entities.forEach((entity) => !!entity.alive && entity.mate());
    }

    private performAging() {
        this.entities.forEach((entity) => entity.aging());
    }
}
