import React, {Component} from 'react';
import ItemList from '../../components/itemList';
import ItemDetails, {Field} from '../../components/itemDetails';
import ErrorMessage from '../../components/errorMessage';
import GotService from '../../services/gotService';
import RowBlock from '../../components/rowBlock';

export default class BookPage extends Component {
  gotService = new GotService();
  state = {
    selectedBook: null,
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

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllBooks}
        renderItem={({name, released}) => `${name} (${released})`} />
    );
    const itemDetails = (
      <ItemDetails 
        itemId={this.state.selectedBook}
        getData={this.gotService.getBook}
      >
        <Field field='numberOfPages' label='Number of pages' />
        <Field field='publiser' label='Publiser' />
        <Field field='released' label='Released' />
      </ItemDetails>
    );

    return (
      <RowBlock left={itemList} right={itemDetails}/>
    )
  }
}