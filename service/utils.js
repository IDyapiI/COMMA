const generator = require("generate-password");

function passwordGenrator() {
  return generator.generate({
    length: 6,
    numbers: true
  });
}

module.exports = {
  passwordGenrator
};
