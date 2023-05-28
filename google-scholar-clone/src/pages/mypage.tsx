import React from 'react';
import { Container, TextInput, Paper, Card, Text } from '@mantine/core';
import { Key } from 'readline';
import {useEffect } from 'react';
import { get } from 'http';

export const MyPage = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [data, setData] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10; // Number of items to display per page

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    getArticle();
}

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  async function getArticle() {
    const response = await fetch(`https://api.openalex.org/works?search=${searchValue}`);
    const result = await response.json();
    console.log(result);
    setData(result.results);
};

  useEffect(() => {

    getArticle();
    }, []);

  
  type i ={
    id: Key,
    title: string,
    author: string,
    abstract: string
  }
  return (
    <Container size="lg" style={{  marginTop: '6rem' }}>
        <form onSubmit={handleSearchSubmit}>
          <TextInput
            placeholder="Search"
            value={searchValue}
            onChange={handleSearchChange}
            style={{ marginBottom: '3rem' }}
            fullWidth
          />
        </form>
        <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
          {currentItems.length > 0 ? (
            currentItems.map((item: i) => (
              <Card key={item.id} shadow="xs" style={{ marginBottom: '2rem' }} >
                <Text size="lg" weight={600}>
                  {item.title}
                </Text>
                <Text size="sm" style={{ marginBottom: '0.5rem' }}>
                  {/* {item.author} */}
                </Text>
                <Text size="sm" color="gray">
                  {/* {item.abstract} */}
                </Text>
              </Card>
            ))
          ) : (
            <Text>No results found</Text>
          )}
        </div>
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
};

