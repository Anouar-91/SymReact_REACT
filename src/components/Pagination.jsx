import React from 'react'

function Pagination({currentPage, itemsPerPage, length, onPageChange}) {

    const pagesCount = Math.ceil(length / itemsPerPage);
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    
  return (
    <nav aria-label="Page navigation example ">
    <ul className="pagination justify-content-end pr-5">
      <li className={"page-item" + (currentPage === 1 && " disabled")}>
        <a onClick={() => onPageChange(currentPage -1)} className="page-link" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      {pages.map(page =>
        <li key={page} className={page === currentPage ? "page-item active" : "page-item"}><a onClick={() => onPageChange(page)} className="page-link" >{page}</a></li>
      )}
      <li className={"page-item" + (currentPage === pagesCount && " disabled")}>
        <a onClick={() => onPageChange(currentPage +1)} className="page-link" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
  )
}

export default Pagination