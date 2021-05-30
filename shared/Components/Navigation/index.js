import Link from "next/link";
import NavigationStyle from "./Style";

const Navigation = () => {
  return (
    <NavigationStyle>
      <ul>
        <li>
          <a href=''>
            <span className='icon'></span>
            <span className='label'>label</span>
          </a>
        </li>
        <li>
          <a href=''>
            <span className='icon'></span>
            <span className='label'>label</span>
          </a>
        </li>
        <li>
          <a href=''>
            <span className='icon'></span>
            <span className='label'>label</span>
          </a>
        </li>
        <li>
          <a href=''>
            <span className='icon'></span>
            <span className='label'>label</span>
          </a>
        </li>
        <li>
          <a href=''>
            <span className='icon'></span>
            <span className='label'>label</span>
          </a>
        </li>
        <li>
          <a href=''>
            <span className='icon'></span>
            <span className='label'>label</span>
          </a>
        </li>
        <li>
          <a href=''>
            <span className='icon'></span>
            <span className='label'>label</span>
          </a>
        </li>
        <li>
          <Link href='/categories' as='/categories'>
            <a>
              <span className='icon'></span>
              <span className='label'>View All Categories</span>
            </a>
          </Link>
        </li>
      </ul>
    </NavigationStyle>
  );
};

export default Navigation;
