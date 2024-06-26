import axios from "axios";


  const API = axios.create({
    baseURL: "https://workout-tracker-i5je.onrender.com/api/",
  });
  
  
  export const UserSignUp = async (data) => {
    try {
      return await API.post("/user/signup", data);
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };
  
  export const UserSignIn = async (data) => {
    try {
      return await API.post("/user/signin", data);
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };
  
  
  export const getDashboardDetails = async (token) => {
    try {
      return await API.get("/user/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Error fetching dashboard details:", error);
      throw error;
    }
  };
  
  
  export const getWorkouts = async (token, date = "") => {
    try {
      const url = date ? `/user/workout?date=${date}` : "/user/workout";
      return await API.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Error fetching workouts:", error);
      throw error;
    }
  };
  
  
  export const addWorkout = async (token, data) => {
    try {
      return await API.post("/user/workout", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Error adding workout:", error);
      throw error;
    }
  };