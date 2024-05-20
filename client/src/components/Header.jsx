import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';
import logo from "../images/logo.png"
import logodark from "../images/logodark.png"
import { ImSun } from "react-icons/im";
import "../index.css"

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');
  const linkClass = theme === 'dark' ? 'navbar-link-dark' : 'navbar-link';

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className='border-b border-2px border-[#0e93b7]  dark:bg-[#0c12243f]'>
      <Link to='/'>
        <img src={theme === "dark" ? logodark : logo} alt="Logo" />
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline bg-white dark:bg-black text-left rounded-md'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button
          className='w-12 h-10 hidden sm:inline'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/signin'>
            <Button className='bg-#0e93b7' outline>
              Sign In
            </Button>
          </Link>
        )}
        
      <Navbar.Toggle />
        </div>
        <Navbar.Collapse >
          <Navbar.Link active={path === "/"} as={"div"}>
            <Link to="/" className={linkClass} >Startseite</Link>
          </Navbar.Link>

          {window.innerWidth > 500 &&
            <div style={{ borderLeft: '1px solid grey', height: '25px', paddingRight: '8px' }}></div>
          }

          <Navbar.Link active={path === "/about"} as={"div"}>
            <Link to="/about" className={linkClass} >Über uns</Link>
          </Navbar.Link>

          {window.innerWidth > 500 &&
            <div style={{ borderLeft: '1px solid grey', height: '25px', paddingRight: '8px' }}></div>
          }

          <Navbar.Link active={path === "/search"} as={"div"}>
            <Link to="/search" className={linkClass}>Alle Beiträge</Link>
          </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  );
}
