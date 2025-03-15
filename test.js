import assert from 'assert'; // استيراد assert من Node.js
import { expect } from 'chai'; // استيراد expect من chai

describe('Basic Tests', function () {
    it('should return true', function () {
        assert.strictEqual(true, true); // استخدام assert بشكل صحيح
    });
});
