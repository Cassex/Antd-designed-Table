import {users} from './db.js';

const mockServerConfig = [
    {
        database: {
            data: {
                users,
            },
        },
    }
];

export default mockServerConfig;