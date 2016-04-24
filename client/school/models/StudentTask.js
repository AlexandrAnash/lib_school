class StudentTask {
    constructor() {
        const arg = arguments[0];
        this.id = arg['id'] || null;
        this.studentId = arg['studentId'] || new Error('studentId is required');
        this.taskId = arg['taskId'] || new Error('taskId is required');
        this.result = '';
        this.rating = 0;
    }
}
export default StudentTask;