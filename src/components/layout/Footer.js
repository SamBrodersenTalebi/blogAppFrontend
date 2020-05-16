import React from 'react';

export default function Footer() {
  const style = {
    padding: 10,
  };
  return (
    <footer>
      <p style={style}>
        &copy; {new Date().getFullYear()}. All rights Reserved, designed by Sam
        Brodersen
      </p>
    </footer>
  );
}
