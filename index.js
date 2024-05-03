import express from 'express';
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.use(express.static('styles'));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];
let postIdCounter = 1;

app.get('/', (req, res) => {
    try {
        res.render('index.ejs', { posts });
    } catch (error) {
        console.log(error);
    }
});

app.get('/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(post => post.id === postId);
    if (!post) {
        res.status(404).send('Post not found');
        return;
    }
    res.render('edit.ejs', { post });
});

app.post('/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, content } = req.body;
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex === -1) {
        res.status(404).send('Post not found');
        return;
    }
    posts[postIndex].title = title;
    posts[postIndex].content = content;
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    posts = posts.filter(post => post.id !== postId);
    res.redirect('/');
});


app.post('/create', (req, res) => {
    const {title, content} = req.body;
    const newPost = { id: postIdCounter++, title, content };
    posts.push(newPost);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});