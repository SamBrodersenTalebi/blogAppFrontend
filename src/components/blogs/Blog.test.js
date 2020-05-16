import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';
import { prettyDOM } from '@testing-library/dom';

describe('Blog testing', () => {
  let component;
  const handleLike = jest.fn();
  beforeEach(() => {
    const blog = {
      title: 'my name is jeff',
      author: 'Sam',
      url: 'MorganGrims.com',
      likes: 5,
    };
    component = render(<Blog blog={blog} handleLike={handleLike} />);
  });

  test('display only author and title when first rendered', () => {
    const infoBlog = component.container.querySelector('.blogInfo');
    expect(infoBlog).toBeVisible;

    const detailedBlog = component.container.querySelector('.blogInfoDetailed');
    expect(detailedBlog).not.toBeVisible;
  });

  test('Blog url and number of likes are shown on button click', () => {
    const button = component.container.querySelector('.toggleView');
    console.log(prettyDOM(button));
    fireEvent.click(button);

    const detailedBlog = component.container.querySelector('.blogInfoDetailed');
    expect(detailedBlog).not.toHaveStyle('display:none');
  });

  test('If like button is clicked twice handleLike event handler is called 2 times', () => {
    const button = component.container.querySelector('.like');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(handleLike.mock.calls).toHaveLength(2);
  });
});
