import indexModel from '../models/indexModel';
const indexController = {
    index() {
        return async (ctx, next) => {
            ctx.body = await ctx.render('index.html', {
                title: '大拇指点赞'
            })
        }
    },
    update() {
        return async(ctx, next) => {
            const indexM = new indexModel();
            ctx.body = await indexM.updateNum();
        }
    },
    thumb() {
        return async(ctx, next) => {
            if (ctx.request.header['x-pjax']) {
                ctx.body = '<x-praise></x-praise>';
            } else {
                ctx.body = await ctx.render('index.html', {
                    title: '大拇指'
                })  
            }
        }
    },
    star() {
        return async(ctx, next) => {
            if (ctx.request.header['x-pjax']) {
                ctx.body = '<x-star></x-star>';
            } else {
                ctx.body = await ctx.render('star.html', {
                    title: '星星'
                })  
            }
        }
    }
}

export default indexController;