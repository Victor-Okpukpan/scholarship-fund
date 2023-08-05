import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='flex h-screen flex-col items-center justify-center text-center text-lg'>
      <h1 className='text-3xl'>Oops! You seem to be lost.</h1>
      <p>Here are some helpful links:</p>
      <Link className='font-bold hover:text-blue-500 py-5' to='/'>
        Home
      </Link>
      <Link className='font-bold hover:text-blue-500 py-5' to='/apply'>
        Apply
      </Link>
    </div>
  );
}
