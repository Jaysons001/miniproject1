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
export const changeNama = (user, data, toast) => {
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

      toast({
        title: "User Name Terganti Jangan Lupa Verifikasi Ulang",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        document.location.href = "/profile";
      }, 2000);
    } catch (error) {
      toast({
        title: `${error.response}`,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };
};

export const changeEmail = (data, toast) => {
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
      toast({
        title: "Email Sudah Terganti Jangan Lupa Verifikasi Ulang",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        dispatch(logoutSuccess());
      }, 2000);
    } catch (error) {
      toast({
        title: `${error.response.data}`,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };
};

export const changePassword = (data, toast) => {
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
      toast({
        title: "Password Sudah Terganti Jangan Lupa Verifikasi Ulang",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        dispatch(logoutSuccess());
      }, 2000);
    } catch (error) {
      toast({
        title: `${error.response}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };
};

export const changeImage = (gambar, toast) => {
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

      toast({
        title: "Gambar Sudah Terganti",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        document.location.href = "/profile";
      }, 2000);
    } catch (error) {
      toast({
        title: "ada yang salah",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
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
