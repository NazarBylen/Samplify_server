import {DataSource} from "typeorm";

import modules from '../modules';

const entities = modules.map(module => module.entity)

export const dbInstance = new DataSource({
  type: "mysql",
  host: "localhost",
  port:  3306,
  username: "root",
  password: "root",
  database: "samplify",
  entities,
  synchronize: true,
  logging: false
});
