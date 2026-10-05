import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "@/types";
import { safeStorage } from "@/utils/storage";

const STORAGE_KEY = "pulseboard_auth";

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile;
}

const DEFAULT_USER: UserProfile = {
  id: "user-sde-101",
  name: "Alex Rivera",
  email: "alex.rivera@engineering.dev",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  bio: "Frontend Engineer & UI Systems enthusiast. Exploring Next.js, Redux Toolkit, and reactive feeds.",
  joinedDate: "October 2026",
};

const getInitialAuth = (): AuthState => {
  return safeStorage.get<AuthState>(STORAGE_KEY, {
    isAuthenticated: true,
    user: DEFAULT_USER,
  });
};

export const authSlice = createSlice({
  name: "auth",
  initialState: getInitialAuth(),
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      state.user = { ...state.user, ...action.payload };
      safeStorage.set(STORAGE_KEY, state);
    },
    login: (state, action: PayloadAction<{ name: string; email: string }>) => {
      state.isAuthenticated = true;
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      safeStorage.set(STORAGE_KEY, state);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      safeStorage.set(STORAGE_KEY, state);
    },
  },
});

export const { updateProfile, login, logout } = authSlice.actions;

export default authSlice.reducer;
