import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CheckAuthorization = async () => {
  const navigate = useNavigate();
  try {
    const responce = await axios.get(
      "http://localhost:4000/api/v1/users/auth",
      {
        withCredentials: true,
      }
    );

    return responce.data.data;
  } catch (error) {
    navigate("/auth/login");
  }
};
