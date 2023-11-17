import React from 'react';

const Header: React.FC<{ isShow?: boolean }> = ({ isShow = true }) => {
  if (!isShow) return null;
  return <div>Header</div>;
};

export default Header;
