import { Link } from 'react-router-dom';
import { format } from 'date-fns'; // Import date-fns for date formatting

function BlogPost({ _id, cover, title, createdAt, summary }) {
  return (
    <div className="blog-post overflow-hidden flex items-center justify-between border border-gray-200 p-4 rounded-md shadow-md bg-gradient-to-r from-gray-100 to-gray-200">
      <Link to={`/blog/${_id}`} className="post-link flex-grow flex items-center">
        <div className="image-wrapper mr-4 flex-shrink-0 w-1/5 h-48 overflow-hidden rounded-md">
          <img
            src={`${process.env.REACT_APP_RENDER_URL}/` + cover}
            alt={title}
            className="post-image w-full h-full object-contain rounded-md"
          />
        </div>
        <div className="post-content flex-grow">
          <h2 className="post-title text-xl font-semibold mb-2 text-gray-900">{title}</h2>
          <p className="post-info text-sm font-bold text-gray-600 mb-2">{format(new Date(createdAt), 'MMMM dd, yyyy')}</p>
          <p className="post-summary text-sm text-gray-700">{summary}</p>
        </div>
      </Link>
    </div>
  );
  
  
  
  
}

export default BlogPost;
