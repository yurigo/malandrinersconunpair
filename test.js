import test from 'node:test';
import assert from 'node:assert';


import {
    passwordLengthChecker,
    passwordDigitChecker,
    passwordLetterChecker,
    passwordStrengthChecker,
    passwordAdminStrengthChecker,
    passwordSpecialCharacterChecker,
    passwordStrengthCheckerFeedback
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

test('Iteracion 2', async (t) => {
    await t.test('Admin passwords must be at least 10 characters in length', (t) => {
        assert.strictEqual(passwordLengthChecker("abcde", 10), false);
        assert.strictEqual(passwordLengthChecker("12345657890", 10), true);
        assert.strictEqual(passwordLengthChecker("12345657", 10), false);
        assert.strictEqual(passwordLengthChecker("12345", 10), false);
    });

    await t.test('Admin passwords must contain at least 1 special character', (t) => {
        assert.strictEqual(passwordSpecialCharacterChecker("abcde"), false);
        assert.strictEqual(passwordSpecialCharacterChecker("?"), true);
        assert.strictEqual(passwordSpecialCharacterChecker(""), false);
        assert.strictEqual(passwordSpecialCharacterChecker("."), true);
    });

    await t.test('Integracion', () => {
        assert.strictEqual(passwordAdminStrengthChecker(), false);
        assert.strictEqual(passwordAdminStrengthChecker("abcde"), false);
        assert.strictEqual(passwordAdminStrengthChecker("1234565789"), false);
        assert.strictEqual(passwordAdminStrengthChecker("12345657"), false);
        assert.strictEqual(passwordAdminStrengthChecker("12345"), false);
        assert.strictEqual(passwordAdminStrengthChecker("a"), false);
        assert.strictEqual(passwordAdminStrengthChecker(""), false);
        assert.strictEqual(passwordAdminStrengthChecker("6"), false);
        assert.strictEqual(passwordAdminStrengthChecker("LoremIpsumDolorSitAmet"), false);
        assert.strictEqual(passwordAdminStrengthChecker("LoremIpsumDolorSitAmet54"), false);
        assert.strictEqual(passwordAdminStrengthChecker("109784165071a"), false);
        assert.strictEqual(passwordAdminStrengthChecker("1010aa"), false);
        assert.strictEqual(passwordAdminStrengthChecker("1010aa.er398"), true);
        assert.strictEqual(passwordAdminStrengthChecker("101.e38"), false);
        //adding iteration 1 restrictions
        assert.strictEqual(passwordAdminStrengthChecker("101033.88398"), false);
        assert.strictEqual(passwordAdminStrengthChecker("···············"), false);
    });

})

test('Iteracion 3', async (t) => {
    await t.test("Provide the user with a list of reasons why their password is 'weak'", (t) => {

        // assert.strictEqual(passwordStrengthCheckerFeedback("abcde"), feedback1);

        // console.log(passwordStrengthCheckerFeedback("abcde"))

        assert.strictEqual(passwordStrengthCheckerFeedback("abcde").length, 2);

        // test agnostico al orden (.sort())
        const feedback1 = [
            "El password debe tener más de 7 carácteres",
            "El password debe tener al menos un número"
        ]
        assert.deepEqual(passwordStrengthCheckerFeedback("abcde").sort(), feedback1.sort());

        const feedback2 = [
            "El password debe tener al menos un número",
            "El password debe tener más de 7 carácteres",
        ]
        assert.deepEqual(passwordStrengthCheckerFeedback("abcde").sort(), feedback2.sort());


        const feedbackSinPassword = [
            "Va, venga, ponme un password..."
        ]

        assert.deepEqual(passwordStrengthCheckerFeedback().sort(), feedbackSinPassword.sort());


        const feedback3 = [
            "El password debe tener más de 7 carácteres",
            "El password debe tener al menos una letra",
            "El password debe tener al menos un número"
        ]

        assert.deepEqual(passwordStrengthCheckerFeedback(".").sort(), feedback3.sort());

        const feedback4 = []

        assert.deepEqual(passwordStrengthCheckerFeedback("LoremIpsumDolorSitAmet3").sort(), feedback4.sort());

    });
})