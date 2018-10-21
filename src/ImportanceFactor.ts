import {ContextType} from "./ContextType";

export class ImportanceFactor {
    public coin: string;
    public keyword: string;
    public contextType: ContextType;

    constructor(coin: string, keyword: string, contextType: ContextType) {
        this.coin = coin;
        this.keyword = keyword;
        this.contextType = contextType;
    }
}
