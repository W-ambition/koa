import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import koa from 'koa';
import Router from 'koa-router';

createConnection().then(async connection => {

  console.log("Inserting a new user into the database...");
  const user = new User();
  user.firstName = "Timber";
  user.lastName = "Saw";
  user.age = 25;
  await connection.manager.save(user);
  console.log("Saved a new user with id: " + user.id);

  console.log("Loading users from the database...");
  const users = await connection.manager.find(User);
  console.log("Loaded users: ", users);

  console.log("Here you can setup and run express/koa/any other framework.");
  const app:koa = new koa();
  const router:Router = new Router();

  const port: any = process.env.PORT || 7456;

  router.get('/', async (ctx:koa.ParameterizedContext) => {
    ctx.body = 'Hello World!';
  })

  app
    .use(router.routes())
    .use(router.allowedMethods());

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })

}).catch(error => console.log(error));