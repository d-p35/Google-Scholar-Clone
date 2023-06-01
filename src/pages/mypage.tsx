import React from 'react';
import { Container, TextInput, Paper, Card, Text, Group, Checkbox, Grid } from '@mantine/core';
import { Key } from 'readline';
import {useEffect } from 'react';
import { get } from 'http';
import { createStyles, RangeSlider, rem } from '@mantine/core';

 export default function MyPage () {
  const [searchValue, setSearchValue] = React.useState<any>('');
  const [data, setData] = React.useState<any>([]);
  const [currentPage, setCurrentPage] = React.useState<any>(1);
  const itemsPerPage = 10; // Number of items to display per page
  const [authors, setAuthors] = React.useState<string[]>([]);
  const [years, setYears] = React.useState<number[]>([]);

  const [filterOptions, setFilterOptions] = React.useState<any>({["num"] : 0});

  const handleSearchChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event: any) => {
    event.preventDefault();
    getArticle();
}

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const handleYearChange = (event: any) => {
    setFilterOptions((prevOptions: any) => ({
      ...prevOptions,
      ["lowestYear"]: event[0],
      ["highestYear"]: event[1],
    }));
  };

  const handleFilterChange = (event: any) => {
    const { name, checked } = event.target;
    // if (filterOptions["num"] === 0){
    //   for (let i = 0; i < authors.length; i++) {
    //     setFilterOptions((prevOptions) => ({
    //       ...prevOptions,
    //       [authors[i]]: false,
    //     }));
    //   }
    // }
    setFilterOptions((prevOptions: any) => ({
      ...prevOptions,
      [name]: checked,
    }));
    if (checked){
      setFilterOptions((prevOptions: any) => ({
        ...prevOptions,
        ["num"]: prevOptions["num"] + 1,
      }));
    }
    else{
      setFilterOptions((prevOptions: any) => ({
        ...prevOptions,
        ["num"]: prevOptions["num"] - 1,
      }));
    }

    setCurrentPage(1);
  };

  const filterData = () => {
    if(filterOptions["num"] === 0){
      return;
    }

    setData(data.filter((item: any) => {
      for (let i = 0; i < item.authorships.length; i++) {
        return filterOptions[item.authorships[i].author.display_name];
      }
    }));
  };

  


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const useStyles = createStyles((theme) => ({
    label: {
      top: 0,
      height: rem(28),
      lineHeight: rem(28),
      width: rem(34),
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 700,
      backgroundColor: 'transparent',
    },
  
    thumb: {
      backgroundColor: theme.colors[theme.primaryColor][6],
      height: rem(28),
      width: rem(34),
      border: 'none',
    },
  
    dragging: {
      transform: 'translate(-50%, -50%)',
    },
  }));

  let now = new Date().getFullYear();
  async function getArticle() {
    const response = await fetch(`https://api.openalex.org/works?search=${searchValue}`);
    const result = await response.json();
    console.log(result);

    setData(result.results);
    let authorsA: any[] = [];
    let lowestYear = now;
    let highestYear = 0;
    if (result.results.length > 0){
 
    for (let i = 0; i < result.results.length; i++) {
      lowestYear = Math.min(lowestYear, result.results[i].publication_year);
      highestYear = Math.max(highestYear, result.results[i].publication_year);
      for (let j = 0; j < result.results[i].authorships.length; j++) {
        authorsA.push(result.results[i].authorships[j].author.display_name);
      }
    }
  }
  else{
    lowestYear = 1800
    highestYear =  now

  }

    setYears([lowestYear, highestYear])
    setAuthors(Array.from(new Set(authorsA)))
    console.log(authorsA); 

    let obj = {};
    for (let i = 0; i < authorsA.length; i++) {
      obj={
        ...obj,
        [authorsA[i]]: false
      }
    }
    obj={
      ...obj,
      ["num"]: 0,
      ["lowestYear"]: lowestYear,
      ["highestYear"]: highestYear
    }
    setFilterOptions(obj);
    filterData();

};

  useEffect(() => {

    getArticle();
    }, []);

 
  
  type i ={
    id: Key,
    title: string,
    authorships: Array<Object>,
    abstract: string
  }

  const getAuthor = (item: i) => {

  };

  const { classes } = useStyles();
  return (
    <Container size="lg" style={{  marginTop: '6rem' }}>
      <Grid  gutter={8} gutterXs="md" gutterMd="xl" gutterXl={50}>
      <Grid.Col span={3}>
         <div>
          <Paper shadow="xs" >
            <Text ta="center" fw={500} td="underline" size="med" weight={600} style={{ marginBottom: '0.5rem' }}>
              Filter
            </Text>
            <Text size="sm" ta="center" weight={600} style={{ margin: '1rem auto 0.5rem auto' }}>
              Author
            </Text>
            <Group position="center" spacing="sm">
            <div style={{ maxHeight: '400px', overflowY: "scroll", margin: '0.5rem auto' }}>
              {authors.length > 0 ? (
              authors.map((author : any, i) => (
                <Checkbox
                label={author}
                checked={filterOptions[author] || false}
                onChange={handleFilterChange}
                name={author}
                key={author}
              />
              ))) : (
                  <Text>No results found</Text>
                )}
                </div>
              <Text size="sm" weight={600} ta="center" style={{ margin: '1rem auto 0.7rem auto' }}>
              Publication date
            </Text>
            
            </Group>
            <RangeSlider onChangeEnd={handleYearChange} labelAlwaysOn defaultValue={[1800,2023]}  min={years[0]} max={years[1]} classNames={classes} style={{ margin: 'auto 0.5rem' }}/>
          </Paper>
        </div>
        </Grid.Col>
      <Grid.Col span={8}>
        <form onSubmit={handleSearchSubmit}>
          <TextInput
            placeholder="Search"
            value={searchValue}
            onChange={handleSearchChange}
            style={{ marginBottom: '3rem' }}
          />
        </form>
        <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
          {currentItems.length > 0 ? 
          (
            currentItems.filter((item: any) => {
              if (filterOptions["num"] === 0){
                return true;
              }
              for (let i = 0; i < item.authorships.length; i++) {
                if (filterOptions[item.authorships[i].author.display_name]) {
                  return true;
                }
              }
            }).filter((item: any) => {
              if (item.publication_year >= filterOptions["lowestYear"] && item.publication_year <= filterOptions["highestYear"]){
                return true;
              }
            })
            .map((item: i, i: any) => (
              <Card key={i} shadow="xs" style={{ marginBottom: '2rem' }} >
                <Text size="lg" weight={600}>
                  {item.title}
                </Text>
                <Text size="sm" style={{ marginBottom: '0.5rem' }}>
                  {/* {item.authorships.join(', ')} */}
                  {/* {console.log(item.authorships)} */}
                  {item.authorships.map((author: any) => (
                    <span key={author.id}>{author.author.display_name}, </span>
                  ))}
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
        </Grid.Col>
  
        </Grid>
    </Container>
  );
}

