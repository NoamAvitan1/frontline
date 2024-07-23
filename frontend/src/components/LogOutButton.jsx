import { getUserTag } from "../utils/getUserTag";
import Api from "../services/ApiRequests";
import { useNavigate } from "react-router-dom";


/**
 * @typedef {Object} User
 * @property {string} _id
 * @property {string} createdAt
 * @property {string} email
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} password
 * @property {string} refresh_token
 * @property {string} updatedAt
 * @property {number} __v
 */

/**
 * @typedef {Object} LogOutButtonProps
 * @property {User[]} UserData
 */


/**
 * 
 * @param {LogOutButtonProps} props 
 * @returns {JSX.Element}
 */

export const LogOutButton = ({ userData }) => {
  console.log(userData);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await Api.post("/user/logout");
    navigate("/auth");
  };

  return (
    <div className="group relative">
      <button className="bg-yellow-600 p-2 rounded-full">
        {getUserTag(userData)}
      </button>
      <div className="tooltip hidden absolute right-0 group-hover:flex w-[300px] h-[150px]">
        <div className=" absolute duration-150 right-[20px] bg-slate-500 h-[130px] w-[250px] top-[10px] rounded-md flex-col p-2 text-white">
          <p>{userData?.first_name + " " + userData?.last_name}</p>
          <p>{userData?.email}</p>
          <button
            className="bg-red-400 absolute bottom-2 translate-x-1/2 right-1/2 p-2 rounded-md hover:scale-110 duration-150"
            onClick={handleLogOut}
          >
            Log-out
          </button>
        </div>
      </div>
    </div>
  );
};
