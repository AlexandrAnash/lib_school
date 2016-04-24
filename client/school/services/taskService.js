import apiResponseTransformer from '../../general/services/apiResponseTransformer';
import helperService from '../../general/services/helperService';
import Task from '../models/Task';

let _context;
let _helper;

function isErrorTypeTask(data) {
    return _helper.isErrorTypeCustom(data, Task);
}

class taskService {
    constructor (context) {
        _context = context;
        _helper = new helperService();
    }   
    
    getAllData() {
        return new Promise((resolve) => {
            return resolve(_context.getAllData());
        }).then((data) => {
            if (_helper.isErrorTypeArray(data)) return;
            return apiResponseTransformer(Task, data);
        });
    }
    getById (taskId) {
        return new Promise((resolve, reject) => {
            if (_helper.isErrorTypeNumber(taskId)) return;
            resolve(_context.getById(taskId));
        }).then((data) => {
            return apiResponseTransformer(Task, data);
        });
    }

    create(task) {
        return new Promise((resolve, reject) => {
            if (isErrorTypeTask(task)) return;
            resolve(_context.create(task));
        });
    }
    update(task) {
        return new Promise((resolve, reject) => {
            if (isErrorTypeTask(task)) return;
            resolve(_context.update(task));
        });
    }
    
    deleteById(taskId) {
        return new Promise((resolve, reject) => {
            if (_helper.isErrorTypeNumber(taskId)) return;
            resolve(_context.deleteById(taskId));
        });
    }
}

export default taskService;
export { Task }