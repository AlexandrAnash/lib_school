import helperLocalStorage from '../../general/api/helperLocalStorage';
import _ from 'lodash';


const nameStorage = 'StudentDB';
let _helperLocalStorage;

class studentRest {
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
    
    getByGroupId(groupId) {
        var allData = _helperLocalStorage.getAllData();
        return _.find(allData, { groupId: groupId });
    }
    update(item) {
        return _helperLocalStorage.updateItem(item);
    }
    updateGroup(itemId, groupId) {
        var item = _helperLocalStorage.getById(itemId);
        if (item) {
            item.groupId = groupId;
        }
        return _helperLocalStorage.updateItem(item);
    }
    deleteById(itemId) {
        return _helperLocalStorage.removeItem(itemId);
    }
}

export default studentRest;