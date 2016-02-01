module.exports = {
    path: '/new_index',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../src/page/new_index'))
        })
    }
}
