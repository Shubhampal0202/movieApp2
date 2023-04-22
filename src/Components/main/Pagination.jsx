import React from "react";
import "./pagination.css";
function Pagination({ pagination, setPagination, currPage, setCurrPage }) {
  const handleRight = () => {
    let newArr = [];
    for (let i = 1; i <= pagination.length + 1; i++) {
      newArr.push(i);
    }
    setPagination(newArr);
    setCurrPage(currPage + 1);
  };

  const handleLeft = () => {
    if (currPage > 1) {
      setCurrPage(currPage - 1);
    }
  };

  const pageChange = (value) => {
    setCurrPage(value);
  };
  return (
    <div className="pagination">
      <button onClick={handleLeft}>Prev</button>
      {pagination.map((value) => {
        return value == currPage ? (
          <button id="selected">{value}</button>
        ) : (
          <button onClick={() => pageChange(value)}>{value}</button>
        );
      })}
      <button onClick={handleRight}>Next</button>
    </div>
  );
}

export default Pagination;
