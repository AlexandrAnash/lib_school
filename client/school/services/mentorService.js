import apiResponseTransformer from '../../general/services/apiResponseTransformer';
import helperService from '../../general/services/helperService';
import Mentor from '../models/Mentor';

let _context;
let _helper;

function isErrorTypeMentor(data) {
    return _helper.isErrorTypeCustom(data, Mentor);
}

class mentorService {
    constructor (context) {
        _context = context;
        _helper = new helperService();
    }   
    
    getAllData() {
        return new Promise((resolve) => {
            return resolve(_context.getAllData());
        }).then((data) => {
            if (_helper.isErrorTypeArray(data)) return;
            return apiResponseTransformer(Mentor, data);
        });
    }
    getById (mentorId) {
        return new Promise((resolve, reject) => {
            if (_helper.isErrorTypeNumber(mentorId)) return;
            resolve(_context.getById(mentorId));
        }).then((data) => {
            return apiResponseTransformer(Mentor, data);
        });
    }

    create(mentor) {
        return new Promise((resolve, reject) => {
            if (isErrorTypeMentor(mentor)) return;
            resolve(_context.create(mentor));
        });
    }
    update(mentor) {
        return new Promise((resolve, reject) => {
            if (isErrorTypeMentor(mentor)) return;
            resolve(_context.update(mentor));
        });
    }
    
    deleteById(mentorId) {
        return new Promise((resolve, reject) => {
            if (_helper.isErrorTypeNumber(mentorId)) return;
            resolve(_context.deleteById(mentorId));
        });
    }
}

export default mentorService;
export { Mentor }