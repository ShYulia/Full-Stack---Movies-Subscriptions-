const User = require('../../models/cinemaModels/userModel');
const jf = require('jsonfile');
const sessionsPath = './data/userSessions.json';


const updateRemainingTime = async(data) =>{
  //updating remaining time 
const now = new Date().toLocaleString().slice(0, 16)
 let sessions;
 try{
     sessions =  await jf.readFile(sessionsPath);
 }catch(e) 
 {
     if(e.code === 'ENOENT' || e instanceof SyntaxError)
         sessions = []
     else {
         throw e
     }
 }

//find the user in seessionsfile
const index= sessions.findIndex((item) => 
 item.id === data.id.toString()
)
try 
{if( index !== -1) {
    const date1 = new Date( sessions[index].lastLogin)
    const date2 = new Date(now);
    sessions[index].remainingTime =  sessions[index].remainingTime - (Math.floor((Math.abs(date2 - date1))/1000/60))
    sessions[index].lastLogin = date2.toLocaleString().slice(0, 16)
console.log(sessions[index].remainingTime, 'remaining time logoutbll')
    
}
  // Write the updated sessions data back to the file
  await jf.writeFile(sessionsPath, sessions );
return 'done'}
catch(e){
console.log(e)
return 'Error!'
}
}


module.exports = {updateRemainingTime}