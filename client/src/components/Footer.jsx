import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import {BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble} from 'react-icons/bs';
import logo from "../images/logo.png"
import logodark from "../images/logodark.png"
import { useSelector } from "react-redux";
export default function FooterCom() {
  const { theme } = useSelector((state) => state.theme);
  return (
    <Footer container className='border-t border-1px border-[#0e93b7] rounded-none dark:bg-[#0c12243f]'>
    <div className='w-full max-w-7xl mx-auto'>
      <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
        <div className='mt-5'>
        <Link to="/">
        <img src={theme === "dark" ? logodark : logo} alt="Logo" />
      </Link>
      </div>
      <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
        <div>
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
      <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
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
