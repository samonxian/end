module.exports = {
    path: '/user_log/start_service',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../src/page/user_log/start_service'))
        })
    }
}
