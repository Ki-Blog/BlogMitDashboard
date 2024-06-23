import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import PostCard from '../components/PostCard';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Search() {
  const { theme } = useSelector((state) => state.theme);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState('desc');
  const [category, setCategory] = useState('uncategorized');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm') || '';
    const sortFromUrl = urlParams.get('sort') || 'desc';
    const categoryFromUrl = urlParams.get('category') || 'uncategorized';

    setSearchTerm(searchTermFromUrl);
    setSort(sortFromUrl);
    setCategory(categoryFromUrl);

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      console.log(`Fetching posts with query: ${searchQuery}`); // Debuggen
      const res = await fetch(`${baseUrl}/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        console.error('Failed to fetch posts'); // Debuggen
        return;
      }
      const data = await res.json();
      console.log('Fetched posts:', data.posts); // Debuggen
      setPosts(data.posts);
      setLoading(false);
      setShowMore(data.posts.length === 9);
    };

    fetchPosts();
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    urlParams.set('sort', sort);
    urlParams.set('category', category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    setSearchTerm('');
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    urlParams.set('cacheBuster', Date.now());
    const searchQuery = urlParams.toString();
    const res = await fetch(`${baseUrl}/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    const data = await res.json();
    setPosts([...posts, ...data.posts]);
    setShowMore(data.posts.length === 9);
  };

  return (
    <div className="relative min-h-screen">
      <div className='relative flex flex-col md:flex-row'>
        <div className='p-7 md:border-r md:min-h-screen border-[#aeaeae77] dark:border-[#aeaeae2f] dark:bg-[#090d1c] bg-[#f7f7fa]'>
          <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
            <div className='flex items-center gap-2'>
              <label className='whitespace-nowrap font-semibold'>
                Suchbegriff:
              </label>
              <input className='dark:bg-[#0b1020d4] bg-[#b8bfd71e] rounded-md'
                placeholder='Suche...'
                id='searchTerm'
                type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className='flex items-center gap-2'>
              <label className='font-semibold'>Sortieren nach:</label>
              <select className='dark:bg-[#0b1020d4] bg-[#b8bfd71e] rounded-md' onChange={(e) => setSort(e.target.value)} value={sort} id='sort'>
                <option value='desc'>Neuste</option>
                <option value='asc'>Älteste</option>
              </select>
            </div>
            <div className='flex items-center gap-2'>
              <label className='font-semibold'>Kategorie:</label>
              <select className='dark:bg-[#0b1020d4] bg-[#b8bfd71e] rounded-md'
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                id='category'
              >
                <option value='uncategorized'>Nicht kategorisiert</option>
                <option value='midjourney'>Midjourney</option>
                <option value='pika'>Pika</option>
                <option value='canva'>Canva</option>
                <option value='chatgpt'>ChatGPT</option>
                <option value='colormind'>Colormind</option>
                <option value='brainfm'>Brain.fm</option>
                <option value='beautifulai'>Beautiful.ai</option>
                <option value='LanguageTool'>LanguageTool</option>
                <option value='dalle2'>DALL-E2</option>
              </select>
            </div>
            <Button type='submit' gradientDuoTone='purpleToBlue' outline>
              Filter anwenden
            </Button>
          </form>
        </div>
        <div className='w-full flex flex-col items-center mt-[80px]'>
          <h1 className='text-4xl font-semibold p-3 mt-5 dark:text-[#9bb0ddd3] text-[#7b8cb0]'>
            Ergebnisse
          </h1>
          <div className='p-7 flex flex-wrap gap-4 justify-center'>
            {!loading && posts.length === 0 && (
              <p className='text-xl p dark:text-[#b3bccfb6] text-[#7b8cb0]'>Keine Einträge gefunden.</p>
            )}
            {loading && <p className='text-xl text-[#2ca3c1]'>Laden...</p>}
            {!loading && posts && posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-lg text-[#2ca3c1] hover:underline self-center font-bold mt-3 mb-10'
            >
              Weitere Beiträge anzeigen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
