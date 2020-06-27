import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from './_helpers/history';
import { authenticationService } from './services/authentication.service';
import LoginPage from './components/login-component';
import TodoComponent from './components/todo-component';
import { Container, Row, Col, Navbar } from "react-bootstrap";

class App extends Component {
    
    state = { currentUser: null, isAdmin: false };

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({
            currentUser: x
        }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser } = this.state;
        return (
            <Router history={history}>
                <div>
                    {currentUser &&
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand>Home</Navbar.Brand>
                            <Navbar.Toggle />
                                <Navbar.Collapse className="justify-content-end">
                                <Navbar.Text>
                                <a style={{cursor:'Pointer'}} onClick={this.logout} className="nav-item nav-link">Logout</a>
                                </Navbar.Text>
                        </Navbar.Collapse>
                    </Navbar>
                    }
                    <div  style={{backgroundColor:'#ffffff'}} className="jumbotron">
                        <Container>
                            <Row className="row" style={{justifyContent:'center'}}>
                                <Col xs={8} md={6}>
                                    <Route path="/" exact component={LoginPage} />
                                    <Route path="/todoList" component={() => <TodoComponent user={currentUser} />} />
                                    <Route path="/login" component={LoginPage} />
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;