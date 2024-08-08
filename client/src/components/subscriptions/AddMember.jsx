import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

const AddMember = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const navigate = useNavigate()
  const [member, setMember] = useState({
    name: "",
    email: "",
    city: ""
  });

  useEffect(() => {
    const fetchMember = async () => {
      if (id) {
        try {
          const response = await axiosInstance.get(`http://localhost:8081/members/${id}`);
          setMember({
            name: response.data.name,
            email: response.data.email,
            city: response.data.city
          });
        } catch (error) {
          console.error('Error fetching member:', error);
        }
      }
    };
    fetchMember();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
   
    try {
      const response = await axiosInstance.post('http://localhost:8081/members', member)
      alert('Created!')
      console.log(response)
      navigate('/subscriptions/allMembers')
    }catch(e) {
      console.log(e)
    }
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`http://localhost:8081/members/${id}`, member);
      alert('Updated!');
      navigate('/subscriptions/allMembers')
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

  const handleCancel = (e) => {
    navigate('/subscriptions/allMembers')
  };

  return (
    <form className="mt-8 space-y-6">
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="memname" className="sr-only">Name: </label>
          <input
            id="memname"
            type='text'
            name="name"
            value={member.name}
            onChange={handleChange}
            placeholder="Member Name"
          />
        </div>
        <div>
          <label htmlFor="mememail" className="sr-only">Email:</label>
          <input
            id="mememail"
            type="email"
            name="email"
            value={member.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label htmlFor="city" className="sr-only">City</label>
          <input
            id="city"
            name="city"
            value={member.city}
            onChange={handleChange}
            type="text"
            placeholder="City"
            required
          />
        </div>
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        {id && (
          <button
            type="button"
            onClick={handleUpdate}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Update
          </button>
        )}
        {!id && (
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Save
          </button>
        )}
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddMember;
