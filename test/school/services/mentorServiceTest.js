/// <reference path="../../vendor/jasmine.js"/>
import mentorService from '../../../client/school/services/mentorService';
import mentorRest from '../../../client/school/api/mentorRest';
import Mentor from '../../../client/school/models/Mentor';

describe('Test mentor service class', () => {
    var _mentorService;
    var mentorData;

    var _mentorRest;
    var mentorId;
    var mentor;
    beforeEach(() => {
        mentorId = 2;
        mentor = new Mentor({
            firstName: 'baz',
            middleName: 'baz',
            lastName: 'baz',
            groupId:  2
        });
        _mentorRest = new mentorRest('MentorDal');
        _mentorService = new mentorService(_mentorRest);
        mentorData = [{
            id: mentorId ,
            firstName: 'bar',
            middleName: 'bar',
            lastName : 'bar'
        }];
    });
    
    describe('Test call getAllData and return reject', () => {
        it('if return Error', (done) => {
            spyOn(_mentorRest, 'getAllData').and.callFake(() => { throw new Error() });
            expect(_mentorService.getAllData()).toBeRejected(done);
        });
        
        it('if return data not an array', (done) => {
            spyOn(_mentorRest, 'getAllData');
            expect(_mentorService.getAllData()).toBeRejected(done);
        });
    });

    describe('Test call getAllData and return resolve', () => {
        it('should be resolve with Transformer to Mentor', (done) => {
            spyOn(_mentorRest, 'getAllData').and.returnValue(mentorData);
            var mentors = _mentorService.getAllData();
            var result = jasmine.objectContaining([
                new Mentor(mentorData[0])
            ]);
            expect(mentors).toBeResolvedWith(result, done);
        });
    });

    describe('Test call getById and return reject', () => {
        it('input param no number', (done) => {
            expect(_mentorService.getById()).toBeRejected(done);
        });
        it('if return Error', (done) => {
            spyOn(_mentorRest, 'getById').and.callFake(() => { throw "asd" });
            expect(_mentorService.getById(mentorId)).toBeRejected(done);
        });
    });

    describe('Test call getById and return resolved', () => {
        it('should be Transformer to Mentor', (done) => {
            spyOn(_mentorRest, 'getById').and.returnValue(mentorData[0]);
            var result = jasmine.objectContaining(
                new Mentor(mentorData[0])
            );
            expect(_mentorService.getById(mentorId)).toBeResolvedWith(result, done);
            expect(_mentorRest.getById.calls.count()).toBe(1);
            expect(_mentorRest.getById).toHaveBeenCalledWith(mentorId);
        });
    });

    describe('Test call create and return reject', () => {
        it('input param no Mentor', (done) => {
            var mentor = mentorData[0];
            expect(_mentorService.create(mentor)).toBeRejected(done);
        });
        it('if return Error', (done) => {
            var mentor = mentorData[0];
            spyOn(_mentorRest, 'create').and.callFake(() => { throw new Error() });
            expect(_mentorService.create(mentor)).toBeRejected(done);
        });
    });

    describe('Test call create and return resolve', () => {
        it('create mentor', (done) => {
            spyOn(_mentorRest, 'create');

            expect(_mentorService.create(mentor)).toBeResolved(done);
            expect(_mentorRest.create.calls.count()).toBe(1);
            expect(_mentorRest.create).toHaveBeenCalledWith(mentor);
        });
    });

    describe('Test call update and return reject', () => {
        it('input param no number', (done) => {
            expect(_mentorService.update()).toBeRejected(done);
        });
        it('if return Error', (done) => {
            spyOn(_mentorRest, 'update').and.callFake(() => { throw "asd" });
            expect(_mentorService.update(mentor)).toBeRejected(done);
        });
    });

    describe('Test call update and return resolved', () => {
        it('should be Transformer to Mentor', (done) => {
            spyOn(_mentorRest, 'update');
            expect(_mentorService.update(mentor)).toBeResolved(done);
            expect(_mentorRest.update.calls.count()).toBe(1);
            expect(_mentorRest.update).toHaveBeenCalledWith(mentor);
        });
    });

    describe('Test call deleteById and return reject', () => {
        it('input param no number', (done) => {
            expect(_mentorService.deleteById()).toBeRejected(done);
        });
        it('if return Error', (done) => {
            spyOn(_mentorRest, 'deleteById').and.callFake(() => { throw "asd" });
            expect(_mentorService.deleteById(mentorId)).toBeRejected(done);
        });
    });

    describe('Test call deleteById and return resolved', () => {
        it('should be Transformer to Mentor', (done) => {
            spyOn(_mentorRest, 'deleteById');
            expect(_mentorService.deleteById(mentorId)).toBeResolved(done);
            expect(_mentorRest.deleteById.calls.count()).toBe(1);
            expect(_mentorRest.deleteById).toHaveBeenCalledWith(mentorId);
        });
    });
});