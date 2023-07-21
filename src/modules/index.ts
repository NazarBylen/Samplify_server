import authModule from './auth/auth.module';

const API_PREFIX = '/api'

const modules = [
    {
        name: 'auth',
        module: authModule.controller,
        entity: authModule.entity,
        route: `${API_PREFIX}/auth`
    }
];

export default modules;
