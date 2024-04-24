import React from 'react';

function Header({ title }: { title: string }) {
  return (
    <header id="header">
      <h1>{title || '标题'}</h1>
    </header>
  );
}

export default Header;
