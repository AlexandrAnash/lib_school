class StudentMentor {
    constructor() {
        const arg = arguments[0];
        this.id = arg['id'] || null;
        this.studentId = arg['studentId'] || new Error('studentId is required');
        this.mentorId = arg['mentorId'] || new Error('mentorId is required');
        this.priority = arg['priority'] || 999999;
        this.how = arg['how'] || new Error('studentId is required');;
    }
}
export default StudentMentor;