export const config = {
    api: {
        resume: {
            create: '/api/resume/create',
            update: '/api/resume/update',
            list: '/api/resume/list',
            retreive: '/api/resume/retreive',
            delete: '/api/resume/delete',
            shared: {
                list: '/api/resume/shared/list',
            },
            permissions: {
                add: '/api/resume/permissions/add',
                delete: '/api/resume/permissions/delete'
            }
        },
        preference: {
            retreive: '/api/preference/retreive',
            update: '/api/preference/update'
        },
        users: {
            list: '/api/users/list',
        }
    },
    path: {
        home: '/',
        resume: {
            list: '/resume',
            create: '/resume/create',
            update: '/resume/update',
            preview: '/resume/view'
        },
        preference: {
            edit: '/preference'
        }
    }
}