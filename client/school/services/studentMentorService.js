import helperService from '../../general/services/helperService';

let _context;
let _helper;

class studentMentorService {
    constructor (context) {
        _context = context;
        _helper = new helperService();
    }   
    getOrderByPriority() {
        return new Promise((resolve) => {
            return resolve(_context.getOrderByPriority());
        });
    }

    setPriorityStudent(studentId, mentors) {
        return new Promise((resolve) => {
            if (_helper.isErrorTypeNumber(studentId)
                || _helper.isErrorTypeArray(mentors)) return;

            return resolve(_context.setPriorityStudent(studentId, mentors));
        });
    }
    setPriorityMentor(mentorId, students) {
        return new Promise((resolve) => {
            if (_helper.isErrorTypeNumber(mentorId)
                || _helper.isErrorTypeArray(students)) return;

            return resolve(_context.setPriorityMentor(mentorId, students));
        });
    }
}

export default studentMentorService;