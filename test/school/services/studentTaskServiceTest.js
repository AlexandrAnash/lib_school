/// <reference path="../../vendor/jasmine.js"/>
import studentTaskService from '../../../client/school/services/studentTaskService';
import studentTaskRest from '../../../client/school/api/studentTaskRest';
import Task from '../../../client/school/models/Task';

describe('Test student task service class', () => {
    var _studentTaskService;
    var taskData;

    var _studentTaskRest;
    var taskId;
    var studentId;
    var groupId;

    beforeEach(() => {
        taskId = 2;
        studentId = 3;
        groupId = 3;
        _studentTaskRest = new studentTaskRest('StudentTaskDal');
        _studentTaskService = new studentTaskService(_studentTaskRest);
        taskData = [{
            id: taskId ,
            title: 'bar',
            description: 'bar',
            result: 'foo',
            rating: 5
        }];
    });
    
    describe('Test call getAllTaskByStudentId and return reject', () => {
        it('if return Error', (done) => {
            spyOn(_studentTaskRest, 'getAllTaskByStudentId').and.callFake(() => { throw new Error() });
            expect(_studentTaskService.getAllTaskByStudentId()).toBeRejected(done);
        });
        
        it('if return data not an array', (done) => {
            spyOn(_studentTaskRest, 'getAllTaskByStudentId');
            expect(_studentTaskService.getAllTaskByStudentId()).toBeRejected(done);
        });
    });

    describe('Test call getAllTaskByStudentId and return resolve', () => {
        it('should be resolve with Transformer to Task', (done) => {
            spyOn(_studentTaskRest, 'getAllTaskByStudentId').and.returnValue(taskData);
            var tasks = _studentTaskService.getAllTaskByStudentId();
            var result = jasmine.objectContaining([
                new Task(taskData[0])
            ]);
            expect(tasks).toBeResolvedWith(result, done);
        });
    });

    describe('Test call setGroupTask and return reject', () => {
        it('input param no number', (done) => {
            expect(_studentTaskService.setGroupTask()).toBeRejected(done);
        });
        it('if return Error', (done) => {
            spyOn(_studentTaskRest, 'setGroupTask').and.callFake(() => { throw "asd" });
            expect(_studentTaskService.setGroupTask(groupId, taskId)).toBeRejected(done);
        });
    });

    describe('Test call setGroupTask and return resolved', () => {
        it('set task group', (done) => {
            spyOn(_studentTaskRest, 'setGroupTask');
            
            expect(_studentTaskService.setGroupTask(groupId, taskId)).toBeResolved(done);
            expect(_studentTaskRest.setGroupTask.calls.count()).toBe(1);
            expect(_studentTaskRest.setGroupTask).toHaveBeenCalledWith(groupId, taskId);
        });
    });

    describe('Test call setStudentTask and return reject', () => {
        it('input param no number', (done) => {
            expect(_studentTaskService.setStudentTask()).toBeRejected(done);
        });
        it('if return Error', (done) => {
            spyOn(_studentTaskRest, 'setStudentTask').and.callFake(() => { throw "asd" });
            expect(_studentTaskService.setStudentTask(studentId, taskId)).toBeRejected(done);
        });
    });

    describe('Test call setStudentTask and return resolved', () => {
        it('set task group', (done) => {
            spyOn(_studentTaskRest, 'setStudentTask');
            
            expect(_studentTaskService.setStudentTask(studentId, taskId)).toBeResolved(done);
            expect(_studentTaskRest.setStudentTask.calls.count()).toBe(1);
            expect(_studentTaskRest.setStudentTask).toHaveBeenCalledWith(studentId, taskId);
        });
    });
});