const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const hpp = require('hpp');
const helmet = require('helmet');

const contactRouter = require('./routes/contact');
const contactsRouter = require('./routes/contacts');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const hashtagRouter = require('./routes/hashtag');
const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();
const app = express();
db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);
passportConfig();

if (process.env.NODE_ENV?.trim() === 'production') {
  app.enable('trust proxy');
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors({
    origin: ['shareknot.com', 'http://3.96.213.206'],
    credentials: true,
  }));
} else {
  app.use(morgan('dev'));
  //CORS 문제 해결
  app.use(cors({
    origin: 'http://localhost:3060',
    credentials: true,
  }));
}


//images 경로 업로드 파일 경로를 열어주는 것. 
//Front에서 Back 경로를 가릴수 있음
// / localhost:3065가 됨
app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('hello express');
});
// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
app.use('/contact', contactRouter);
app.use('/contacts', contactsRouter);
app.use('/posts', postsRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/hashtag', hashtagRouter);


if (process.env.NODE_ENV === 'production') {
  app.listen(80, () => {
    console.log('운영 서버 실행 중!');
  });
} else {
  app.listen(3065, () => {
    console.log('서버 실행 중!');
  });
}