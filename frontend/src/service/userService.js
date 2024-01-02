import axiosInstance from "@/utils/axios";

export  const fetchFeedBack = async (url) => {
          try {
            const response = await axiosInstance.get(`/api/sv1/feedback/${url}`);
            const data = response.data;
            
          } catch (error) {
            console.error("Error fetching feedback:", error);
          }
        };