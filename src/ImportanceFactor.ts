import {ContextType} from "./ContextType";

export class ImportanceFactor {
    public coin: string;
    public keyword: string;
    public contextType: ContextType;
    /**
     * this is set by the parent entity
     */
    private importanceFactorIndex: number = 0;

    constructor(coin: string, keyword: string, contextType: ContextType) {
        this.coin = coin;
        this.keyword = keyword;
        this.contextType = contextType;
    }

    public setImportanceFactorIndex(value: number) {
        this.importanceFactorIndex = value;
    }

    public getImportanceFactorIndex(): number {
        return this.importanceFactorIndex;
    }
}
