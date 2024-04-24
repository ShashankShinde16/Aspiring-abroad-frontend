import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../../Editor";
import axios from 'axios';
import { useSelector } from "react-redux";
import { selectRole} from "../../redux/features/auth/authSlice";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const role = useSelector(selectRole);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_RENDER_URL}/blog/` + id)
    .then(response => {
        const postInfo = response.data;
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
        console.log(content);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
    }, [id]);
    
    async function updatePost(ev) {
      ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }
    try {
      await axios.put(`${process.env.REACT_APP_RENDER_URL}/post`, data, {
        withCredentials: true
      });
      setRedirect(true);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  }
  
  if (redirect) {
    return <Navigate to={'/blog/' + id} />;
  }
  
  // Check if the user has admin role, if not redirect to a different page
  if (role !== 'admin') {
      return <Navigate to="/" />; // Assuming you have a login page, change this accordingly
  }
  
  return (
    <div className="max-w-full mx-auto mt-8 px-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Edit Blog</h1>
      <form onSubmit={updatePost} className="max-w-400 m-4 bg-gray-100 shadow-md rounded px-8 pt-6 pb-8">
        <input
          type="title"
          placeholder={'Title'}
          value={title}
          onChange={ev => setTitle(ev.target.value)}
          className="block mb-5 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 bg-white"
        />
        <input
          type="summary"
          placeholder={'Summary'}
          value={summary}
          onChange={ev => setSummary(ev.target.value)}
          className="block mb-5 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 bg-white"
        />
        <input type="file" onChange={ev => setFiles(ev.target.files)} className="mb-5" />
        <Editor onChange={setContent} value={content} />
        <div className="flex items-center justify-center">
        <button style={{  maxWidth: '200px' }} type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-4 px-4 rounded focus:outline-none focus:shadow-outline">
          Update post
        </button>
        </div>
      </form>
    </div>
  );
}

