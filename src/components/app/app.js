import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import styled from 'styled-components';
import Header from '../header';
// import RandomChar from '../randomChar';
import RandomChar from '../randomChar/randomChar_old';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../pages/characterPage';
import BookPage from '../pages/bookPage';
import BookItem from '../pages/bookItem';
import HousePage from '../pages/housePage';
import GotService from '../../services/gotService';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NotFound from '../notFound';

const AppBlock = styled.div`
    background: blue url('/img/got.jpeg') center center no-repeat;
    background-size: cover;
    height: 1000px;
    .toggle-btn {
        padding: 12px;
        background-color: #1e2edb;
        border: none;
        border-radius: 4px;
        color: #fff;
        margin-bottom: 40px;
        outline: none;
        box-shadow: 0px 0px 30px rgba(256,256,256,.1);
        cursor: pointer;
    }
    .toggle-btn:focus {
        outline: none;
    }
`;

export default class App extends Component {
    gotService = new GotService();
    state = {
        randomCharView: true,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    onCharToggle = () => {
        this.setState({
            randomCharView: !this.state.randomCharView
        })
    }

    render() {
        const {randomCharView} = this.state;
        const randomChar = randomCharView ? <RandomChar interval={15000}/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <Router>
                <AppBlock> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {randomChar}
                                <button 
                                    className="btn btn-dark mb-3"
                                    onClick={this.onCharToggle}
                                >
                                    Toggle character
                                </button>
                            </Col>
                        </Row>
                        <Switch>
                            <Route path='/' exact component={() => (
                                <div className="card">
                                    <div className="card-body">
                                        Welcome to GOT DB
                                    </div>
                                </div>
                            )} />
                            <Route path='/characters' component={CharacterPage} />
                            <Route path='/houses' component={HousePage} />
                            <Route path='/books' exact component={BookPage} />
                            <Route path='/books/:id' render={
                                ({match}) => {
                                    const {id} = match.params;
                                    return <BookItem bookId={id} />
                                }
                            } />
                            <Route path='/*' exact component={NotFound} />
                        </Switch>
                    </Container>
                </AppBlock>
            </Router>
        );
    }
};
