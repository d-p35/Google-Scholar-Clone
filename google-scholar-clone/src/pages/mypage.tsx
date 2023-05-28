import React, { Key } from 'react';
import { Container, TextInput, Paper, Card, Text } from '@mantine/core';

export function MyPage (){


  const [searchValue, setSearchValue] = React.useState('');
  const [data, setData] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 4;

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);


  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const searchData = [
      { id: 1, title: 'Article 1', author: 'Author 1', abstract: 'Abstract 1' },
      { id: 2, title: 'Article 2', author: 'Author 2', abstract: 'Abstract 2' },
      { id: 3, title: 'Article 3', author: 'Author 3', abstract: 'Abstract 3' },
      { id: 4, title: 'Article 1', author: 'Author 1', abstract: 'Abstract 1' },
      { id: 5, title: 'Article 2', author: 'Author 2', abstract: 'Abstract 2' },
      { id: 6, title: 'Article 3', author: 'Author 3', abstract: 'Abstract 3' }
    ];
    setData(searchData);
  };

  type i = {
    id: Key,
    title: String,
    author: String,
    abstract : String,
  }

  return (
    <Container size="md" style={{ marginTop: '2rem' }}>
        <form onSubmit={handleSearchSubmit}>
          <TextInput
            placeholder="Search"
            value={searchValue}
            onChange={handleSearchChange}
            style={{ marginBottom: '1rem' }}
            fullWidth
          />
        </form>
        {data.length > 0 ? (
          data.map((item: i) => (
            <Card padding="lg" key={item.id} shadow="xs" style={{ marginBottom: '1rem' }}>
              <Text size="lg" weight={600}>
                {item.title}
              </Text>
              <Text size="sm" style={{ marginBottom: '0.5rem' }}>
                {item.author}
              </Text>
              <Text size="sm" color="gray">
                {item.abstract}
              </Text>
            </Card>
          ))
        ) : (
          <Text>No results found</Text>
        )}

    {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                style={{
                  margin: '0.25rem',
                  padding: '0.5rem 1rem',
                  background: currentPage === i + 1 ? '#007bff' : '#e3e3e3',
                  color: currentPage === i + 1 ? '#fff' : '#000',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                {i + 1}
              </button>
              
            ))}
            </div>
        )}
    </Container>
  );
}

