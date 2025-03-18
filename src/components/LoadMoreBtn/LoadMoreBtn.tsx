import React from "react";
import s from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onLoadMore: () => void;
  show: boolean;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onLoadMore, show }) => {
  if (!show) return null;

  return (
    <div>
      <button className={s.loadBtn} onClick={onLoadMore}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
