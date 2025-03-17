const Koa = require('koa');
const app = new Koa();

// response
app.use(ctx => {
  ctx.body = JSON.stringify({
    code: 0,
    message: 'success',
    data: {
      text: 'Hello World',
    },
  });
});

app.listen(3000);
