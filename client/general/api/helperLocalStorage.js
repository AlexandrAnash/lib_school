import helperService from '../services/helperService';
import _ from 'lodash';

const noDataException = 'Нет данных в хранилище c id = ';

let _helper;

class helperLocalStorage {
    constructor(nameDal) {
        this._nameDal = nameDal;
        _helper = new helperService();
    }
    getAllData() {
        const data = localStorage.getItem(this._nameDal);
        if (!data) return [];
        try {
            const parse = JSON.parse(data);
            return parse;
        } catch (e) {
            throw e;
        }

    }
    getById(itemId) {
        const data = localStorage.getItem(this._nameDal);
        if (!data) return null;
        try {
            const parse = JSON.parse(data);
            var find = _.find(parse, { id: itemId });
            return find;
        } catch (e) {
            throw e;
        }

    }

    setItem(inputData) {
        const data = this.getAllData();
        if (!data) {
            inputData.id = 1;
            return localStorage.setItem(this._nameDal, JSON.stringify([inputData]));
        }
        _helper.isErrorTypeArray(data);
        const maxData = _.maxBy(data, 'id');
        const maxId = maxData ? maxData.id : 0;
        inputData.id = maxId + 1;
        data.push(inputData);
        return localStorage.setItem(this._nameDal, JSON.stringify(data));
    }

    updateItem(item) {
        const data = this.getAllData();
        _helper.isErrorTypeArray(data);
        const findItem = _.find(data, {id : item.id });
        
        if (!findItem) throw (noDataException + item.id);
        _.assign(findItem, item);
        return localStorage.setItem(this._nameDal, JSON.stringify(data));
    }
    
    removeItem(itemId) {
        const data = this.getAllData();
        _helper.isErrorTypeArray(data);
        const rData = _.remove(data, { id: itemId });

        if (rData.length === 0) throw noDataException + itemId;
        return localStorage.setItem(this._nameDal, JSON.stringify(data));
    }
}

export default helperLocalStorage;