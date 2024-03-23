import React from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
function Home() {
  return (
    <div className=' home' style={{height:'100vh'}}>
       <Header />
      <div className='container home'>
        <h1 className='text-center'>Lorem, ipsum dolor.</h1>
        <div className='mt-5 mb-5'>
          <Row>
            <Col lg={6} md={6}>
              <div>
                <Link to={'/event'} style={{textDecoration:'none'}}>
                <Card className='btn btn-warning d-flex justify-content-center shadow align-items-center' style={{ width: '100%', height: '20rem', }}>
                  <div>
                    <Card.Body>
                      <Card.Title>Upload Your Content,& Get a chance To win</Card.Title>
                      <Card.Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus quod pariatur debitis magnam quidem aspernatur ducimus quis dicta laborum sit.
                      </Card.Text>
                    </Card.Body>
                  </div>
                </Card>
                </Link>
              </div>
            </Col>
            <Col lg={6} md={6}>
            </Col>


          </Row>
        </div>
      </div>
    </div>
  )
}

export default Home