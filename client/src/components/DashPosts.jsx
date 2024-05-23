import { Modal, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 mt-[80px]'>
      <h1 className='dark:text-[#9bb0ddd3] text-[#7b8cb0] font-semibold text-4xl mb-12'>Alle Beiträge</h1>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <div className="shadow-md rounded-lg overflow-hidden dark:border-2 border-gray-900">
          <table className='min-w-full bg-[#b8bfd71e] dark:bg-[#0b10209a]'>
            <thead className="bg-[#b8bfd789] dark:bg-[#070914e4] dark:text-[#7b8cb0b6]  text-[#40517c]">
              <tr>
                <th className="py-2 text-left px-4 font-semibold">Datum</th>
                <th className="py-2 text-left px-4 font-semibold">Beitragsbild</th>
                <th className="py-2 text-left px-4 font-semibold">Beitragstitel</th>
                <th className="py-2 text-left px-4 font-semibold">Kategorie</th>
                <th className="py-2 text-left px-4 font-semibold">Löschen</th>
                <th className="py-2 text-left px-4 font-semibold">Bearbeiten</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-900">
              {userPosts.map((post) => (
                <tr key={post._id} className='bg-[#b8bfd71e] dark:border-gray-900 dark:bg-[#0b1020d4] hover:bg-[#b8bfd75f] dark:hover:bg-[#141c37]'>
                  <td className="py-2 px-4">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </td>
                  <td className="py-2 px-4">
                    <Link
                      className='font-medium text-gray-900 dark:text-white'
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="py-2 px-4">{post.category}</td>
                  <td className="py-2 px-4">
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className='font-medium text-[#8a52f3dd] hover:underline cursor-pointer'
                    >
                      Löschen
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <Link
                      className='text-[#2ca3c1] font-semibold hover:underline'
                      to={`/update-post/${post._id}`}
                    >
                      <span>Bearbeiten</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-[#385cb6] self-center text-sm py-7'
            >
              Mehr anzeigen
            </button>
          )}
        </div>
      ) : (
        <p>Du hast noch keine Beiträge erstellt!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>  
            Bist du sicher, dass du diesen Beitrag löschen möchten?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeletePost}>
              Ja, ich bin mir sicher
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                Nein, abbrechen
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
