export const minifyNumber = (num: number): number | string => {
  if (num < 1000) return num;
  const newNum = num.toString();
  return newNum.substring(0, newNum.length - 3) + "K";
};
