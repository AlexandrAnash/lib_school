import helperLocalStorage from '../../general/api/helperLocalStorage';
import _ from 'lodash';

const nameStorage = 'TaskDB';
let _helperLocalStorage;

class taskRest {
    constructor() {
        _helperLocalStorage = new helperLocalStorage(nameStorage);
    }
    getAllData() {
        return _helperLocalStorage.getAllData();
    }

    getById(itemId) {
        return _helperLocalStorage.getById(itemId);
    }

    create(item) {
        return _helperLocalStorage.setItem(item);
    }
    
    update(item) {
        return _helperLocalStorage.updateItem(item);
    }

    deleteById(itemId) {
        return _helperLocalStorage.removeItem(itemId);
    }
}

export default taskRest;