import { useState } from "react";
import { toast } from "react-hot-toast";
export const useLogin = () => {
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

      if(res.status === 200){
        toast.success("Successfully logged in!!");
        return true;
      }else{
        toast.error("Invalid username or password!!");
        return false;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, loginUser };
};