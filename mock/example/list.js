// https://github.com/Marak/faker.js/wiki
const faker = require('faker');

let list = [];
for (let i = 0; i < 20; i++) {
  list.push({
    name: faker.name.jobArea(),
    image: `https://placeimg.com/46/46?_=${faker.random.number()}`,
  });
}

module.exports = {
  code: 200,
  list: list,
};
