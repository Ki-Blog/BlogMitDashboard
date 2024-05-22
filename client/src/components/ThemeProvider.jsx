import { useSelector } from 'react-redux';

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className='bg-white text-gray-600 dark:text-gray-400 dark:bg-[rgb(0,0,0)] min-h-screen'>
        {children}
      </div>
    </div>
  );
}