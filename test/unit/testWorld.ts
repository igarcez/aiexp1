import {assert} from "chai";
import * as sinon from "sinon";
import { suite, test, slow, timeout } from "mocha-typescript";
import {MaleEntity} from "../../src/MaleEntity";
import {World} from "../../src/World";

@suite class WorldTest extends World {
    @test "Some test test"() {
        console.log("testing stuff");
        assert(1 === 1);
    }

    @test "Male with the best guess should be retrieved by findMale"() {
        const world = new World();
        const male1 = new MaleEntity(world);
        const fakeGuess1 = sinon.fake.returns(900);
        sinon.replace(male1, "getLastGuess", fakeGuess1);
        const male2 = new MaleEntity(world);
        const fakeGuess2 = sinon.fake.returns(1150);
        sinon.replace(male2, "getLastGuess", fakeGuess2);
        const male3 = new MaleEntity(world);
        const fakeGuess3 = sinon.fake.returns(950);
        sinon.replace(male3, "getLastGuess", fakeGuess3);

        world.spawnEntity(male1);
        world.spawnEntity(male2);
        world.spawnEntity(male3);

        world.targePrice = 2000;

        world.performRanking();
        assert(world.findMale().getLastGuess() === 1150);

        world.targePrice = 800;
        world.performRanking();
        assert(world.findMale().getLastGuess() === 900);

        world.targePrice = 1000;
        world.performRanking();
        assert(world.findMale().getLastGuess() === 950);
    }
}
