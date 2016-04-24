import helperLocalStorage from '../../general/api/helperLocalStorage';
import StudentTask from '../models/StudentTask';
import _ from 'lodash';

const nameStorage = 'StudentTaskDB';
var _helperLocalStorage;
var _helperLocalStorageTask;
var _helperLocalStorageStudent;

class studentTaskRest {
    constructor() {
        _helperLocalStorage = new helperLocalStorage(nameStorage);
        _helperLocalStorageTask = new helperLocalStorage('TaskDB');
        _helperLocalStorageStudent = new helperLocalStorage('StudentDB');
    }

    setRatingStudent(studentId, taskId, rating) {
        const allST = _helperLocalStorage.getAllData();
        var item = _.find(allST, { studentId: studentId, taskId: taskId });
        if (!item) return;
        item.rating = rating;   
        return localStorage.setItem(nameStorage, JSON.stringify(allST));
    }

    setRatingGroup(groupId, taskId, rating) {
        const allST = _helperLocalStorage.getAllData();
        const allStudent = _helperLocalStorageStudent.getAllData();
        const filterByGroup = _.filter(allStudent, { groupId: groupId });
        
        _.each(filterByGroup, function(student) {
            var item = _.find(allST, { studentId: student.id, taskId: taskId });
            if (!item) return;
            item.rating = rating;
        });

        return localStorage.setItem(nameStorage, JSON.stringify(allST));
    }

    setGroupTask(groupId, taskId) {
        const allST = _helperLocalStorage.getAllData();
        const allStudent = _helperLocalStorageStudent.getAllData();
        const filterByGroup = _.filter(allStudent, { groupId: groupId });
        const maxData = _.maxBy(_helperLocalStorage.getAllData(), 'id');
        
        var insertArray = [];
        var maxId = maxData ? maxData.id : 0;
        _.each(filterByGroup, function(student) {
            maxId++;
            insertArray.push(new StudentTask({
                id: maxId,
                studentId: student.id,
                taskId: taskId
            }));
        });
        var result = JSON.stringify(_.concat(allST, insertArray));
        return localStorage.setItem(nameStorage, result);
    }

    setStudentTask(studentId, taskId) {
        return _helperLocalStorage.setItem(new StudentTask({
            studentId: studentId,
            taskId: taskId
        }));
    }

    getAllTaskByStudentId(studentId) {
        const allST = _helperLocalStorage.getAllData();
        var resultArray = [];
        const filterByStudent = _.filter(allST, { studentId: studentId });
        _.each(filterByStudent, (st) => {
            resultArray.push(_helperLocalStorageTask.getById(st.taskId));
        });
        return resultArray;
    }
}

export default studentTaskRest;