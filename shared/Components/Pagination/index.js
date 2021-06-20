import { Link } from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import PaginationStyle from './Style';
const Pagination = props => {
  const router = useRouter();

  const {
    currentPage,
    lastPage,
    pageLimit,
    lastPageCount,
    pageCurrent,
    count,
    handelNextClick,
    handelPrevClick
  } = props;
  // const lastPageCount = Math.round(count / 20);

  // const handelPrevClick = () => {
  //   const offs = props.paginationState[pageCurrent][0];
  //   setPageCurrent(pageCurrent - 1);
  //   props.loadMore(offs);
  // };
  // const handelNextClick = () => {
  //   setNext(true);
  //   const offs = props.paginationState[pageCurrent][1];
  //   props.loadMore(offs);
  //   setPageCurrent(pageCurrent + 1);
  // };
  return (
    <PaginationStyle>
      <ul className="pagination">
        <li
          className={`prev ${
            pageCurrent == 0 || (pageCurrent == 1 && 'disabled')
          }`}
          onClick={handelPrevClick}
        >
          Prev
        </li>
        <li
          className={`paginationItem ${pageCurrent <= pageCurrent && 'active'}`}
        >
          <span>{pageCurrent}</span>
        </li>
        <li
          className={`next ${pageCurrent == lastPageCount && 'disabled'}`}
          onClick={handelNextClick}
        >
          Next
        </li>
      </ul>
    </PaginationStyle>
  );
};

export default Pagination;
