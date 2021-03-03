import Head from 'next/head';
import styles from '../styles/Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container,Row,Col,Card } from 'react-bootstrap';
import Date from '../lib/date';
import {getNewsData} from '../lib/data';
import { faRss } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

export default function Home(props) {

  const [page, setPage] = useState(1);
  const [news, setNews] = useState([]);
 
  useEffect(()=>{
     if(page> 1){
      document.addEventListener('scroll', handleScroll);
      getNewsData(`http://80.240.21.204:1337/news?skip=${page}&limit=10`)
      .then(res=>{
        let newArray = [...news, ...res];
         setNews(newArray);
      });
    
     }

    }
  ,[page]);

  useEffect(()=>{
    if(page===1){
      document.addEventListener('scroll', handleScroll);
        getNewsData(`http://80.240.21.204:1337/news?skip=${page}&limit=10`).then(res =>{
        setNews(res);
      });
    }
  },[]);

  const NewsCard = () =>{
    return(
        news.map((item)=>
              <Card key={item._id+Math.random()} className={styles.card} style={{ width: '18rem' }}>
                {
                  item
                  ?<Card.Body className={styles.cardBody}>
                  <FontAwesomeIcon className={styles.rss} color="teal" icon={faRss} ></FontAwesomeIcon>
                      <div className={styles.cardHead}>
                        <img  alt='Image'
                        src={item.source.url}>
                        </img>
                        <Card.Title style={{marginLeft:'20px'}}>{item.source.title}</Card.Title>
                      </div>
                      
                    <Card.Text className={styles.title}>
                       {item.title}
                    </Card.Text>
                    <Card.Text className={styles.date}>
                     {Date(item.created_at)}
                    </Card.Text>
                    {
                      item.keywords.length > 0 
                      ? <hr />
                      :null
                    }
    
                    <div className={styles.keywords}>
                          {
                              item.keywords.map(keyword=>
                                <Card.Text style={{marginLeft:'2px'}} key={keyword._id+Math.random()}>{keyword.name}</Card.Text>
                              )
                          }
                    </div>
                   
                  </Card.Body>
                  :null
                }
              
            </Card>
        )
      
    )
  }

  function isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  const handleScroll = () =>{
     const wrappedElement = document.getElementById('newsCol');
     if (isBottom(wrappedElement)) {
       setPage(page+1);
       document.removeEventListener('scroll', handleScroll);
     }
  }

  return (
    <div className={styles.container}  >
     
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container  className={styles.container} fluid >

      <Row className={styles.row}  >
        <Col md={2} className={styles.fixed}>           
        </Col>

        <Col sm={12} md={8} className={styles.newsCol} id='newsCol' onScroll={handleScroll}>
             
              {
                news.length > 0
                ?<NewsCard />
                :null
              }
             
        </Col>

        <Col md={2} className={styles.fixed}>  
        </Col>
      </Row>

      </Container>
    
      
    </div>
  );
}
