import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from '../components/PostCard';
import video from '../video/animation.mp4';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getposts');
      const data = await res.json();
      setPosts(data.posts);
    }
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:p-15 mx-auto">
        <div className="relative mx-auto bg-black w-full border-b-2 border-[#385cb6] dark:border-hidden"
        >
          <div className="relative mx-auto max-w-[1500px]">
            <video loop autoPlay muted className="w-full h-auto object-cover">
              <source src={video} type="video/mp4" />
              Ihr Browser unterstützt das Video-Tag nicht.
            </video>
            <div className="absolute inset-0 flex items-center justify-center flex-col text-white">
              <h1 className="text-3xl p-3 font-bold overflow-hidden lg:text-6xl text-center [text-shadow:_2px__2px_1px_rgb(10_10_10_/_80%)]">
                Dein Guide für die AI-Revolution.
              </h1>
              <p className="text-white [text-shadow:_2px__2px_1px_rgb(10_10_10_/_80%)] overflow-hidden text-center text-2xl hidden sm:block">
                Tauche ein in die faszinierende Welt der AI - Schritt für Schritt!
              </p>
              <Link to="/search" className="text-xl sm:text-xl p-6 # Light  text-[#ffffff] font-bold hover:underline"> 
                Alle Beiträge anzeigen
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7" >
        {posts && posts.length > 0 && (
          <div className="gap-8 flex flex-col">
            <h2 className="text-3xl font-medium text-center text-[#385cb6] ">Neuste Beiträge</h2>
            <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link to="/search" className="text-lg text-[#385cb6]  hover:underline text-center font-bold">
              Alle Beiträge anzeigen
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
