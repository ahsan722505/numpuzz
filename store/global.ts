import { create } from "zustand";
import { getAuthStatusApi, UserAuthData } from "../api/GetAuthStatus";

type State = {
  isLoggedIn: boolean;
  username: string | null;
  userId: string | null;
  photo: string | null;
  notification: { message: string } | null;
  authLoading: boolean;
  setAuthLoading: (arg: boolean) => void;
  setNotification: (arg: { message: string }) => void;
  getAuthStatus: () => void;
};

const useGlobalStore = create<State>((set) => ({
  userId: null,
  username: null,
  isLoggedIn: false,
  authLoading: true,
  photo: null,
  notification: null,
  setAuthLoading: (authLoading) => set({ authLoading }),
  setNotification: (notification) => set({ notification }),
  getAuthStatus: async () => {
    let data: UserAuthData;
    set({ authLoading: true });
    try {
      data = await getAuthStatusApi();
    } catch (error) {
      let guestUserId = localStorage.getItem("guestUserId");
      if (!guestUserId) {
        guestUserId = Math.random().toString(36).slice(8);
        localStorage.setItem("guestUserId", guestUserId);
      }
      let guestName = `Guest_${guestUserId}`;
      data = {
        username: guestName,
        isLoggedIn: false,
        photo: "/photo.jpg",
        userId: guestUserId,
      };
    } finally {
      set({ authLoading: false });
      set({ ...data });
    }
  },
}));

export default useGlobalStore;
