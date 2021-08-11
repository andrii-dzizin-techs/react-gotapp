import React, {Component} from 'react';
import ItemList from '../../itemList';
import ErrorMessage from '../../errorMessage';
import GotService from '../../../services/gotService';
import {withRouter} from 'react-router-dom';

class BookPage extends Component {
  gotService = new GotService();
  state = {
    error: false
  }

  onItemSelected = (id) => {
      this.setState({
          selectedBook: id
      })
  }

  componentDidCatch() {
    this.setState({
      error: true
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage/>
    }

    return (
      <ItemList
        onItemSelected={(itemId) => {
          this.props.history.push(itemId);
        }}
        getData={this.gotService.getAllBooks}
        renderItem={({name, released}) => `${name} (${released})`} />
    )
  }
}

export default withRouter(BookPage);
