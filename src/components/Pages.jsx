import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";

const Pages = () => {
  const { device } = useContext(Context);
  const pageCount = Math.ceil(device.totalCount / device.limit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <ul className="pages__list">
      {pages.map((page) => (
        <li
          key={page}
          onClick={() => device.setPage(page)}
          className={
            device.page === page
              ? "pages__list-item--active"
              : "pages__list-item"
          }
        >
          {page}
        </li>
      ))}
    </ul>
  );
};

export default observer(Pages);
