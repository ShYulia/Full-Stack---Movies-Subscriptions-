const User = require('../../models/cinemaModels/userModel');
const jf = require('jsonfile');
const sessionsPath = './data/userSessions.json';
const permissionsPath = './data/permissions.json';

const sessionTime = async (result) => {
    const today = new Date().toLocaleString().slice(0, 16)
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
    item.id === result._id.toString()

)
 //check the lastLogin
 //if not today 
  if (sessions[index].lastLogin.slice(0,8)!==today.slice(0,8)){
    sessions[index].remainingTime= sessions[index].sessionTime
    await jf.writeFile(sessionsPath, sessions)
    return(sessions[index].sessionTime)}

 else {
 //if the last login was today return the remainingTime
 return(sessions[index].remainingTime)

}
} 

const getLogInUser = async (data) => {
  
    try{
    const result = await User.findOne({ username: data.username, password: data.password })
    if (!result) {
        const error = new Error('User not found');
        error.status = 404;
        throw error;
      }
    
    const remainingTime = await sessionTime(result)
    
    if(Number(remainingTime) > 0){ 
      //find permissions of the user
      let permissions;
      try{
        permissions =  await jf.readFile(permissionsPath);
      }catch(e) 
      {
          if(e.code === 'ENOENT' || e instanceof SyntaxError)
            permissions = []
          else {
              throw e
          }
      }
      const perIndex= permissions.findIndex((item) => 
      item.id === result._id.toString()

    )
   let userData ;
    if (perIndex!== -1) {
       userData = {
        _id: result._id,
        remainingTime:remainingTime,
        permissions:permissions[perIndex].permissions,
        role:result.role
      }
    
    }else{
        userData = {
        _id: result._id,
        remainingTime:remainingTime,
        permissions:[],
        role: result.role
      }
    }
      //updating remaining time and last login 
      const today = new Date().toLocaleString().slice(0, 16)
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
      item.id === result._id.toString()
     )
     if (index === -1) {
        // If user session not found, create a new one
        sessions.push({ id: result._id.toString(), lastLogin: today, remainingTime: userData.remainingTime });
      } else {
        // Update existing session
        sessions[index].lastLogin = today;
      }
     await jf.writeFile(sessionsPath, sessions)
     return userData;
     }else
     {
        const error = new Error('Remaining time is expired or not available');
        error.status = 403; // Forbidden
        throw error;
      }
    }catch(error){
    console.error(error); 
     return null
    }
    }
    module.exports = {getLogInUser}