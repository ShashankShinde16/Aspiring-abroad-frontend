import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../../Editor";
import axios from 'axios'; // Import Axios
import { useSelector } from "react-redux";
import { selectRole} from "../../redux/features/auth/authSlice";


export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const role = useSelector(selectRole);
  
  // Check if the user has admin role, if not redirect to a different page
  if (role !== 'admin') {
      return <Navigate to="/" />; // Assuming you have a login page, change this accordingly
  }
  
  async function createNewPost(ev) {
    ev.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('content', content);
    formData.append('file', files[0]);

    try {
      const response = await axios.post(`${process.env.REACT_APP_RENDER_URL}/post`, formData, {
        withCredentials: true, // Ensure credentials are included
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      // Handle error here
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="max-w-full mx-auto mt-8 px-12 ">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Create Your Blog</h1>
      <form onSubmit={createNewPost} className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded bg-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="summary">
            Summary
          </label>
          <input
            id="summary"
            type="text"
            placeholder="Summary"
            value={summary}
            onChange={(ev) => setSummary(ev.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded bg-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
            Upload Image
          </label>
          <input
            id="file"
            type="file"
            onChange={(ev) => setFiles(ev.target.files)}
            className="mb-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
            Content
          </label>
          <Editor value={content} onChange={setContent} />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
  
  
  
}
