const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const Koa = require('koa');
const app = new Koa();
const path = require('path')
const views = require('koa-views');
const serve = require('koa-static');
const mount = require('koa-mount');
// Must be used before any router is used
app.use(views(__dirname + '/views', {
    map: {
        hbs: 'handlebars'
    }
}));

app.use(mount('/public', serve('./public', {
        maxage: 1000 * 60
    }))
);

// etag works together with conditional-get
app.use(conditional());
app.use(etag());

app.use(function (ctx) {
    ctx.state = {title: 'cache test', author: 'thunkli'}
    return ctx.render('./index.hbs')
});

app.listen(3000);

console.log('listening on port 3000');