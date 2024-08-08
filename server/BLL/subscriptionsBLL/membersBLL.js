const Member = require('../../models/subscriptionsModels/memberModel')
const Subscription = require('../../models/subscriptionsModels/subscriptionsModel')


const getMembers = async () => {
    const members = await Member.find({})
    return members
    }
    const getMember = async (id) => {
        const member = await Member.findById(id)
        return member
     }

     const updateMember = async (id, obj) => {
        const member = await Member.findByIdAndUpdate(id,obj)
        return 'Updated!'
     }

     const createMember = async(obj) => {
     const member = new Member(obj)
     await member.save()
     return "Created!"

     }
     const deleteMember = async (id) => {
      try {
        // Delete the member by ID
        const member = await Member.findByIdAndDelete(id);
        if (!member) {
          return 'Member not found!';
        }
    
        // Delete the subscription associated with the member
        const sub = await Subscription.findOneAndDelete({ memberId: id });
        if (!sub) {
          console.log('No subscription found for member:', id);
        } else {
          console.log('Deleted subscription:', sub);
        }
    
        return 'Deleted!';
      } catch (e) {
        console.error('Error deleting member:', e);
        return 'Error!';
      }
    };
  module.exports =   {getMembers, getMember, updateMember, createMember, deleteMember}