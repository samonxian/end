module.exports = {
    path: '/{filename}',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('page/{filename}'))
        })
    }
}
