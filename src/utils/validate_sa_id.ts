const idValidationRegularExpressions = {
  idLength: /^\d{13}$/,
  century: /^[0-9]{2}$/,
  month31: /^(0[13578]|1[02])(0[1-9]|[12][0-9]|3[01])$/,
  month30: /^(0[469]|11)(0[1-9]|[12][0-9]|30)$/,
  february: /^(02)(0[1-9]|1[0-9]|2[0-8])$/,
  leapYear: /^(02)29$/,
};

const isLuhnSequenceValid = (idNumber: string): boolean => {
  let sum = 0;
  let shouldDouble = false;

  for (let i = idNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(idNumber.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};

const isBirthDateValid = (idNumber: string): boolean => {
  const year = idNumber.slice(0, 2);
  const monthDay = idNumber.slice(2, 6);

  const isLeapYear = parseInt(year, 10) % 4 === 0;

  return (
    idValidationRegularExpressions.century.test(year) &&
    (idValidationRegularExpressions.month31.test(monthDay) ||
      idValidationRegularExpressions.month30.test(monthDay) ||
      idValidationRegularExpressions.february.test(monthDay) ||
      (isLeapYear && idValidationRegularExpressions.leapYear.test(monthDay)))
  );
};

const isLengthValid = (idNumber: string): boolean => idNumber.length === 13;

const isNumeric = (idNumber: string) => /^\d+$/.test(idNumber);

const isCitizenshipValid = (idNumber: string): boolean =>
  idNumber.charAt(10) === "0" || idNumber.charAt(10) === "1";

const isIdNumberValid = (idNumber: string): boolean => {
  return (
    isLengthValid(idNumber) &&
    isNumeric(idNumber) &&
    isBirthDateValid(idNumber) &&
    isCitizenshipValid(idNumber) &&
    isLuhnSequenceValid(idNumber)
  );
};

export default isIdNumberValid;
