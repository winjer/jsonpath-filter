import { make, inject, jsonfilter } from './filter';

describe('make', () => {
    test('simple', () => {
        expect(make(['$', 'foo'], 'bar')).toEqual({ foo: 'bar' });
    });
    test('deep', () => {
        expect(make(['$', 'foo', 'bar'], 'baz')).toEqual({ foo: { bar: 'baz' } });
    });
    test('array', () => {
        expect(make(['$', 'foo', 2], 'bar')).toEqual({ foo: [undefined, undefined, 'bar'] });
    });
    test('object in array', () => {
        expect(make(['$', 'foo', 2, 'bar'], 'baz')).toEqual({ foo: [undefined, undefined, { bar: 'baz' }] });
    });
});

describe('inject', () => {
    test('simple', () => {
        expect(inject({}, { path: ['$', 'foo'], value: 'bar' })).toEqual({ foo: 'bar' });
    });
    test('deep', () => {
        expect(inject({}, { path: ['$', 'foo', 'bar'], value: 'baz' })).toEqual({ foo: { bar: 'baz' } });
    });
    test('array', () => {
        expect(inject({}, { path: ['$', 'foo', 2], value: 'baz' })).toEqual({ foo: [undefined, undefined, 'baz'] });
    });
    test('deep array', () => {
        expect(inject({}, { path: ['$', 'foo', 2, 'bar'], value: 'baz' })).toEqual({
            foo: [undefined, undefined, { bar: 'baz' }],
        });
    });
    test('with non intersecting source', () => {
        expect(inject({ zop: 'zip' }, { path: ['$', 'foo', 2, 'bar'], value: 'baz' })).toEqual({
            foo: [undefined, undefined, { bar: 'baz' }],
            zop: 'zip',
        });
    });
    test('with intersecting source', () => {
        expect(inject({ foo: [{ bar: 'woop' }] }, { path: ['$', 'foo', 2, 'bar'], value: 'baz' })).toEqual({
            foo: [{ bar: 'woop' }, undefined, { bar: 'baz' }],
        });
    });
});

describe('jsonfilter', () => {
    test('simple', () => {
        expect(jsonfilter({ foo: 'bar' }, '$.foo')).toEqual({ foo: 'bar' });
    });
    test('exclude', () => {
        expect(jsonfilter({ foo: 'bar', baz: 'quux' }, '$.foo')).toEqual({ foo: 'bar' });
    });
    test('array', () => {
        expect(jsonfilter({ foo: [1, 2, 3] }, '$.foo')).toEqual({ foo: [1, 2, 3] });
    });
    test('deep array', () => {
        expect(jsonfilter({ foo: [{ name: 'ann' }, { name: 'fred' }] }, '$.foo[*].name')).toEqual({
            foo: [{ name: 'ann' }, { name: 'fred' }],
        });
    });
    test('two filters', () => {
        expect(jsonfilter({ foo: 'bar', baz: 'quux' }, '$.foo', '$.baz')).toEqual({ foo: 'bar', baz: 'quux' });
    });
});
