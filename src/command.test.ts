import { iscomment, command, dump } from './command';

describe('iscomment', () => {
    test('blank lines', () => {
        expect(iscomment('')).toBe(true);
    });
    test('comments', () => {
        expect(iscomment('# foo')).toBe(true);
    });
    test('not comments', () => {
        expect(iscomment('foo')).toBe(false);
    });
});

describe('command', () => {
    test('expression', () => {
        expect(command({ expression: '$.foo' }, { foo: 'bar' })).toEqual({ foo: 'bar' });
    });
    test('replace', () => {
        expect(command({ expression: '$.foo', replace: 'bar' }, { foo: 'baz' })).toEqual({ foo: 'bar' });
    });
});

describe('dump', () => {
    test('json', () => {
        expect(dump({ foo: 'bar' }, {})).toEqual('{\n  "foo": "bar"\n}');
    });
    test('yaml', () => {
        expect(dump({ foo: 'bar' }, { yaml: true })).toEqual('foo: bar\n');
    });
});
