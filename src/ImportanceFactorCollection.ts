import {AbstractEntity} from "./AbstractEntity";
import {ContextType} from "./ContextType";
import {ImportanceFactor} from "./ImportanceFactor";

export class ImportanceFactorCollection {
    public factors: ImportanceFactor[];
    private parent: AbstractEntity;

    constructor(parent: AbstractEntity) {
        this.parent = parent;
        this.factors = [];
        // todo avoid loanding the full collection when it is not needed
        this.loadCollection();
    }

    public search(
        coin: string = null,
        keyword: string = null,
        contextType: ContextType = null,
    ): ImportanceFactor[] {
        const result = [];

        this.factors.forEach((factor) => {
            if (coin && factor.coin !== coin) {
                return;
            }

            if (keyword && factor.keyword !== keyword) {
                return;
            }

            if (contextType && factor.contextType !== contextType) {
                return;
            }

            result.push(factor);
        });

        return result;
    }

    public byCoin(coin: string) {
        return this.search(coin);
    }

    private loadCollection() {
        // todo load from actual data
        // todo should coin be a enum?
        // mock for now
        const mockImportanceFactor = new ImportanceFactor(
            "litecoin",
            "price",
            ContextType.Question,
        );

        mockImportanceFactor.setImportanceFactorIndex(10);
        this.factors.push(mockImportanceFactor);
    }
}
