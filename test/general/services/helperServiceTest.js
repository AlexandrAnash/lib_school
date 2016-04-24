/// <reference path="../../vendor/jasmine.js"/>
import helperService from '../../../client/general/services/helperService';

const textExceptionInpDataCustomObject = 'Входные параметры должны быть типа CustomObject';
const textExceptionInpDataNumber = 'Входные параметры должны быть типа Number';
const textExceptionInpDataArray = 'Входные параметры должны быть типа Array';

describe('Test helper service class', () => {
    class CustomObject {}

    var _helper;
    beforeEach(() => {
        _helper = new helperService();
    });
    describe('should be throw if no Type ', () => {
        it('Number', function() {
            expect(() => {
                _helper.isErrorTypeNumber('foo');
            }).toThrow(textExceptionInpDataNumber);
        });
        it('Array', function() {
            expect(() => {
                _helper.isErrorTypeArray('foo');
            }).toThrow(textExceptionInpDataArray);
        });
        it('Array', function() {
            expect(() => {
                _helper.isErrorTypeArray({"aa":1});
            }).toThrow(textExceptionInpDataArray);
        });
        it('CustomObject', function() {
            expect(() => {
                _helper.isErrorTypeCustom('foo', CustomObject);
            }).toThrow(textExceptionInpDataCustomObject);
        });
    });
    describe('should be false if Type good', () => {
        it('Number', function() {
            expect(_helper.isErrorTypeNumber(1)).toEqual(false);
        });
        it('Array', function() {
            expect(_helper.isErrorTypeArray([1])).toEqual(false);
        });
        it('CustomObject', function() {
            expect(_helper.isErrorTypeCustom(new CustomObject(), CustomObject)).toEqual(false);
        });
    });

});
