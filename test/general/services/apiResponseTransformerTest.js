/// <reference path="../../vendor/jasmine.js"/>
import apiResponseTransformer from '../../../client/general/services/apiResponseTransformer';

describe('test api response transform class', () => {
    class TestClass {
        constructor () {
            const arg = arguments[0];
            this.id = arg['id'] || null;
            this.name = arg['name'] || '';
        }
    }
    var serverObject;

    beforeEach(() => {
        serverObject = [
            {
                id: 1,
                name: 'foo',
                bar: 'baz'
            },
            {
                id: 2,
                name: 'bar',
                bar: 'baz'
            }
        ];
    });

    it('should be transfrotm array server object to client', () => {
        var transform = apiResponseTransformer(TestClass, serverObject);
        var result = [
            new TestClass({ id: 1, name: 'foo' }),
            new TestClass({ id: 2, name: 'bar' })
        ];
        expect(transform.length).toBe(2);
        expect(transform[0] instanceof TestClass).toBe(true);
        expect(transform[1] instanceof TestClass).toBe(true);

        expect(transform).toEqual(result);
    });
    it('should be transfrotm object server object to client', () => {
        var transform = apiResponseTransformer(TestClass, serverObject[0]);
        var result = new TestClass({ id: 1, name: 'foo' });

        expect(transform instanceof TestClass).toBe(true);
        expect(transform).toEqual(result);
    });
})