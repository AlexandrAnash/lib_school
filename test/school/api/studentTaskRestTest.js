/// <reference path="../../vendor/jasmine.js"/>
import studentTaskRest from '../../../client/school/api/studentTaskRest';
import StudentTask from '../../../client/school/models/StudentTask'

describe('Test student task rest class', () => {
    var listTask;
    var listStudent;
    var listStudentTask;
    var _studentTaskRest;
    const nameStorageST = 'StudentTaskDB';
    const nameStorageT = 'TaskDB';
    const nameStorageS = 'StudentDB';
    var spyGetItem;

    beforeEach(() => {
        listTask = [
            { id: 1, title: 'foo', description: 'foo' },
            { id: 2, title: 'bar', description: 'bar' },
            { id: 3, title: 'baz', description: 'baz' }
        ];
        listStudent = [
            { id: 1, groupId: 1},
            { id: 2, groupId: 1 },
            { id: 3, groupId: 2 }
        ];
        
        _studentTaskRest = new studentTaskRest();
    });
    beforeEach(() => {
        spyGetItem = spyOn(localStorage, 'getItem').and.callFake((param) => {
            if (param === nameStorageT)
                return JSON.stringify(listTask);
            if (param === nameStorageS)
                return JSON.stringify(listStudent);
            return undefined;
        });
        spyOn(localStorage, 'setItem');
    });

    it('should be set group task', () => {
        _studentTaskRest.setGroupTask(1, 2);
        var result = [
            new StudentTask({ id: 1, studentId: 1, taskId: 2 }),
            new StudentTask({ id: 2, studentId: 2, taskId: 2 })
        ];
        expect(localStorage.setItem.calls.count()).toBe(1);
        expect(localStorage.setItem)
            .toHaveBeenCalledWith(nameStorageST, JSON.stringify(result));
    });
    it('should be set Student Task', () => {
        _studentTaskRest.setStudentTask(1, 2);
        var result = new StudentTask({ id: 1, studentId: 1, taskId: 2 });
        expect(localStorage.setItem.calls.count()).toBe(1);
        expect(localStorage.setItem)
            .toHaveBeenCalledWith(nameStorageST, JSON.stringify([result]));
    });
    
    it('should be call getAllTaskByStudentId empty array', () => {
        var allTaskStudent = _studentTaskRest.getAllTaskByStudentId(1);
        expect(allTaskStudent).toEqual([]);
    });
    describe('ST return array', () => {
        var listST;
        beforeEach(function() {
            listST = [
                { id: 1, studentId: 1, taskId: 1 },
                { id: 2, studentId: 2, taskId: 2 },
                { id: 3, studentId: 1, taskId: 2 }
            ];
        });
        beforeEach(() => {
            spyGetItem.and.callFake((param) => {
                if (param === nameStorageST)
                    return JSON.stringify(listST);
                if (param === nameStorageS)
                    return JSON.stringify(listStudent);
                if (param === nameStorageT)
                    return JSON.stringify(listTask);
                return undefined;
            });
        });
        describe('test call getAllTaskByStudentId', () => {
            it('shuold be filter by student', () => {
                var checkArray1 = [
                    listTask[0],
                    listTask[1]
                ];
                var checkArray2 = [
                    listTask[1]
                ];
                var allTaskStudent1 = _studentTaskRest.getAllTaskByStudentId(1);
                var allTaskStudent2 = _studentTaskRest.getAllTaskByStudentId(2);
                expect(allTaskStudent1.length).toBe(2);
                expect(allTaskStudent2.length).toBe(1);
                expect(allTaskStudent1).toEqual(checkArray1);
                expect(allTaskStudent2).toEqual(checkArray2);
            });
        });
        describe('test call setRatingGroup', () => {
            it('should be setItem call with right param', () => {
                _studentTaskRest.setRatingGroup(1, 1, 5);
                listST[0].rating = 5;
                expect(localStorage.setItem.calls.count()).toBe(1);
                expect(localStorage.setItem)
                    .toHaveBeenCalledWith(nameStorageST, JSON.stringify(listST));
            });
        });
        describe('test call setRatingStudent', () => {
            it('should be setItem call with right param', () => {
                _studentTaskRest.setRatingStudent(1, 1, 4);
                listST[0].rating = 4;
                expect(localStorage.setItem.calls.count()).toBe(1);
                expect(localStorage.setItem)
                    .toHaveBeenCalledWith(nameStorageST, JSON.stringify(listST));
            });
            it('should be setItem not call with bad param', () => {
                _studentTaskRest.setRatingStudent(222, 1, 4);
                listST[0].rating = 4;
                expect(localStorage.setItem.calls.count()).toBe(0);
            });
        });
    });

})