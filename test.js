import test from 'node:test';
import assert from 'node:assert';


import {
    passwordLengthChecker,
    passwordDigitChecker,
    passwordLetterChecker,
    passwordStrengthChecker
} from "./main.js";

test('mi primer test', (t) => {
    assert.strictEqual(1, 1);
});


test('Iteracion 1', async (t) => {
    await t.test('The length of the password must be at least 7 characters in length', (t) => {
        assert.strictEqual(passwordLengthChecker("abcde"), false);
        assert.strictEqual(passwordLengthChecker("1234565789"), true);
        assert.strictEqual(passwordLengthChecker("12345657"), true);
        assert.strictEqual(passwordLengthChecker("12345"), false);
    });

    await t.test('The password must contain at least 1 letter', (t) => {
        assert.strictEqual(passwordLetterChecker("abcde"), true);
        assert.strictEqual(passwordLetterChecker("a"), true);
        assert.strictEqual(passwordLetterChecker(""), false);
        assert.strictEqual(passwordLetterChecker("12345"), false);
    });

    await t.test('The password must contain at least 1 digit', (t) => {
        assert.strictEqual(passwordDigitChecker("abcde"), false);
        assert.strictEqual(passwordDigitChecker("a"), false);
        assert.strictEqual(passwordDigitChecker(""), false);
        assert.strictEqual(passwordDigitChecker("12345"), true);
        assert.strictEqual(passwordDigitChecker("6"), true);
    });

    await t.test('Integracion', () => {
        assert.strictEqual(passwordStrengthChecker(), false);
        assert.strictEqual(passwordStrengthChecker("abcde"), false);
        assert.strictEqual(passwordStrengthChecker("1234565789"), false);
        assert.strictEqual(passwordStrengthChecker("12345657"), false);
        assert.strictEqual(passwordStrengthChecker("12345"), false);
        assert.strictEqual(passwordStrengthChecker("a"), false);
        assert.strictEqual(passwordStrengthChecker(""), false);
        assert.strictEqual(passwordStrengthChecker("6"), false);
        assert.strictEqual(passwordStrengthChecker("LoremIpsumDolorSitAmet"), false);
        assert.strictEqual(passwordStrengthChecker("LoremIpsumDolorSitAmet54"), true);
        assert.strictEqual(passwordStrengthChecker("109784165071a"), true);
        assert.strictEqual(passwordStrengthChecker("1010aa"), false);
        assert.strictEqual(passwordStrengthChecker("1010aa.er398"), true);
    });

})

