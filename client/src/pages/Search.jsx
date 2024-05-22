import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });

  console.log(sidebarData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === 'category') {
      const category = e.target.value || 'uncategorized';
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 md:border-r md:min-h-screen border-gray-700 dark:bg-[#0b1020d4] bg-[#b8bfd71e]'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <input className='dark:bg-[#0b1020d4] bg-[#b8bfd71e] rounded-md'
              placeholder='Search...'
              id='searchTerm'
              type='text'
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sortieren nach:</label>
            <select className='dark:bg-[#0b1020d4] bg-[#b8bfd71e] rounded-md' onChange={handleChange} value={sidebarData.sort} id='sort'>
              <option value='desc'>Neuste</option>
              <option value='asc'>Älteste</option>
            </select>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Kategorie:</label>
            <select className='dark:bg-[#0b1020d4] bg-[#b8bfd71e] rounded-md'
              onChange={handleChange}
              value={sidebarData.category}
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
      <div className='w-full'>
        <h1 className='text-4xl font-semibold p-3 mt-5 ml-4 text-[#385cb6]'>
        Ergebnisse:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && posts.length === 0 && (
            <p className='text-xl text-[#385cb6]'>Keine Einträge gefunden.</p>
          )}
          {loading && <p className='text-xl text-[#385cb6]'>Laden...</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className='text-[#385cb6] text-lg hover:underline p-7 w-full'
            >
              Weitere Beiträge anzeigen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}