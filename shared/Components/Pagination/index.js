import PaginationStyle from './Style';

const Pagination = ({
  lastPageCount,
  pageCurrent,
  handelNextClick,
  handelPrevClick
}) => (
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
        <span>Page {pageCurrent}</span>
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
export default Pagination;
