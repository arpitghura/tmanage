import App from './app';
import { PORT } from './config';
import { SecurityController } from './controllers/security/security.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { TasksController } from './controllers/tasks/tasks.controller';
import { UserController } from './controllers/user/user.controller';
import { OrganisationController } from './controllers/org/organization.controller';
import { TeamController } from './controllers/team/team.controller';

export const app = new App(
  [
    //new SecurityController(),
    new AuthController(),
    new TasksController(),
    new UserController(),
    new OrganisationController(),
    new TeamController(),
  ],
  PORT
);

const server = app.listen();
// Handling server shutdown properly
// process.on('SIGINT', () => {
//   server.close(() => {
//     console.log('Server closed');
//     process.exit(0);
//   });
// });