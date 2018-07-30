import index from './indexController'
const initController = {
    init(app, router) {
        app.use(router(_ => {
            _.get('/index/index', index.index())
            _.get('/index/update', index.update())
            _.get('/index/thumb', index.thumb())            
            _.get('/index/star', index.star())  
            _.get('/index/adv', index.advertisement())          
        }))
    }
}

export default initController;