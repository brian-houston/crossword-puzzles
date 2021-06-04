import React, { useContext, useEffect, useState } from 'react';
import {Button, Container, Jumbotron, Row, Col, Spinner} from 'react-bootstrap'
import db from "../firebase/Firestore";
import { AuthContext } from "../firebase/AuthContext";
import { Link } from 'react-router-dom';
import CrosswordCard from './CrosswordCard';


function Home(props) {
    const [savedCrosswords, setSavedCrosswords] = useState(null);
    const {user} = useContext(AuthContext); 

    useEffect( () => {
        async function fetchCrosswords() {
            if (!!user) {
                let cws = await db.collection("users").doc(user.uid).get();
                setSavedCrosswords(cws.data());
            }
        }
        
        fetchCrosswords();
        
    }, [user]);

    let cwKeys = savedCrosswords ? Object.keys(savedCrosswords) : [];
    cwKeys.sort((a, b) => {
        if (savedCrosswords[a].timeSaved > savedCrosswords[b].timeSaved) {
            return -1;
        } else if (savedCrosswords[a].timeSaved < savedCrosswords[b].timeSaved) {
            return 1;
        } else {
            return 0;
        }
    });

    let cwCards = cwKeys.map((key, i) => {
        return (
            <Col className='col-3' key={key}>
                <CrosswordCard
                    date={key}
                    title={savedCrosswords[key].title}
                    timeSaved={savedCrosswords[key].timeSaved}
                    initialLetters={savedCrosswords[key].letters}
                    initialCorrectness={savedCrosswords[key].correctness}
                ></CrosswordCard>
            </Col>
        )
    })

    return (
        <>
        <Container>
            <Jumbotron className='mt-5 text-center'>
                <h1 className='mb-4'>Random Crossword Puzzle</h1>
                <p>
                    <Link 
                        to={{
                            pathname: "/play",
                            date: 'random'
                          }}
                    >
                        <Button variant="primary">Play Now</Button>
                    </Link>
                </p>
            </Jumbotron>
        </Container>
        <Container>
            <Row>
                {savedCrosswords !== null ? cwCards : (
                    <Col className='d-flex'>
                        <Spinner animation="border" variant='primary' className='m-auto d-block'></Spinner>
                    </Col>
                )}
            </Row>
        </Container>
        </>
    );
}

export default Home;