export const formatNumber = number => {
  let stringNumber = number.toString();

  if (number < 10) {
    return "00" + stringNumber;
  } else if (number < 100) {
    return "0" + stringNumber;
  } else if (number > 99) {
    return stringNumber;
  }
};
