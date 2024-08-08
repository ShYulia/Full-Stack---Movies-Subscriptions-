const express = require('express');
const cors = require('cors');
const connection1 = require('./configs/cinemaDb');
const connection2 = require('./configs/subscriptionsDb');
const loginRouter = require("./routers/cinemaRouters/loginRouter");
const usersRouter = require('./routers/cinemaRouters/usersRouter')
const userscreateRouter = require('./routers/cinemaRouters/users-createRouter')
const membersRouter = require("./routers/subscriptionsRouter/membersRouter")
const subscriptionsRouter = require('./routers/subscriptionsRouter/subscriptionsRouter')
const moviesRouter = require('./routers/subscriptionsRouter/moviesRouter')
const fetchMoviesAndSave = require('./DAL/subscriptionsDAL/MovDataFetcher')
const fetchMembersAndSave = require('./DAL/subscriptionsDAL/MemDataFetcher');
const logoutRouter = require('./routers/cinemaRouters/logoutRouter');
const heartbeatRouter = require('./routers/cinemaRouters/heartbeatRouter')
const Member = require('./models/subscriptionsModels/memberModel')
const Movie = require('./models/subscriptionsModels/movieModel')
const Status = require('./models/subscriptionsModels/statusModel')
const Subscription = require('./models/subscriptionsModels/subscriptionsModel')


  
  connection2.on('connected', () => {
    console.log('Connection 2 is now established.');
    fetchMembersAndSave();
    fetchMoviesAndSave(); 
    
  });
  connection1.on('connected', () => {
  console.log('Connection 1 is now established.');
    
  });
 
const appCinema = express();
const appSubscriptions = express();


const cinemaPort = 8080;
const subscriptionsPort = 8081;

appCinema.use(cors());
appCinema.use(express.json());

appCinema.use('/login', loginRouter)
appCinema.use('/logout', logoutRouter)
appCinema.use('/create', userscreateRouter)
appCinema.use('/users', usersRouter)
appCinema.use('/heartbeat', heartbeatRouter)

const serverCinema = appCinema.listen(cinemaPort, () => {
    console.log(`Cinema service is running on http://localhost:${cinemaPort}`);
});

appSubscriptions.use(cors());
appSubscriptions.use(express.json());

appSubscriptions.use('/movies', moviesRouter)
appSubscriptions.use('/members', membersRouter )
appSubscriptions.use('/subscriptions', subscriptionsRouter )
const serverSubscriptions = appSubscriptions.listen(subscriptionsPort, () => {
    console.log(`Subscriptions service is running on http://localhost:${subscriptionsPort}`);
});
const handleShutdown = async () =>{
  console.log('Server is shuting down ...')
  try{
    await Movie.deleteMany({});
    await Member.deleteMany({}); 
    await Subscription.deleteMany({});
    await Status.deleteMany({});
    await connection1.close();
    await connection2.close();
    console.log('MongoDB connections closed.');
    serverSubscriptions.close(() => {
      console.log('Subscriptios server closed')
    })
    serverCinema.close(() => {
      console.log('Cinema server closed')
    })
    process.exit(0);
  }catch(e) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
}
process.on('SIGINT', handleShutdown);
process.on('SIGTERM', handleShutdown);