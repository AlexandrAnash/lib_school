/// <reference path="../../vendor/jasmine.js"/>
import helperLocalStorage from '../../../client/general/api/helperLocalStorage';

describe('Test helper local Srorage', () => {
    var _helperLocalStorage;
    var dataStoreArray;
    var dataStoreString;
    const noDataException = 'Нет данных в хранилище c id = ';
    var maxId = 665;
    const nameDal = 'fooDal';
    beforeEach(() => {
        _helperLocalStorage = new helperLocalStorage(nameDal);
        dataStoreArray = [
            {
                id: maxId,
                foo: 1,
                bar: 5
            }
        ];
        dataStoreString = JSON.stringify(dataStoreArray);
    });

    describe('Test call getAllData and return reject', () => {
        it('should be throw if no correct data', () => {
            spyOn(localStorage, 'getItem').and.returnValue('foo');
            expect(()=> {
                _helperLocalStorage.getAllData();
            }).toThrow();
        });
    });

    describe('Test call getAllData and return resolve', () => {
        it('should be null if no data', () => {
            spyOn(localStorage, 'getItem');
            expect(_helperLocalStorage.getAllData()).toEqual([]);
        });

        it('should be parse data', () => {
            spyOn(localStorage, 'getItem').and.returnValue(dataStoreString);
            expect(_helperLocalStorage.getAllData()).toEqual(dataStoreArray);
        });
    });

    describe('Test call getById and return reject', () => {
        it('should be throw if no correct data', () => {
            spyOn(localStorage, 'getItem').and.returnValue('foo');
            expect(()=> {
                _helperLocalStorage.getById();
            }).toThrow();
        });
    });

    describe('Test call getById and return resolve', () => {
        it('should be null if no data', () => {
            spyOn(localStorage, 'getItem');
            expect(_helperLocalStorage.getById()).toBeNull();
        });

        it('should be parse data', () => {
            spyOn(localStorage, 'getItem').and.returnValue(dataStoreString);
            expect(_helperLocalStorage.getById(maxId)).toEqual(dataStoreArray[0]);
        });
    });

    describe('Test call setItem and return reject', () => {
        it('should be throw if no correct data', () => {
            spyOn(_helperLocalStorage, 'getAllData').and.returnValue({foo: 1});
            expect(()=> {
                _helperLocalStorage.setItem();
            }).toThrow();
        });
    });

    describe('Test call setItem and return resolve', () => {
        let inputData;
        var _spyOn;
        beforeEach(() => {
            _spyOn = spyOn(_helperLocalStorage, 'getAllData').and.returnValue(dataStoreArray);
            spyOn(localStorage, 'setItem');
            inputData = {
                foo: 0,
                bar: 1
            };
        });
        it('should be set first item', () => {
            _spyOn.and.returnValue(null);
            _helperLocalStorage.setItem(inputData);
            expect(localStorage.setItem.calls.count()).toBe(1);
            inputData.id = 1;
            expect(localStorage.setItem)
                .toHaveBeenCalledWith(nameDal, JSON.stringify([inputData]));
        });

        it('should be push in array and id + 1', () => {
            _helperLocalStorage.setItem(inputData);
            expect(localStorage.setItem.calls.count()).toBe(1);
            inputData.id = maxId + 1;
            expect(localStorage.setItem)
                .toHaveBeenCalledWith(nameDal, jasmine.stringMatching(JSON.stringify(inputData)));
        });
    });
    
    describe('Test call removeItem and return reject', () => {
        it('should be throw if no correct data', () => {
            spyOn(_helperLocalStorage, 'getAllData').and.returnValue({foo: 1});
            expect(()=> {
                _helperLocalStorage.removeItem();
            }).toThrow();
        });
        it('should be throw if undefined itemId', () => {
            spyOn(_helperLocalStorage, 'getAllData').and.returnValue(dataStoreArray);
            spyOn(localStorage, 'setItem');
            const newId = maxId - 1;
            expect(()=> {
                _helperLocalStorage.removeItem(newId);
            }).toThrow(noDataException + newId);
            expect(localStorage.setItem.calls.count()).toBe(0);
        });
    });
    describe('Test call removeItem and return resolve', () => {
        it('should be remove item', () => {
            spyOn(_helperLocalStorage, 'getAllData').and.returnValue(dataStoreArray);
            spyOn(localStorage, 'setItem');

            _helperLocalStorage.removeItem(maxId);
            expect(localStorage.setItem.calls.count()).toBe(1);
            expect(localStorage.setItem)
                .toHaveBeenCalledWith(nameDal, JSON.stringify([]));
        });
    });

    describe('Test call updateItem and return reject', () => {
        it('should be throw if no correct data', () => {
            spyOn(_helperLocalStorage, 'getAllData').and.returnValue({foo: 1});
            expect(()=> {
                _helperLocalStorage.updateItem();
            }).toThrow();
        });
        it('should be throw if undefined itemId', () => {
            spyOn(_helperLocalStorage, 'getAllData').and.returnValue(dataStoreArray);
            spyOn(localStorage, 'setItem');
            var inputData = {
                id: maxId + 1,
                foo: 0,
                bar: 1
            };
            expect(()=> {
                _helperLocalStorage.updateItem(inputData);
            }).toThrow(noDataException + inputData.id);
            expect(localStorage.setItem.calls.count()).toBe(0);
        });
    });
    describe('Test call updateItem and return resolve', () => {
        it('should be update item', () => {
            spyOn(_helperLocalStorage, 'getAllData').and.returnValue(dataStoreArray);
            spyOn(localStorage, 'setItem');
            var inputData = {
                id: maxId,
                foo: "sss",
                bar: "aaa"
            };

            _helperLocalStorage.updateItem(inputData);
            expect(localStorage.setItem.calls.count()).toBe(1);
            expect(localStorage.setItem)
                .toHaveBeenCalledWith(nameDal, JSON.stringify([inputData]));
        });
    });
})