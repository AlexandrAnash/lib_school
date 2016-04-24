/// <reference path="../../vendor/jasmine.js"/>
import taskService from '../../../client/school/services/taskService';
import taskRest from '../../../client/school/api/taskRest';
import Task from '../../../client/school/models/Task';

describe('Test task service class', () => {
    var _taskService;
    var taskData;

    var _taskRest;
    var taskId;
    var task;
    beforeEach(() => {
        taskId = 2;
        _taskRest = new taskRest('TaskDal');
        _taskService = new taskService(_taskRest);
        task = new Task({
            id: taskId ,
            title: 'bar',
            description: 'bar',
            result: 'foo',
            rating: 5
        });
        taskData = [{
            id: taskId ,
            title: 'bar',
            description: 'bar',
            result: 'foo',
            rating: 5
        }];
    });
    
    describe('Test call getAllData and return reject', () => {
        it('if return Error', (done) => {
            spyOn(_taskRest, 'getAllData').and.callFake(() => { throw new Error() });
            expect(_taskService.getAllData()).toBeRejected(done);
        });
        
        it('if return data not an array', (done) => {
            spyOn(_taskRest, 'getAllData');
            expect(_taskService.getAllData()).toBeRejected(done);
        });
    });

    describe('Test call getAllData and return resolve', () => {
        it('should be resolve with Transformer to Task', (done) => {
            spyOn(_taskRest, 'getAllData').and.returnValue(taskData);
            var tasks = _taskService.getAllData();
            var result = jasmine.objectContaining([
                new Task(taskData[0])
            ]);
            expect(tasks).toBeResolvedWith(result, done);
        });
    });

    describe('Test call getById and return reject', () => {
        it('input param no number', (done) => {
            expect(_taskService.getById()).toBeRejected(done);
        });
        it('if return Error', (done) => {
            spyOn(_taskRest, 'getById').and.callFake(() => { throw "asd" });
            expect(_taskService.getById(taskId)).toBeRejected(done);
        });
    });

    describe('Test call getById and return resolved', () => {
        it('should be Transformer to Task', (done) => {
            spyOn(_taskRest, 'getById').and.returnValue(taskData[0]);
            var result = jasmine.objectContaining(
                new Task(taskData[0])
            );
            expect(_taskService.getById(taskId)).toBeResolvedWith(result, done);
            expect(_taskRest.getById.calls.count()).toBe(1);
            expect(_taskRest.getById).toHaveBeenCalledWith(taskId);
        });
    });

    describe('Test call create and return reject', () => {
        it('input param no Task', (done) => {
            var task = taskData[0];
            expect(_taskService.create(task)).toBeRejected(done);
        });
        it('if return Error', (done) => {
            var task = taskData[0];
            spyOn(_taskRest, 'create').and.callFake(() => { throw new Error() });
            expect(_taskService.create(task)).toBeRejected(done);
        });
    });

    describe('Test call create and return resolve', () => {
        it('create task', (done) => {
            spyOn(_taskRest, 'create');
            var task = new Task({
                firstName: 'baz',
                middleName: 'baz',
                lastName: 'baz',
                groupId:  2
            });

            expect(_taskService.create(task)).toBeResolved(done);
            expect(_taskRest.create.calls.count()).toBe(1);
            expect(_taskRest.create).toHaveBeenCalledWith(task);
        });
    });

    describe('Test call update and return reject', () => {
        it('input param no number', (done) => {
            expect(_taskService.update()).toBeRejected(done);
        });
        it('if return Error', (done) => {
            spyOn(_taskRest, 'update').and.callFake(() => { throw "asd" });
            expect(_taskService.update(task)).toBeRejected(done);
        });
    });

    describe('Test call update and return resolved', () => {
        it('should be Transformer to Task', (done) => {
            spyOn(_taskRest, 'update');
            expect(_taskService.update(task)).toBeResolved(done);
            expect(_taskRest.update.calls.count()).toBe(1);
            expect(_taskRest.update).toHaveBeenCalledWith(task);
        });
    });

    describe('Test call deleteById and return reject', () => {
        it('input param no number', (done) => {
            expect(_taskService.deleteById()).toBeRejected(done);
        });
        it('if return Error', (done) => {
            spyOn(_taskRest, 'deleteById').and.callFake(() => { throw "asd" });
            expect(_taskService.deleteById(taskId)).toBeRejected(done);
        });
    });

    describe('Test call deleteById and return resolved', () => {
        it('should be Transformer to Task', (done) => {
            spyOn(_taskRest, 'deleteById');
            expect(_taskService.deleteById(taskId)).toBeResolved(done);
            expect(_taskRest.deleteById.calls.count()).toBe(1);
            expect(_taskRest.deleteById).toHaveBeenCalledWith(taskId);
        });
    });
});