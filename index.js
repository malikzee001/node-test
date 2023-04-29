const express = require('express');
const cors = require('cors')
const app = express();

const { connectDB } = require('./src/utils/db')

app.use(express.json());
app.use(cors());

const usersRouter = require('./src/routes/users.route');
app.use('/users', usersRouter);

const postsRouter = require('./src/routes/posts.route');
app.use('/posts', postsRouter);

connectDB().then(() => {
    app.listen(2222, () => {
      console.log('Server listening on port 2222');
    });
}).catch((err) => {
    console.error(err);
})
