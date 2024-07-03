export const randomNumber = (min, max) => {
  return Math.ceil(Math.random() * (max - min) + min);
};
