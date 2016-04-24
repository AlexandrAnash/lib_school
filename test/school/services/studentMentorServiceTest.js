/// <reference path="../../vendor/jasmine.js"/>
import studentMentorService from '../../../client/school/services/studentMentorService';
import studentMentorRest from '../../../client/school/api/studentMentorRest';

describe('Test student mentor service class', () => {
    var _studentMentorService;
    var studentMentorData;

    var _studentMentorRest;
    var mentorId;
    var studentId;
    var students;
    var mentors;
    beforeEach(() => {
        mentorId = 2;
        studentId = 3;
        students = [1,2,3];
        mentors = [1,2,3];
        _studentMentorRest = new studentMentorRest('StudentTaskDal');
        _studentMentorService = new studentMentorService(_studentMentorRest);
        studentMentorData = [{}];
    });
    
    describe('Test call getOrderByPriority and return reject', () => {
        it('if return Error', (done) => {
            spyOn(_studentMentorRest, 'getOrderByPriority').and.callFake(() => { throw new Error() });
            expect(_studentMentorService.getOrderByPriority()).toBeRejected(done);
        });
    });

    describe('Test call getOrderByPriority and return resolve', () => {
        it('should be resolve with Transformer to Task', (done) => {
            spyOn(_studentMentorRest, 'getOrderByPriority').and.returnValue(studentMentorData);
            var prioriry = _studentMentorService.getOrderByPriority();
            expect(prioriry).toBeResolvedWith(studentMentorData, done);
        });
    });

    describe('Test call setPriorityStudent and return reject', () => {
        it('input param no number and array', (done) => {
            expect(_studentMentorService.setPriorityStudent()).toBeRejected(done);
        });
        it('if return Error', (done) => {
            spyOn(_studentMentorRest, 'setPriorityStudent').and.callFake(() => { throw "asd" });
            expect(_studentMentorService.setPriorityStudent(studentId, mentors)).toBeRejected(done);
        });
    });

    describe('Test call setPriorityStudent and return resolved', () => {
        it('set priority student', (done) => {
            spyOn(_studentMentorRest, 'setPriorityStudent');
            
            expect(_studentMentorService.setPriorityStudent(studentId, mentors)).toBeResolved(done);
            expect(_studentMentorRest.setPriorityStudent.calls.count()).toBe(1);
            expect(_studentMentorRest.setPriorityStudent).toHaveBeenCalledWith(studentId, mentors);
        });
    });

    describe('Test call setPriorityMentor and return reject', () => {
        it('input param no number and array', (done) => {
            expect(_studentMentorService.setPriorityMentor()).toBeRejected(done);
        });
        it('if return Error', (done) => {
            spyOn(_studentMentorRest, 'setPriorityMentor').and.callFake(() => { throw "asd" });
            expect(_studentMentorService.setPriorityMentor(studentId, mentors)).toBeRejected(done);
        });
    });

    describe('Test call setPriorityMentor and return resolved', () => {
        it('set priority mentor', (done) => {
            spyOn(_studentMentorRest, 'setPriorityMentor');
            
            expect(_studentMentorService.setPriorityMentor(mentorId, students)).toBeResolved(done);
            expect(_studentMentorRest.setPriorityMentor.calls.count()).toBe(1);
            expect(_studentMentorRest.setPriorityMentor).toHaveBeenCalledWith(mentorId, students);
        });
    });
});