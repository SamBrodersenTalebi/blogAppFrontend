import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';
import { prettyDOM } from '@testing-library/dom';

describe('BlogForm test', () => {
  test('check, that the form calls the event handler it received as props with correct details', () => {
    const createBlog = jest.fn();

    const component = render(<BlogForm createBlog={createBlog} />);
    const author = component.container.querySelector('#author');
    const url = component.container.querySelector('#url');
    const title = component.container.querySelector('#title');
    const form = component.container.querySelector('form');

    fireEvent.change(author, {
      target: { value: 'morgan grimes' },
    });

    fireEvent.change(url, {
      target: { value: 'www.email.com' },
    });

    fireEvent.change(title, {
      target: { value: 'Muggi mugii' },
    });

    fireEvent.submit(form);

    expect(createBlog.mock.calls).toHaveLength(1);
  });
});
