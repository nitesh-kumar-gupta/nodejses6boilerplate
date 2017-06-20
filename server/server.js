import app from './app/app'
const port = process.env.PORT;
app.listen(port, () => {
    console.log('Node api running on port ' + port);
});