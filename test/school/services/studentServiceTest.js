/// <reference path="../../vendor/jasmine.js"/>
import studentService from '../../../client/school/services/studentService';
import studentRest from '../../../client/school/api/studentRest';
import Student from '../../../client/school/models/Student';

describe('Test student service class', () => {
    var _studentService;
    var studentData;

    var _studentRest;
    var studentId;
    var groupId;
    var student;
    beforeEach(() => {
        studentId = 2;
        groupId = 1;
        student =  new Student({
            id: studentId ,
            firstName: 'bar',
            middleName: 'bar',
            lastName: 'bar',
            groupId:  groupId 
        })
        _studentRest = new studentRest('StudentDal');
        _studentService = new studentService(_studentRest);
        studentData = [{
            id: studentId ,
            firstName: 'bar',
            middleName: 'bar',
            lastName: 'bar',
            groupId:  groupId 
        }];
    });
    
    describe('Test call getAllData and return reject', () => {
        it('if return Error', (done) => {
            spyOn(_studentRest, 'getAllData').and.callFake(() => { throw new Error() });
            expect(_studentService.getAllData()).toBeRejected(done);
        });
        
        it('if return data not an array', (done) => {
            spyOn(_studentRest, 'getAllData');
            expect(_studentService.getAllData()).toBeRejected(done);
        });
    });

    describe('Test call getAllData and return resolve', () => {
        it('should be resolve with Transformer to Student', (done) => {
            spyOn(_studentRest, 'getAllData').and.returnValue(studentData);
            var students = _studentService.getAllData();
            var result = jasmine.objectContaining([
                new Student(studentData[0])
            ]);
            expect(students).toBeResolvedWith(result, done);
        });
    });

    describe('Test call getById and return reject', () => {
        it('input param no number', (done) => {
            expect(_studentService.getById()).toBeRejected(done);
        });
        it('if return Error', (done) => {
            spyOn(_studentRest, 'getById').and.callFake(() => { throw "asd" });
            expect(_studentService.getById(studentId)).toBeRejected(done);
        });
    });

    describe('Test call getById and return resolved', () => {
        it('should be Transformer to Student', (done) => {
            spyOn(_studentRest, 'getById').and.returnValue(studentData[0]);
            var result = jasmine.objectContaining(
                new Student(studentData[0])
            );
            expect(_studentService.getById(studentId)).toBeResolvedWith(result, done);
            expect(_studentRest.getById.calls.count()).toBe(1);
            expect(_studentRest.getById).toHaveBeenCalledWith(studentId);
        });
    });

    describe('Test call getByGroupId and return reject', () => {
        it('input param no number', (done) => {
            expect(_studentService.getByGroupId()).toBeRejected(done);
        });
        it('if return Error', (done) => {
            spyOn(_studentRest, 'getByGroupId').and.callFake(() => { throw "asd" });
            expect(_studentService.getByGroupId(groupId)).toBeRejected(done);
        });
    });

    describe('Test call getByGroupId and return resolved', () => {
        it('should be Transformer to Student', (done) => {
            spyOn(_studentRest, 'getByGroupId').and.returnValue(studentData);
            var result = jasmine.objectContaining([
                new Student(studentData[0])
            ]);
            expect(_studentService.getByGroupId(groupId)).toBeResolvedWith(result, done);
            expect(_studentRest.getByGroupId.calls.count()).toBe(1);
            expect(_studentRest.getByGroupId).toHaveBeenCalledWith(groupId);
        });
    });

    describe('Test call update and return reject', () => {
        it('input param no number', (done) => {
            expect(_studentService.update()).toBeRejected(done);
        });
        it('if return Error', (done) => {
            spyOn(_studentRest, 'update').and.callFake(() => { throw "asd" });
            expect(_studentService.update(student)).toBeRejected(done);
        });
    });

    describe('Test call update and return resolved', () => {
        it('should be Transformer to Student', (done) => {
            spyOn(_studentRest, 'update');
            expect(_studentService.update(student)).toBeResolved(done);
            expect(_studentRest.update.calls.count()).toBe(1);
            expect(_studentRest.update).toHaveBeenCalledWith(student);
        });
    });

    describe('Test call deleteById and return reject', () => {
        it('input param no number', (done) => {
            expect(_studentService.deleteById()).toBeRejected(done);
        });
        it('if return Error', (done) => {
            spyOn(_studentRest, 'deleteById').and.callFake(() => { throw "asd" });
            expect(_studentService.deleteById(studentId)).toBeRejected(done);
        });
    });

    describe('Test call deleteById and return resolved', () => {
        it('should be Transformer to Student', (done) => {
            spyOn(_studentRest, 'deleteById');
            expect(_studentService.deleteById(studentId)).toBeResolved(done);
            expect(_studentRest.deleteById.calls.count()).toBe(1);
            expect(_studentRest.deleteById).toHaveBeenCalledWith(studentId);
        });
    });

    describe('Test call createStudent and return reject', () => {
        it('input param no Student', (done) => {
            var student = studentData[0];
            expect(_studentService.createStudent(student)).toBeRejected(done);
        });
        it('if return Error', (done) => {
            var student = studentData[0];
            spyOn(_studentRest, 'create').and.callFake(() => { throw new Error() });
            expect(_studentService.createStudent(student)).toBeRejected(done);
        });
    });

    describe('Test call createStudent and return resolve', () => {
        it('create student', (done) => {
            spyOn(_studentRest, 'create');
            var student = new Student({
                firstName: 'baz',
                middleName: 'baz',
                lastName: 'baz',
                groupId:  2
            });

            expect(_studentService.createStudent(student)).toBeResolved(done);
            expect(_studentRest.create.calls.count()).toBe(1);
            expect(_studentRest.create).toHaveBeenCalledWith(student);
        });
    });
    
    describe('Test call updateGroup and return exceprion', () => {
        it('type Number', (done) => {
            expect(_studentService.updateGroup('1', '2')).toBeRejected(done);
            expect(_studentService.updateGroup(1, '2')).toBeRejected(done);
            expect(_studentService.updateGroup('1', 2)).toBeRejected(done);
        });
    });

    describe('Test call updateGroup and return resolve', () => {
        it('should be update group', () => {
            spyOn(_studentRest, 'updateGroup');
            _studentService.updateGroup(1, 1);
            
            expect(_studentRest.updateGroup.calls.count()).toBe(1);
            expect(_studentRest.updateGroup)
                .toHaveBeenCalledWith(1,1);
        });
    });
});