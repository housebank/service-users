import { faker } from '@faker-js/faker';
import { IServiceDefault } from './types';

const createRandomUser = (role: string):IServiceDefault =>{
  return{
    first_name: faker.name.firstName(faker.name.sexType()),
    last_name: faker.name.lastName(),
    address: faker.address.streetAddress(true),
    phone: faker.phone.number(),
    city: faker.address.city(),
    country: faker.address.country(),
    role: role ,
    active: true,
    verified: false,
    user_media_id: faker.datatype.number(),
    nin: Number(faker.random.numeric(5)),
    postal_code: faker.address.zipCode(),
  };
};

export default createRandomUser;