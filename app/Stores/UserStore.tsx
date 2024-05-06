// import { User } from "@prisma/client";
import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

interface UserStoreProps {
  userData: User;
  setUser: (user: User) => void;
  // logout: () => void;
}

const UserStore = create<UserStoreProps>((set) => ({
  userData: {} as User,
  setUser: (user) => set(() => ({ userData: user })),
}));

export default UserStore;
