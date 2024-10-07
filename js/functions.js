const defineStringLength = (string = '', length = 1) => (string.length <= length);

const findPalindrome = (string = '') => {
  string = string.replaceAll(' ', '').toLowerCase();
  let hitCounter = 0;

  for (let i = 0; i < Math.ceil(string.length / 2); i++) {
    if (string[i] === string[string.length - 1 - i]) {
      hitCounter += 1;
    }
  }
  return (hitCounter === Math.ceil(string.length / 2));
};

defineStringLength();
findPalindrome();
