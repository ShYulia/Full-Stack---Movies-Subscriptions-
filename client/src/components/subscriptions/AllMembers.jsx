import { useState, useEffect } from "react"
import Member from './Member'
import useAxios from "../../hooks/useAxios";

const AllMembers = () =>{
    const axiosInstance = useAxios();
    const [members, setMembers] = useState([])
    useEffect(() => {
        const fetchMembers= async () => {
            try {
    
                const response = await axiosInstance.get('http://localhost:8081/members' );
                setMembers(response.data);
               
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchMembers();
    }, []);
const handleDelete = async(id)=>{
    try {
        
        await axiosInstance.delete(`http://localhost:8081/members/${id}`);
        setMembers(members.filter(member => member._id !==id))
        alert('Deleted!');
      } catch (error) {
        alert('Error deleting movie');
        console.error('Error deleting movie:', error);
      }  
}
    return (
       <ul>
      
       { 
        members.map((mem) => {
            return (
                <li key={mem._id}>
                <Member member={mem} onDelete={handleDelete} />
                </li>
            )
        })
       }
       </ul>
    )
    
    }
    export default AllMembers