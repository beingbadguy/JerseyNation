import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useState } from "react";

export const UserContext = createContext();

const MainContext = ({ children }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("JerseyNation"))
  );

  const baseUrl = import.meta.env.VITE_APP_API_URL;
  // console.log(`${baseUrl}/api/products/product`);
  const { data, error, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/api/products/product`);
      return response.data;
    },
  });
  // console.log(data);

  const {
    data: wishlist,
    error: wishlistError,
    isLoading: wishlistLoading,
  } = useQuery({
    queryKey: ["wishlists"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/api/wishlists/getwishlist`);
      return response.data;
    },
  });

  // console.log(wishlist);

  const likehandle = useMutation({
    mutationKey: ["likeProduct"],
    mutationFn: async (id) => {
      const response = await axios.post(`${baseUrl}/api/wishlists/add/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlists"]);
      console.log("Product liked successfully");
    },
  });

  const likeHandler = (id) => {
    likehandle.mutate(id);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, data, likeHandler, wishlist }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default MainContext;
