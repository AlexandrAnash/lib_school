import helperLocalStorage from '../../general/api/helperLocalStorage';
import _ from 'lodash';

const nameStorage = 'MentorDB';
let _helperLocalStorage;

class mentorRest {
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

export default mentorRest;