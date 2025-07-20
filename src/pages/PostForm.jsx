/*import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { uploadImage } from "../services/imageUpload"; // ✅ استيراد دالة رفع الصور

export default function PostForm() {
  const { id } = useParams(); // إذا وُجد id فهذه صفحة تعديل
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(""); // للعرض قبل الرفع
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/posts/${id}`).then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setPreviewImage(res.data.image); // نعرض الصورة السابقة
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let imageUrl = previewImage;

      if (imageFile) {
        // ✅ رفع الصورة إلى ImgBB
        imageUrl = await uploadImage(imageFile);
      }

      const payload = { title, description, image: imageUrl };
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (id) {
        await axios.put(`http://localhost:8000/posts/${id}`, payload, config);
      } else {
        await axios.post(`http://localhost:8000/posts`, payload, config);
      }

      navigate("/");
    } catch (err) {
      alert("فشل في حفظ المنشور.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 space-y-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="block w-full p-2 border rounded"
        required
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="block w-full p-2 border rounded"
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setImageFile(e.target.files[0]);
          setPreviewImage(URL.createObjectURL(e.target.files[0]));
        }}
        className="block w-full"
      />

      {previewImage && (
        <img
          src={previewImage}
          alt="Preview"
          className="w-full h-40 object-cover rounded"
        />
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Saving..." : id ? "Update Post" : "Add Post"}
      </button>
    </form>
  );
}*/



/*import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function PostForm() {
  const { id } = useParams(); // if exists, we're editing
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const{ author,setAuthor}=useState("");

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/posts/${id}`)
        .then(res => {
          setTitle(res.data.title);
          setDescription(res.data.description);
          setImage(res.data.image);
          setAuthor(res.data.author);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { title, description, image,author };
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      if (id) {
        // Edit post
        await axios.put(`http://localhost:8000/posts/${id}`, payload, config);
      } else {
        // Add post
        await axios.post(`http://localhost:8000/posts`, payload, config);
      }
      navigate("/");
    } catch (err) {
      alert("Failed to submit post.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="block w-full mb-4 p-2 border" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="block w-full mb-4 p-2 border" required />
     
      <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" className="block w-full mb-4 p-2 border" required />
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="author" className="block w-full mb-4 p-2 border" required />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">

        {id ? "Update Post" : "Add Post"}
      </button>
    </form>
  );
}*/
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
export default function PostForm() {
  const { id } = useParams(); // if exists, we're editing
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext); // ✅ get user and token

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState(""); // ✅ FIXED useState

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/posts/${id}`).then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setImage(res.data.image);
        setAuthor(res.data.author || "");
      });
    } else {
      // When creating a new post, set author name from logged user
      if (user) {
        setAuthor(user.name);
      }
    }
  }, [id, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      image,
      author: author || user.name,
      userId: user.id, // ✅ IMPORTANT
    };

    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      if (id) {
        await axios.put(`http://localhost:8000/posts/${id}`, payload, config);
      } else {
        await axios.post(`http://localhost:8000/posts`, payload, config);
      }
      navigate("/");
    } catch (err) {
      alert("Failed to submit post.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="block w-full mb-4 p-2 border"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="block w-full mb-4 p-2 border"
        required
      />
      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image URL"
        className="block w-full mb-4 p-2 border"
        required
      />
      

      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        className="block w-full mb-4 p-2 border"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {id ? "Update Post" : "Add Post"}
      </button>
    </form>
  );
}






