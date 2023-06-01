import {
    createStyles,
    Paper,
    Title,
    Text,
    TextInput,
    Button,
    Container,
    Group,
    Anchor,
    Center,
    Box,
    rem,
  } from '@mantine/core';
  import { IconArrowLeft } from '@tabler/icons-react';
  import { useRef } from 'react';
  
  const useStyles = createStyles((theme) => ({
    title: {
      fontSize: rem(60),
      fontWeight: 900,
      fontFamily: `Pluto, ${theme.fontFamily}`,
    },
  
    controls: {
      [theme.fn.smallerThan('xs')]: {
        flexDirection: 'column-reverse',
      },
    },
  
    control: {
      [theme.fn.smallerThan('xs')]: {
        width: '100%',
        textAlign: 'center',
      },
    },
  }));

  export default function Home() {
    const { classes } = useStyles();
    const articleName = useRef<HTMLInputElement>(null);
    const handleButtonClick = () => {
        // alert(`Input value: ${articleName.current?.value}`);
        async function getArticle() {
            const response = await fetch(`https://api.openalex.org/works?search=${articleName.current?.value}`);
            const data = await response.json();
            console.log(data);
        };
        getArticle();
        console.log(articleName.current?.value);
        
      };

  
    return (
      <Container size={700} my={30} style={{marginTop: '200px'}}>
        <Title  order={3} size="3.7rem" className={classes.title} align="center">
          Article Search
        </Title>
  
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <TextInput ref={articleName} label="" placeholder="Search Article Here" required />
          <Group position="center" mt="lg" className={classes.controls}>
            <Button className={classes.control} onClick={handleButtonClick}>Search</Button>
          </Group>
        </Paper>
      </Container>
    );
  }
  