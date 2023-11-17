import React from 'react';

const Footer: React.FC<{ isShow?: boolean }> = ({ isShow = true }) => {
  if (!isShow) return null;
  return <div>Footer</div>;
};

export default Footer;
