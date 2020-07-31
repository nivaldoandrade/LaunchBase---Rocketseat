const faker = require('faker');
const { date } = require('./src/lib/utils');

const Instructor = require('./src/app/models/Instructor');
const Member = require('./src/app/models/Member');

let instructorIds = [],
    totalInstructor = 10,
    totalMembers = 5;


async function createInstructors() {
    let instructors = [];

    while(instructors.length <= totalInstructor) {
        instructors.push({
            name: faker.name.firstName(),
            avatar_url: faker.image.people(),
            birth: date(faker.date.between('1970-01-01', '2020-07-30')).iso,
            gender: faker.random.arrayElement(['M','F']),
            services: faker.random.arrayElement(['Crossfit','Natação','Musculação']),
        })
    }

    const instructorsPromise = instructors.map(instructor => Instructor.create(instructor));

    instructorIds = await Promise.all(instructorsPromise);
};

async function createMembers() {
    let members = [];

    while(members.length <= totalMembers) {
        members.push({
            name: faker.name.firstName(),
            avatar_url: faker.image.people(),
            email: faker.internet.email(),
            gender: faker.random.arrayElement(['M','F']),
            birth: date(faker.date.between('1970-01-01', '2020-07-30')).iso,
            blood: faker.random.arrayElement(['O-','O+','B-','A-','A+','AB-','AB+']),
            weight: faker.random.number(150),
            height: faker.random.number(190),
            instructor_id: instructorIds[Math.floor(Math.random() * totalInstructor)],
        })
    }

    let membersPromise = members.map(member => Member.create(member));

    await Promise.all(membersPromise)

};

async function init() {
    await createInstructors();
    await createMembers();
};

init();