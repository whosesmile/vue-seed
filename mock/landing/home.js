// https://github.com/Marak/faker.js/wiki
const faker = require('faker');

let list = [];
for (let i = 0; i < 2; i++) {
  list.push({
    id: faker.random.number(),
    name: faker.name.jobArea(),
    price: faker.random.number({ min: 1000, max: 2000 }),
  });
}

module.exports = {
  code: 200,
  list: list,
};
