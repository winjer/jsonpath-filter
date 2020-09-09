import { iscomment } from './command';

describe('iscomment', () => {
    test('blank lines', () => {
        expect(iscomment('')).toBe(true);
    });
});
