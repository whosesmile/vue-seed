// https://github.com/Marak/faker.js/wiki
const faker = require('faker');

let list = [];
for (let i = 0; i < 5; i++) {
  list.push({
    id: faker.random.number(),
    name: faker.name.jobArea(),
  });
}

module.exports = {
  list,
  code: 200,
};
