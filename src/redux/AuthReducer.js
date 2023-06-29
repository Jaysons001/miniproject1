import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {
    id: null,
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    token: localStorage.getItem("token") || null,
  },
};

export const AuthReducer = createSlice({
  name: "AuthReducer",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload);
    },
    logoutSuccess: (state) => {
      // state.user = initialState.user;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      document.location.href = "/";
    },
    setUser: (state, action) => {
      const { id, username, email, phone, imgProfile, isVerified, role } =
        action.payload;
      state.user = {
        id,
        username,
        email,
        phone,
        imgProfile,
        isVerified,
        role,
      };
    },
  },
});

export const checkLogin = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const res = await axios.get(
          "https://minpro-blog.purwadhikabootcamp.com/api/auth/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(setUser(res.data));
        localStorage.setItem("userId", res.data.id);
      } catch (error) {
        console.log(error);
        dispatch(logoutSuccess());
      }
    }
  };
};
export const changeNama = (user, data) => {
  return async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    console.log(user.username);
    try {
      const res = await axios.patch(
        `https://minpro-blog.purwadhikabootcamp.com/api/auth/changeUsername`,
        {
          currentUsername: user.username,
          newUsername: data,
          FE_URL: "http://localhost:3000",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      alert("User Name Terganti, Jangan Lupa Untuk Verifikasi Ulang");
      document.location.href = "/profile";
    } catch (error) {
      alert(error.response);
    }
  };
};

export const changeEmail = (data) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.patch(
        `https://minpro-blog.purwadhikabootcamp.com/api/auth/changeEmail`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      alert("Email telah Terganti, Jangan Lupa Untuk Verifikasi Ulang");
      dispatch(logoutSuccess());
    } catch (error) {
      alert(error.response.data);
    }
  };
};

export const changePassword = (data) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.patch(
        `https://minpro-blog.purwadhikabootcamp.com/api/auth/changePass`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      alert("Password Terganti, Jangan Lupa Untuk Verifikasi Ulang");
      dispatch(logoutSuccess());
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const changeImage = (gambar) => {
  return async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", gambar);
    try {
      const res = await axios.post(
        `https://minpro-blog.purwadhikabootcamp.com/api/profile/single-uploaded`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      alert("Gambar Sudah Di Update");
      document.location.href = "/profile";
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const changePhone = (data) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.patch(
        `https://minpro-blog.purwadhikabootcamp.com/api/auth/changePhone`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      alert("Phone Number Terganti, Jangan Lupa Untuk Verifikasi Ulang");
      document.location.href = "/profile";
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const { loginSuccess, logoutSuccess, setUser } = AuthReducer.actions;

export default AuthReducer.reducer;
