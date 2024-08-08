const axios = require('axios')
const Member = require('../../models/subscriptionsModels/memberModel')
const Status = require('../../models/subscriptionsModels/statusModel')

 


 fetchMembersAndSave = async () => {

    try{
      const status = await Status.findOne({ name: 'membersFetched' });
    
      if (status && status.value === true) {
        console.log('Members have already been fetched and saved.');
        return;}
        console.log('membersfetcher is working')
        const membersRes = await axios.get('https://jsonplaceholder.typicode.com/users')
        const membersData = membersRes.data
        await Member.deleteMany({});
    membersData.map((member) => {
      const memberTosave = {
        name:member.name,
        email: member.email,
        city: member.address.city,
      }
    
    Member.create(memberTosave) 

    })
      // Update the status in the database
      if (status) {
        status.value = true;
        await status.save();
      } else {
        await Status.create({ name: 'membersFetched', value: true });
      }
    }catch(error){
    console.error(error)
    }


}
module.exports = fetchMembersAndSave;