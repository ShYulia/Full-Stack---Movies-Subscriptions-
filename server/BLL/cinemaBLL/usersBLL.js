const User = require('../../models/cinemaModels/userModel');
const jf = require('jsonfile');
const sessionsPath = './data/userSessions.json';
const usersPath = './data/users.json';
const permissionsPath = './data/permissions.json';


const createNewPassword = async (data) => {
    const result = await User.findOneAndUpdate(
        { username: data.username },
        { $set: { password: data.password } },
        { new: true }
    );
    return result;
};
const createUser = async (obj) => {
    const newUser = {
        username: obj.username,
        password: "",
        role: obj.role
    };

    try {
        // Create a new user in the MongoDB
        const user = new User(newUser);
        await user.save();
      const userData = {
            id: user._id,
            fname: obj.fname,
            lname: obj.lname,
            username: obj.username,
            sessionTime: obj.sessionTime,
            createdDate: new Date().toLocaleString().slice(0, 8)
        };

      
        // Load existing users data
        let users;
        try{
         users =  await jf.readFile(usersPath);
        }catch(e) 
        {
            if(e.code === 'ENOENT' || e instanceof SyntaxError)
            users = []
            else {
                throw e
            }
        }
        
        users.push(userData);
        // Write the updated users data back to the file
        await jf.writeFile(usersPath, users );

        const userSessions = {
            id: user._id,
            sessionTime: obj.sessionTime,
            createdDate: new Date().toLocaleString().slice(0, 16) ,
            remainingTime:obj.sessionTime,
            lastLogin:""
        }
    // updating sessions file
       
        let sessions;
        try{
            sessions =  await jf.readFile(sessionsPath);
        }catch(e) 
        {
            if(e.code === 'ENOENT' || e instanceof SyntaxError)
            users = []
            else {
                throw e
            }
        }
        
        sessions.push(userSessions);
        // Write the updated sessions data back to the file
        await jf.writeFile(sessionsPath, sessions );
       const permissionsData = {
        id: user._id,
        permissions: obj.permissions,
        role: obj.role
       }
    
        // Load existing permissions data
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
        
        permissions.push(permissionsData);
       
        // Write the updated permissions data back to the file
        await jf.writeFile(permissionsPath, permissions );    
        return 'done';
    } catch (error) {
        console.error('Error creating user or writing to file:', error);
        throw error;
    }
};

const getAll = async () => {
   
    let users;
    try{
     users =  await jf.readFile(usersPath);
    }catch(e) 
    {
        if(e.code === 'ENOENT' || e instanceof SyntaxError)
        users = []
        else {
            throw e
        }
    }
   
    // Load existing permissions data
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
 
 for (const user of users) {
    const permissionsIndex = permissions.findIndex
    ((per) => per.id === user.id)
    // console.log(matchingPermissions,'matchingPermissions')
    if(permissionsIndex!==-1) {
        user.permissions = permissions[permissionsIndex].permissions
    }else {
        user.permissions = []
    }
 }
 return users

}

const deleteUser = async (id) => {
    const user = await User.findByIdAndDelete(id)
    let users;
    try{
     users =  await jf.readFile(usersPath);
     const index = users.findIndex((user) => {
        user.id === id
     })
     users.splice(index,1)
     await jf.writeFile(usersPath, users)
    }catch(e) 
    {
     return "error!"
    }
   
    // Load existing permissions data
    let permissions;
    try{
     permissions =  await jf.readFile(permissionsPath);
     const index = permissions.findIndex((per) => per.id === id)
     permissions.splice(index,1)
     await jf.writeFile(permissionsPath, permissions );   
    }catch(e) 
    {
      return "error"
    }
   
     // Load existing permissions data
     let sessions;
     try{
      permissions =  await jf.readFile(sessionsPath);
      const index = sessions.findIndex((per) => per.id === id)
      sessions.splice(index,1)
      await jf.writeFile(sessionsPath, sessions );   
     }catch(e) 
     {
       return "error"
     }
return "done!"
}

const  getUser = async(id) => {
 
    let users;
    try{
     users =  await jf.readFile(usersPath);
    
    }catch(e) 
    {
        if(e.code === 'ENOENT' || e instanceof SyntaxError)
        users = []
        else {
            throw e
        }
    }
     const userIndex = users.findIndex(( us)=> us.id === id)
     if (userIndex === -1) {
        console.error(`User with id ${id} not found`);
        return undefined;
    }
   
    let user = users[userIndex]
    
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
 
    const index = permissions.findIndex(per => per.id === id)
    user.permissions= permissions[index].permissions
    console.log(user, 'user getUser usersBLL')
    return user
}

const updateUser = async (id,obj) =>{


    // update in Mongo db
   const result = await User.findOneAndUpdate(
    { _id: id },
    { $set: { username: obj.username } },
    { new: true }
);


//update in users.json
let users;
try{
 users =  await jf.readFile(usersPath);

}catch(e) 
{
    if(e.code === 'ENOENT' || e instanceof SyntaxError)
    users = []
    else {
        throw e
    }
}
 const userIndex = users.findIndex(( us)=> us.id === id)
 if (userIndex === -1) {
    console.error(`User with id ${id} not found`);
    return undefined;
}

users[userIndex] = {
   id:id,
   fname:obj.fname,
   lname:obj.lname,
   username:obj.username,
   sessionTime:obj.sessionTime,

}

await jf.writeFile(usersPath, users );
//update in permissions.json

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
const index = permissions.findIndex(per => per.id === id)
permissions[index].permissions = obj.permissions
await jf.writeFile(permissionsPath, permissions );
await jf.writeFile(usersPath, users );
//update in userSessions.json

let sessions;
try{
sessions=  await jf.readFile(sessionsPath);
}catch(e) 
{
    if(e.code === 'ENOENT' || e instanceof SyntaxError)
    sessions = []
    else {
        throw e
    }
}
const sessionIndex = sessions.findIndex(ses => ses.id === id)
sessions[index].sessionTime = obj.sessionTime
await jf.writeFile(sessionsPath, sessions );

}



module.exports = { getUser, createNewPassword, createUser, getAll, deleteUser,  updateUser };
