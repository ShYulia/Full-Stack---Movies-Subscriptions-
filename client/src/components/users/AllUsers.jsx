import { useEffect, useState} from "react";
import useAxios from "../../hooks/useAxios";
import User from "./User";
const AllUsers = () => {
    const axiosInstance = useAxios();
    const [users, setUsers] = useState([])
  
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('http://localhost:8080/users' );
                setUsers(response.data); 
                
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async(id)=>{
        
        try{
       await axiosInstance.delete(`http://localhost:8080/users/${id}`)
       setUsers(users.filter(user => user.id !== id))
       alert('Deleted!')
         
        }catch(e) {
          console.error(e)
          alert('Error!')
        }
    }
    return (<>
       <ul className="grid grid-cols-1 sm:grid-cols-2 md-grid-cols-3 lg-grid-cols-4 gap-4">
{
    users.map(user => {

        return (
            <li key= {user.id} className="bg-white  rounded-md p-4">
       <User user={user} onDelete={handleDelete}/>
       </li>
        )

    })
}
       
       </ul>
        </>)
}

export default AllUsers
