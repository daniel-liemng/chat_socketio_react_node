const firstUppercaseText = (string) => {
  return string.slice(0, 1).toUpperCase() + string.substr(1);
};

module.exports = firstUppercaseText;
