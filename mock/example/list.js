// https://github.com/Marak/faker.js/wiki
const faker = require('faker');

let list = [];
for (let i = 0; i < 20; i++) {
  list.push({
    id: faker.random.number(),
    name: faker.name.jobArea(),
    image: `https://placeimg.com/46/46?_=${faker.random.number()}`,
    price: faker.random.number({ min: 1000, max: 2000 }),
  });
}

module.exports = {
  code: 200,
  list: list,
};
