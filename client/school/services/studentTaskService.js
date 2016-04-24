import apiResponseTransformer from '../../general/services/apiResponseTransformer';
import helperService from '../../general/services/helperService';
import Task from '../models/Task';

let _context;
let _helper;

class studentTaskService {
    constructor (context) {
        _context = context;
        _helper = new helperService();
    }   
    getAllTaskByStudentId(studentId) {
        return new Promise((resolve) => {
            return resolve(_context.getAllTaskByStudentId(studentId));
        }).then((data) => {
            if (_helper.isErrorTypeArray(data)) return;
            return apiResponseTransformer(Task, data);
        });
    }

    setGroupTask(groupId, taskId) {
        return new Promise((resolve) => {
            if (_helper.isErrorTypeNumber(groupId)
                || _helper.isErrorTypeNumber(taskId)) return;

            return resolve(_context.setGroupTask(groupId, taskId));
        });
    }
    setStudentTask(studentId, taskId) {
        return new Promise((resolve) => {
            if (_helper.isErrorTypeNumber(studentId)
                || _helper.isErrorTypeNumber(taskId)) return;

            return resolve(_context.setStudentTask(studentId, taskId));
        });
    }
}

export default studentTaskService;
export { Task }