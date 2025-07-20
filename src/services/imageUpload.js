  
import axios from "axios";

const API_KEY = "dc9a86ef33f59651e26f710a25eaa060"; 

// تحويل الصورة إلى base64
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]); 
    reader.onerror = reject;
  });

export const uploadImage = async (file) => {
  const base64Image = await toBase64(file);

  const formData = new FormData();
  formData.append("image", base64Image);

  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${API_KEY}`,
      formData
    );

    return response.data.data.url;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw new Error("Image upload failed");
  }
};

