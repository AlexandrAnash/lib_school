import helperLocalStorage from '../../general/api/helperLocalStorage';
import StudentMentor from '../models/StudentMentor';
import _ from 'lodash';

let _helperLocalStorage;
const howEnum = {
    student: 'student',
    mentor: 'mentor'
}
const nameStorage = 'StudentMentor';

function getItem(itemId, item, how, maxId) {
    let sId;
    let mId;
    let priority;
    switch (how) {
        case howEnum.student:
            sId = itemId;
            mId = item.id;
            priority = item.priority;
            break;
        case howEnum.mentor:
            sId = item.id;
            mId = itemId;
            priority = item.priority;
            break;
    }
    return {
        id: maxId,
        studentId: sId,
        mentorId: mId,
        priority: priority,
        how: how
    }
    
}

function setPriority(itemId, items, how) {
    var allData = _helperLocalStorage.getAllData();
    var arrayAdd = [];
    var maxId = _.maxBy(allData, 'id').id;
    _.each(items, function(item, key) {
        var find;
        switch (how) {
            case howEnum.student:
                find = _.find(allData, { mentorId: item.id, studentId: itemId, how: how });
                break;
            case howEnum.mentor:
                find = _.find(allData, { mentorId: itemId, studentId: item.id, how: how });
                break;
        }
        
        if (find) {
            find.priority = item.priority;
        } else {
            maxId++;
            arrayAdd.push(getItem(itemId, item, how, maxId));
        }
    });
    var result = JSON.stringify(_.concat(allData, arrayAdd));
    localStorage.setItem(nameStorage, result);
}

const maxPriority = 99999;
function getTableWeight(allData, mentorIds, studentIds) {

    var tableWeight = [];
    _.each(mentorIds, (mentroId) => {
        tableWeight[mentroId] = [];
        _.each(studentIds, (studentId) => {
            var mfind = _.find(allData, { mentorId: mentroId, studentId: studentId, how: howEnum.mentor });
            var mentorPriority = mfind ? mfind.priority : maxPriority;
            var sfind = _.find(allData, { mentorId: mentroId, studentId: studentId, how: howEnum.student });
            var studentPriority = sfind ? sfind.priority : maxPriority;
            tableWeight[mentroId][studentId] = mentorPriority + studentPriority;
        });
    });
    return tableWeight;
}

function getOptimalWeight(tableWeight, mentorIds, studentIds) {
    const mentorIdsLength = mentorIds.length;
    const studentIdsLength = studentIds.length;
    const wholeGroups = Math.floor(studentIdsLength / mentorIdsLength);
    var tableWeightWork = _.cloneDeep(tableWeight);
    var result = 0;
    for (let i = 0; i < wholeGroups ; i++) {
        _.each(mentorIds, (mentorId) => {
            var min = _.min(tableWeightWork[mentorId]);
            result = result + min;
            var findKey = _.findKey(tableWeightWork[mentorId], (item) => {return item === min});
            _.each(mentorIds, (mId) => {
                tableWeightWork[mId].splice(findKey, 1);
            });
        });        
    }
    return result;

}

function getListMentorGroups(tableWeight, mentorIds, studentIds) {
    const mentorIdsLength = mentorIds.length;
    const studentIdsLength = studentIds.length;
    var resultDevision = Math.floor(studentIdsLength / mentorIdsLength);
    var wholeGroups = (studentIdsLength % mentorIdsLength === 0) 
        ? resultDevision 
        : resultDevision + 1;
    var tableWeightWork = _.cloneDeep(tableWeight);
    var result = [];
    for (let i = 0; i < wholeGroups ; i++) {
        _.each(mentorIds, (mentorId) => {
            var findItem = _.find(result, {id: mentorId});
            if (!findItem) {
                findItem = {id: mentorId, studentIds: []};
                result.push(findItem);
            }
            var min = _.min(tableWeightWork[mentorId]);
            var findKey = _.findKey(tableWeightWork[mentorId], (item) => {return item === min});
            findItem.studentIds.push(findKey);
            _.each(mentorIds, (mId) => {
                tableWeightWork[mId][findKey] = undefined;
            });
        });        
    }
    return result;
}
function getVariantIterate(inputArr) {
    var results = [];
    function permute(arr, memo) {
        var cur;
        memo = memo || [];
        for (let i = 0; i < arr.length; i++) {
            cur = arr.splice(i, 1);
            if (arr.length === 0) {
                results.push(memo.concat(cur));
            }
            permute(arr.slice(), memo.concat(cur));
            arr.splice(i, 0, cur[0]);
        }

        return results;
    }

    return permute(inputArr);
}
class studentTaskRest {
    constructor() {
        _helperLocalStorage = new helperLocalStorage(nameStorage);
    }
    getOrderByPriority() {
        var allData = _helperLocalStorage.getAllData();
        var mentorIds = _.map(_.uniqBy(allData, 'mentorId'), 'mentorId');
        var studentIds = _.map(_.uniqBy(allData, 'studentId'), 'studentId');
        const tableWeight = getTableWeight(allData, mentorIds, studentIds);
        var allVariantIterate = getVariantIterate(mentorIds);
        var optimalVariant = {variantId: null, weight: null};
        for (let i = 0; i < allVariantIterate.length; i++) {
            var newResultWeight = getOptimalWeight(tableWeight, allVariantIterate[i], studentIds);
            if (optimalVariant.weight === null) {
                optimalVariant.variantId = i;
                optimalVariant.weight = newResultWeight;
            } else if (newResultWeight < optimalVariant.weight) {
                optimalVariant.variantId = i;
                optimalVariant.weight = newResultWeight;
            }    
        }
        return getListMentorGroups(tableWeight, allVariantIterate[optimalVariant.variantId], studentIds);
    }
    setPriorityStudent(studentId, mentors) {
        setPriority(studentId, mentors, howEnum.student);
    }

    setPriorityMentor(mentorId, students) {
        setPriority(mentorId, students, howEnum.mentor);
    }
}
export default studentTaskRest;