import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import Headline from './Headline';


describe('Headline component', () => {
  afterEach(() => {
    cleanup();
  });
const mockArticle = {
  publishedAt: '01-07-2025',
  title: 'Sample Title',
  author: 'Sample Author',
  url: 'https://google.com',
  source: {
    name: 'Google News',
  },
  description: 'Sample description with sample details'
}
  it('renders publishedAt', () => {
    render(<Headline article={mockArticle}/>);
    expect(screen.getByRole('heading', {level: 4, name: mockArticle.title})).toBeInTheDocument();
  })
  it('renders the link to the source', () => {
    render(<Headline article={mockArticle}/>);
    const sourceLink = screen.getByRole('link', {name: mockArticle.source.name});
    expect(sourceLink).toBeInTheDocument;
    expect(sourceLink).toHaveAttribute('href', mockArticle.url);

  })

  it('renders the author', () => {
    render(<Headline article={mockArticle} />);
    expect(screen.getByText(`${mockArticle.author}`, { exact: false }))
      .toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<Headline article={mockArticle} />);
    expect(screen.getByText(mockArticle.description)).toBeInTheDocument();
  });
});
