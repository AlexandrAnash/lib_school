const inputDataException = 'Входные параметры должны быть типа ';

function checkErrorType(data, type) {
    if (typeof data !== type) {
        throw (inputDataException + type.charAt(0).toUpperCase() + type.slice(1));
    }
    return false;
}
class helperService {
    
    isErrorTypeNumber(data) {
        return checkErrorType(data, 'number');
    }
    isErrorTypeArray(data) {
        if (!(data instanceof Array)) {
            throw (inputDataException + 'Array');
        }
        return false;
    }
    isErrorTypeCustom(data, customType) {
        if (!(data instanceof customType)) {
            throw (inputDataException + customType.name);
        }
        return false;
    }
}
export default helperService 