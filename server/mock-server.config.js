import { users } from './db.js';

const flatMockServerConfig = [
    {
        database: {
            data: {
                users,
            },
            routes: {
                '/api/users': '/users',
            }
        }
    }
];
export default flatMockServerConfig
