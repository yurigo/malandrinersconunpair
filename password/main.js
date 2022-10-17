export function passwordLengthChecker(password, minLength = 7) {
    return password.length >= minLength;
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

export function passwordSpecialCharacterChecker(password) {
    return /[\W]/.test(password);
}

export function passwordAdminStrengthChecker(password) {
    if (!password) return false;

    return passwordStrengthChecker(password)
        && passwordLengthChecker(password, 10)
        && passwordSpecialCharacterChecker(password)
}

export function passwordStrengthCheckerFeedback(password) {


    if (!password)
        return ["Va, venga, ponme un password..."]

    const listOfErrors = [];

    if (!passwordLengthChecker(password))
        listOfErrors.push("El password debe tener más de 7 carácteres")

    if (!passwordLetterChecker(password))
        listOfErrors.push("El password debe tener al menos una letra")

    if (!passwordDigitChecker(password))
        listOfErrors.push("El password debe tener al menos un número")


    return listOfErrors
}
