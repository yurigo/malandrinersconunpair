export function passwordLengthChecker(password) {
    return password.length >= 7;
}

export function passwordLetterChecker(password) {
    return /[a-zA-Z]/.test(password);
}

export function passwordDigitChecker(password) {
    return /[0-9]/.test(password);
}

export function passwordStrengthChecker(password) {
    if (!password) return false;

    return passwordLengthChecker(password) &&
        passwordLetterChecker(password) &&
        passwordDigitChecker(password)
}
