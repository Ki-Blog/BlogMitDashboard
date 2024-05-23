import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import {BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble} from 'react-icons/bs';
import logo from "../images/logo_gross.svg";
import { useSelector } from "react-redux";
export default function FooterCom() {
  const { theme } = useSelector((state) => state.theme);
  return (
    <Footer container className='border-t-2 border-[#9bb0ddd3] rounded-none dark:bg-[#090d1c] bg-[#f7f7fa]'>
    <div className='w-full max-w-7xl mx-auto'>
      <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
        <div className='mt-5'>
        <Link to="/">
        <img src={logo} alt="Logo" className={`h-11 ${theme === 'dark' ? 'filter invert' : ''}`} />
      </Link>
      </div >
      <div className='flex gap-16 sm:mt-0 mt-4 sm:justify-center'>
        <div >
        <Footer.Title title='Über Uns'/>
        <Footer.LinkGroup col>
          <Footer.Link
            href='#'
            rel='noopener noreferrer'
          >
            Github
          </Footer.Link>
          <Footer.Link
            href='https://www.github.com/'
            rel='noopener noreferrer'
          >
            AI Quantum 
          </Footer.Link>
          </Footer.LinkGroup>
        </div>
        <div>
        <Footer.Title title='Legal'/>
        <Footer.LinkGroup col>
          <Footer.Link
            href='/#'
          >
            Datenschutzrichtlinie
          </Footer.Link>
          <Footer.Link
            href='/#'>
            Bedingungen
          </Footer.Link>
          </Footer.LinkGroup>
        </div>
      </div>
    </div>
    <Footer.Divider />
    <div className='w-full sm:flex sm:items-center sm:justify-between'>
      <Footer.Copyright href='#' by="AI Quantum " year={new Date().getFullYear()}
      />
      <div className='flex gap-8 sm:mt-0 mt-4 mr-16 sm:justify-center'>
        <Footer.Icon href='#' icon={BsFacebook}/>
        <Footer.Icon href='#' icon={BsInstagram}/>
        <Footer.Icon href='#' icon={BsTwitter}/>
        <Footer.Icon href='https://www.github.com/' icon={BsGithub}/>
        <Footer.Icon href='#' icon={BsDribbble}/>
      </div>
    </div>
  </div>
    </Footer>
  );
}
