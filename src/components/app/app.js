import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';

export default class App extends Component {
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
        const randomChar = randomCharView ? <RandomChar/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <> 
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
                    <CharacterPage/>
                    <CharacterPage/>
                    <CharacterPage/>
                </Container>
            </>
        );
    }
};
