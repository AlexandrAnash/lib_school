/// <reference path="../../vendor/jasmine.js"/>
import studentMentorRest from '../../../client/school/api/studentMentorRest';
import _ from 'lodash';

describe('Test student mentor rest class', () => {
    var _studentMentorRest;
    var dataArray;
    var dataArrayString;
    var howStudent = 'student';
    var howMentor = 'mentor';
    const nameStorage = 'StudentMentor';
    var maxId;
    var testDataHS;
    var testDataHM;
    var testDataHM_MAX;
    beforeEach(() => {
        maxId = 10;
        testDataHS = {
            id: 1,
            studentId: 1,
            mentorId: 1,
            priority: 2,
            how: howStudent
        };
        testDataHM = {
            id: 2,
            studentId: 2,
            mentorId: 2,
            priority: 2,
            how: howMentor
        };
        testDataHM_MAX = {
            id: maxId,
            studentId: 3,
            mentorId: 3,
            priority: 3,
            how: howMentor
        }
        dataArray = [
            testDataHS,
            testDataHM,
            testDataHM_MAX   
        ];
    });
    beforeEach(() => {
        _studentMentorRest = new studentMentorRest();
    });
    describe('Test setPriorityStudent', () => {
        beforeEach(() => {
            spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(dataArray));
            spyOn(localStorage, 'setItem');
        });
        it('should be add new items', () => {
            var arrayMentors = [
                { id: 100, priority: 100 },
                { id: 101, priority: 101 }
            ];
            var studentId = 100;
            _studentMentorRest.setPriorityStudent(studentId, arrayMentors);
            var resultInput = [];
            _.each(arrayMentors, (d, key) => {
                d.mentorId = d.id;
                maxId++;
                resultInput.push({
                    id: maxId,
                    studentId: studentId,
                    mentorId: d.mentorId,
                    priority: d.priority,
                    how: howStudent
                });
            });
            var result = JSON.stringify(_.concat(dataArray, resultInput));
            expect(localStorage.setItem)
                .toHaveBeenCalledWith(nameStorage, result);
        });

        it('should be 1 update and 1 add item', () => {
            var updatePriority = 100;
            var arrayMentors = [
                { id: testDataHS.mentorId, priority: updatePriority},
                { id: 101, priority: 101 }
            ];
            var studentId = testDataHS.studentId;
            _studentMentorRest.setPriorityStudent(studentId, arrayMentors);
            dataArray[0].priority = updatePriority;
            dataArray.push({
                id: maxId + 1,
                studentId: studentId,
                mentorId: arrayMentors[1].id,
                priority: arrayMentors[1].priority,
                how: howStudent
            });
            expect(localStorage.setItem)
                .toHaveBeenCalledWith(nameStorage, JSON.stringify(dataArray));
            expect(localStorage.setItem.calls.count()).toBe(1);
        });
    });

    describe('Test setPriorityMentor', () => {
        beforeEach(() => {
            spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(dataArray));
            spyOn(localStorage, 'setItem');
        });
        it('should be add new items', () => {
            var arrayMentors = [
                { id: 100, priority: 100 },
                { id: 101, priority: 101 }
            ];
            var mentorId = 100;
            _studentMentorRest.setPriorityMentor(mentorId, arrayMentors);
            var resultInput = [];
            _.each(arrayMentors, (d, key) => {
                d.mentorId = d.id;
                maxId++;
                resultInput.push({
                    id: maxId,
                    studentId: d.mentorId,
                    mentorId: mentorId,
                    priority: d.priority,
                    how: howMentor
                });
            });
            var result = JSON.stringify(_.concat(dataArray, resultInput));
            expect(localStorage.setItem)
                .toHaveBeenCalledWith(nameStorage, result);
        });

        it('should be 1 update and 1 add item', () => {
            var updatePriority = 100;
            var arrayStudents = [
                { id: testDataHM.studentId, priority: updatePriority},
                { id: 101, priority: 101 }
            ];
            _studentMentorRest.setPriorityMentor(testDataHM.mentorId, arrayStudents);
            dataArray[1].priority = updatePriority;
            dataArray.push({
                id: maxId + 1,
                studentId: arrayStudents[1].id,
                mentorId: testDataHM.mentorId,
                priority: arrayStudents[1].priority,
                how: howMentor
            });
            expect(localStorage.setItem)
                .toHaveBeenCalledWith(nameStorage, JSON.stringify(dataArray));
            expect(localStorage.setItem.calls.count()).toBe(1);
        });
    });
    describe('Test getOrderByPriority', () => {
        var smRestArray = [
            { studentId: 1, mentorId: 1, priority: 1, how: 'student' },
            { studentId: 1, mentorId: 2, priority: 2, how: 'student' },
            { studentId: 1, mentorId: 4, priority: 3, how: 'student' },
            { studentId: 1, mentorId: 3, priority: 4, how: 'student' },

            { studentId: 12, mentorId: 1, priority: 2, how: 'student' },
            { studentId: 12, mentorId: 2, priority: 1, how: 'student' },
            { studentId: 12, mentorId: 4, priority: 3, how: 'student' },
            { studentId: 12, mentorId: 3, priority: 4, how: 'student' },

            { studentId: 3, mentorId: 1, priority: 4, how: 'student' },
            { studentId: 3, mentorId: 2, priority: 1, how: 'student' },
            { studentId: 3, mentorId: 4, priority: 3, how: 'student' },
            { studentId: 3, mentorId: 3, priority: 2, how: 'student' },

            { studentId: 4, mentorId: 1, priority: 2, how: 'student' },
            { studentId: 4, mentorId: 2, priority: 1, how: 'student' },
            { studentId: 4, mentorId: 4, priority: 3, how: 'student' },
            { studentId: 4, mentorId: 3, priority: 4, how: 'student' },

            { studentId: 5, mentorId: 1, priority: 1, how: 'student' },
            { studentId: 5, mentorId: 2, priority: 3, how: 'student' },
            { studentId: 5, mentorId: 4, priority: 4, how: 'student' },
            { studentId: 5, mentorId: 3, priority: 2, how: 'student' },

            { studentId: 6, mentorId: 1, priority: 4, how: 'student' },
            { studentId: 6, mentorId: 2, priority: 1, how: 'student' },
            { studentId: 6, mentorId: 4, priority: 3, how: 'student' },
            { studentId: 6, mentorId: 3, priority: 2, how: 'student' },

            { studentId: 7, mentorId: 1, priority: 2, how: 'student' },
            { studentId: 7, mentorId: 2, priority: 1, how: 'student' },
            { studentId: 7, mentorId: 4, priority: 4, how: 'student' },
            { studentId: 7, mentorId: 3, priority: 3, how: 'student' },

            { studentId: 8, mentorId: 1, priority: 1, how: 'student' },
            { studentId: 8, mentorId: 2, priority: 2, how: 'student' },
            { studentId: 8, mentorId: 4, priority: 3, how: 'student' },
            { studentId: 8, mentorId: 3, priority: 4, how: 'student' },

            { studentId: 9, mentorId: 1, priority: 3, how: 'student' },
            { studentId: 9, mentorId: 2, priority: 1, how: 'student' },
            { studentId: 9, mentorId: 4, priority: 4, how: 'student' },
            { studentId: 9, mentorId: 3, priority: 2, how: 'student' },

            { studentId: 10, mentorId: 1, priority: 2, how: 'student' },
            { studentId: 10, mentorId: 2, priority: 1, how: 'student' },
            { studentId: 10, mentorId: 4, priority: 3, how: 'student' },
            { studentId: 10, mentorId: 3, priority: 4, how: 'student' },

            { studentId: 14, mentorId: 1, priority: 3, how: 'student' },
            { studentId: 14, mentorId: 2, priority: 2, how: 'student' },
            { studentId: 14, mentorId: 4, priority: 1, how: 'student' },
            { studentId: 14, mentorId: 3, priority: 4, how: 'student' },

            { studentId: 11, mentorId: 1, priority: 2, how: 'student' },
            { studentId: 11, mentorId: 2, priority: 4, how: 'student' },
            { studentId: 11, mentorId: 4, priority: 3, how: 'student' },
            { studentId: 11, mentorId: 3, priority: 1, how: 'student' },

            { studentId: 122, mentorId: 1, priority: 2, how: 'student' },
            { studentId: 122, mentorId: 2, priority: 3, how: 'student' },
            { studentId: 122, mentorId: 4, priority: 1, how: 'student' },
            { studentId: 122, mentorId: 3, priority: 4, how: 'student' },

            { studentId: 13, mentorId: 1, priority: 3, how: 'student' },
            { studentId: 13, mentorId: 2, priority: 1, how: 'student' },
            { studentId: 13, mentorId: 4, priority: 2, how: 'student' },
            { studentId: 13, mentorId: 3, priority: 4, how: 'student' },
            

            { mentorId: 1, studentId: 1, priority: 3, how: 'mentor' },
            { mentorId: 1, studentId: 12, priority: 2, how: 'mentor' },
            { mentorId: 1, studentId: 3, priority: 1, how: 'mentor' },
            { mentorId: 1, studentId: 4, priority: 5, how: 'mentor' },
            { mentorId: 1, studentId: 5, priority: 4, how: 'mentor' },
            { mentorId: 1, studentId: 6, priority: 7, how: 'mentor' },
            { mentorId: 1, studentId: 7, priority: 6, how: 'mentor' },
            
            { mentorId: 3, studentId: 1, priority: 2, how: 'mentor' },
            { mentorId: 3, studentId: 12, priority: 3, how: 'mentor' },
            { mentorId: 3, studentId: 3, priority: 1, how: 'mentor' },
            { mentorId: 3, studentId: 4, priority: 4, how: 'mentor' },
            { mentorId: 3, studentId: 5, priority: 5, how: 'mentor' },
            { mentorId: 3, studentId: 6, priority: 5, how: 'mentor' },
            { mentorId: 3, studentId: 7, priority: 1, how: 'mentor' },

            { mentorId: 2, studentId: 1, priority: 2, how: 'mentor' },
            { mentorId: 2, studentId: 12, priority: 3, how: 'mentor' },
            { mentorId: 2, studentId: 3, priority: 1, how: 'mentor' },
            { mentorId: 2, studentId: 4, priority: 4, how: 'mentor' },
            { mentorId: 2, studentId: 5, priority: 5, how: 'mentor' }, 
            { mentorId: 2, studentId: 6, priority: 2, how: 'mentor' },
            { mentorId: 2, studentId: 7, priority: 5, how: 'mentor' },

            { mentorId: 4, studentId: 1, priority: 2, how: 'mentor' },
            { mentorId: 4, studentId: 12, priority: 3, how: 'mentor' },
            { mentorId: 4, studentId: 3, priority: 1, how: 'mentor' },
            { mentorId: 4, studentId: 4, priority: 4, how: 'mentor' },
            { mentorId: 4, studentId: 6, priority: 8, how: 'mentor' },
            { mentorId: 4, studentId: 7, priority: 9, how: 'mentor' },
            { mentorId: 4, studentId: 5, priority: 5, how: 'mentor' }
        ];
        beforeEach(() => {
            
        });
        it('should be sort by Priority',
            function() {
                spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(smRestArray));
                var table = _studentMentorRest.getOrderByPriority();
                expect(table)
                    .toEqual([
                        { id: 1, studentIds: ['1', '5', '8', '10'] },
                        { id: 3, studentIds: ['3', '7', '11', '13'] },
                        { id: 2, studentIds: ['6', '4', '9', '0'] },
                        { id: 4, studentIds: ['12', '14', '122', '0'] }
                    ]);
            });
    });

})