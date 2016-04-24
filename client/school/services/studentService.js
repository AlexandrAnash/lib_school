import apiResponseTransformer from '../../general/services/apiResponseTransformer';
import helperService from '../../general/services/helperService';
import Student from '../models/Student';

let _context;
let _helper;

function isErrorTypeStudent(data) {
    return _helper.isErrorTypeCustom(data, Student);
}

class studentService {
    constructor (context) {
        _context = context;
        _helper = new helperService();
    }   
    
    getAllData() {
        return new Promise((resolve) => {
            resolve(_context.getAllData());
        }).then((data) => {
            if (_helper.isErrorTypeArray(data)) return;
            return apiResponseTransformer(Student, data);
        });
    }
    getById (studentId) {
        return new Promise((resolve, reject) => {
            if (_helper.isErrorTypeNumber(studentId)) return;
            resolve(_context.getById(studentId));
        }).then((data) => {
            return apiResponseTransformer(Student, data);
        });
    }

    createStudent(student) {
        return new Promise((resolve, reject) => {
            if (isErrorTypeStudent(student)) return;
            resolve(_context.create(student));
        });
    }
    updateGroup(studentId, groupId) {
        return new Promise((resolve, reject) => {
            if (_helper.isErrorTypeNumber(studentId) 
                || _helper.isErrorTypeNumber(groupId)) return;

            resolve(_context.updateGroup(studentId, groupId));
        });
    }
    
    getByGroupId(groupId) {
        return new Promise((resolve, reject) => {
            if (_helper.isErrorTypeNumber(groupId)) return;
            
            resolve(_context.getByGroupId(groupId));
        }).then((data) => {
            if (_helper.isErrorTypeArray(data)) return;
            return apiResponseTransformer(Student, data);
        });

    }
    update(student) {
        return new Promise((resolve, reject) => {
            if (isErrorTypeStudent(student)) return;
            resolve(_context.update(student));
        });
    }
    
    deleteById(studentId) {
        return new Promise((resolve, reject) => {
            if (_helper.isErrorTypeNumber(studentId)) return;
            resolve(_context.deleteById(studentId));
        });
    }
}

export default studentService;
export { Student };