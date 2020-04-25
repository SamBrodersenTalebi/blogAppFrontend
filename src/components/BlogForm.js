import React from 'react';

const BlogForm = ({ onSubmit, onChange, author, title, url }) => {
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={onSubmit}>
        <div>
          title:
          <input
            type='text'
            value={title}
            name='title'
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            name='author'
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            name='url'
            onChange={(e) => onChange(e)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default BlogForm;
