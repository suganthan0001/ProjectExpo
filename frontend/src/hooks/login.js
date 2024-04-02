import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const useLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const loginUser = async (username, password) => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (res.status === 200) {
        setTimeout(() => {
          toast.success("Successfully logged in!!");
          setLoading(false);
          navigate("/home");
        }, 1000);
      } else {
        toast.error("Invalid username or password!!");
        setLoading(false);
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { loading, loginUser };
};
