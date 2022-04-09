export const minifyNumber = (num: number): number | string => {
  if (num < 1000) return num;
  const newNum = num.toString();
  return newNum.substring(0, newNum.length - 3) + "K";
};

export const minifyAddress = (address: string): string => {
  if (address.length <= 5) return address;
  return (
    address.substring(0, 3) +
    "..." +
    address.substring(address.length - 3, address.length)
  );
};
