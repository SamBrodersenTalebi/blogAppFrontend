import React from 'react';

export default function Footer() {
  const style = {
    padding: 30,
    margin: 0,
    backgroundColor: '#3F51B5',
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
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
