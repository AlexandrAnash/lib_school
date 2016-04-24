/// <reference path="../../vendor/jasmine.js"/>
import studentRest from '../../../client/school/api/studentRest';
import Student from '../../../client/school/models/Student';

describe('Test student rest service class', () => {
    var studentData;
    var _studentRestService;
    var studentId;
    var groupId;
    const nameStudentDal = 'StudentDal';
    
    beforeEach(() => {
        studentId = 2;
        groupId = 1;
        studentData = [{
            id: studentId ,
            firstName: 'bar',
            middleName: 'bar',
            lastName: 'bar',
            groupId:  groupId 
        }];
    });
    xdescribe('Test call createStudent and return resolve', () => {
        it('add object to localStorage with max id + 1', (done) => {
            studentData[0].id = 666;
            spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(studentData));
            spyOn(localStorage, 'setItem');
            var student = new Student({
                firstName: 'baz',
                middleName: 'baz',
                lastName: 'baz',
                groupId: 2
            });

            expect(_studentRestService.createStudent(student))
                .toBeResolved(done);

            expect(localStorage.setItem.calls.count()).toBe(1);
            student.id = 667;
            studentData.push(student);
            var resultStudent = JSON.stringify(studentData);
            expect(localStorage.setItem).toHaveBeenCalledWith(nameStudentDal, resultStudent);
        });
    });
    xdescribe('Test call updateGroup and return exceprion', () => {
        
        it('localStorege asd data bad', (done) => {
            var SpyOn = spyOn(localStorage, 'getItem').and.returnValue('foo');
            expect(_studentRestService.updateGroup(1, 2))
                .toBeRejected(done);

            SpyOn.and.returnValue('{"aa":1}');
            expect(_studentRestService.updateGroup(1, 2))
                .toBeRejectedWith(textExceptionInpDataArray, done);
        });
        it('check student by id', (done) => {
            var setStudentId = 555;
            spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(studentData));

            expect(_studentRestService.updateGroup(setStudentId, 2))
                .toBeRejectedWith(studentNotFound, done);
        });
    });
    xdescribe('Test call updateGroup and return resolve', () => {
        it('should be update group', () => {
            var setGroupId = 2;
            spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(studentData));
            spyOn(localStorage, 'setItem');
            _studentRestService.updateGroup(studentId, setGroupId);
            studentData[0].groupId = setGroupId;

            expect(localStorage.setItem.calls.count()).toBe(1);
            expect(localStorage.setItem)
                .toHaveBeenCalledWith(nameStudentDal, JSON.stringify(studentData));

        });
    });
});