

export const calculateFee = (weight: number): number => {
  if (weight <= 0) {
    throw new Error("Weight must be greater than 0");
  }

  if (weight < 1) {
    return 40; 
  }

  if (weight === 1) {
    return 60; 
  }

  return 60 + Math.ceil(weight - 1) * 20;
};
