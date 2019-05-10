const idGenerator = () => {
  const char = '1234567890';
  const serialLength = 8;
  let serial = '';
  let randomNumber;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < serialLength; i++) {
    randomNumber = Math.floor(Math.random() * char.length);
    serial += char.substring(randomNumber, randomNumber + 1);
  }
  const unique = serial;
  return unique;
};

export default idGenerator;
