import Post from "../../Post";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import NotFoundPage from "../NotFoundPage";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false); // State to track error

  useEffect(() => {
    fetch(`${process.env.REACT_APP_RENDER_URL}/post`).then((response) => {
      if (!response.ok) {
        setError(true); // Set error state to true if response is not ok
        return;
      }
      
      response.json().then((posts) => {
        setPosts(posts);
      });
    }).catch(() => {
      setError(true); // Set error state to true if there is an error in fetch request
    });
  }, []);

  return (
    <div className=" min-h-screen overflow-hidden">
      <Helmet>
        <title>Blogs - Aspiring Abroad</title>
        <meta
          name="description"
          content="Explore a variety of blog posts on topics related to international education, study abroad programs, scholarships, and more at Aspiring Abroad."
        />
        <meta
          name="keywords"
          content="blogs, study abroad blogs, international education blogs, education articles, student experiences, scholarship tips, study abroad advice"
        />
        {/* Add other meta tags as needed */}
      </Helmet>

      {error ? ( // Render 404 page if error occurred
        <NotFoundPage />
      ) : (
        <div>
          <h1 className="text-4xl font-bold text-center mb-8 p-3 text-white rounded-b-3xl shadow-lg bg-red-500 mx-auto max-w-md">
            Blogs
          </h1>

          <div className="container mx-auto">
            {posts.length > 0 &&
              posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-gray-100 rounded-lg shadow-md mb-4"
                >
                  <Post
                    _id={post._id}
                    title={post.title}
                    summary={post.summary}
                    cover={post.cover}
                    content={post.content}
                    createdAt={post.createdAt}
                    {...post}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
