import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');
  
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  
  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full md:w-56 h-full dark:bg-[#0b1020d4] bg-[#b8bfd71e] flex flex-col p-4">
      <div className="flex flex-col gap-1">
        {currentUser && currentUser.isAdmin && (
          <Link to="/dashboard?tab=dash">
            <div className={`flex items-center p-3 rounded hover:bg-[#273f7b] ${tab === 'dash' || !tab ? 'bg-[#2e406d] text-white' : ''}`}>
              <HiChartPie className="mr-2" />
              Dashboard
            </div>
          </Link>
        )}
        <Link to="/dashboard?tab=profile">
          <div className={`flex items-center p-3 rounded hover:bg-[#273f7b] ${tab === 'profile' ? 'bg-[#2e406d] text-white' : ''}`}>
            <HiUser className="mr-2" />
            Profil
          </div>
        </Link>
        {currentUser.isAdmin && (
          <Link to="/dashboard?tab=posts">
            <div className={`flex items-center p-3 rounded hover:bg-[#273f7b] ${tab === 'posts' ? 'bg-[#2e406d] text-white' : ''}`}>
              <HiDocumentText className="mr-2" />
              Posts
            </div>
          </Link>
        )}
        {currentUser.isAdmin && (
          <>
            <Link to="/dashboard?tab=users">
              <div className={`flex items-center p-3 rounded hover:bg-[#273f7b] ${tab === 'users' ? 'bg-[#2e406d] text-white' : ''}`}>
                <HiOutlineUserGroup className="mr-2" />
                Users
              </div>
            </Link>
            <Link to="/dashboard?tab=comments">
              <div className={`flex items-center p-3 rounded hover:bg-[#273f7b] ${tab === 'comments' ? 'bg-[#2e406d] text-white' : ''}`}>
                <HiAnnotation className="mr-2" />
                Comments
              </div>
            </Link>
          </>
        )}
        <div className="flex items-center p-3 rounded hover:bg-[#273f7b] cursor-pointer" onClick={handleSignout}>
          <HiArrowSmRight className="mr-2" />
          Sign Out
        </div>
      </div>
    </div>
  );
}
