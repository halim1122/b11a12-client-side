import Logos from '../../assets/ChatGPT Image Jul 11, 2025, 02_03_06 AM.png'
import { Link } from 'react-router';
const Logo = () => {
     return (
          <Link to='/'>
               <div className='flex gap-0'>
               <img className='w-5 md:w-6 lg:w-8' src={Logos} alt="" />
               <h1 className='dancing font-medium text-lg lg:font-extrabold lg:text-2xl'>Wanderora</h1>
          </div>
          </Link>
     );
};

export default Logo;