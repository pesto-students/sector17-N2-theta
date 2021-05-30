import Link from "next/link";
import NavigationStyle from "./Style";

const Navigation = () => {
  return (
    <NavigationStyle>
      <ul>
        <li>
          <Link href="/categories/[category-slug]" as="/categories/category-1">
            <a>
              <span className='icon'></span>
              <span className='label'>label</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/categories/[category-slug]" as="/categories/category-2">
            <a>
              <span className='icon'></span>
              <span className='label'>label</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/categories/[category-slug]" as="/categories/category-3">
            <a>
              <span className='icon'></span>
              <span className='label'>label</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/categories/[category-slug]" as="/categories/category-4">
            <a>
              <span className='icon'></span>
              <span className='label'>label</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/categories/[category-slug]" as="/categories/category-5">
            <a>
              <span className='icon'></span>
              <span className='label'>label</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/categories/[category-slug]" as="/categories/category-6">
            <a>
              <span className='icon'></span>
              <span className='label'>label</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/categories/[category-slug]" as="/categories/category-7">
            <a>
              <span className='icon'></span>
              <span className='label'>label</span>
            </a>
          </Link>
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
