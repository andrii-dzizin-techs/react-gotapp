import React, {Component} from 'react';
import ItemList from '../../components/itemList';
import ItemDetails, {Field} from '../../components/itemDetails';
import ErrorMessage from '../../components/errorMessage';
import GotService from '../../services/gotService';
import RowBlock from '../../components/rowBlock';

export default class CharacterPage extends Component {
  gotService = new GotService();
  state = {
    // selectedChar: Math.floor(Math.random()*140 + 25),
    selectedChar: null,
    error: false
  }

  onItemSelected = (id) => {
      this.setState({
          selectedChar: id
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
        getData={this.gotService.getAllCharacters}
        renderItem={({name, gender}) => `${name} (${gender})`} />
    );
    const itemDetails = (
      <ItemDetails 
        itemId={this.state.selectedChar}
        getData={this.gotService.getCharacter}
      >
        <Field field='gender' label='Gender' />
        <Field field='born' label='Born' />
        <Field field='died' label='Died' />
        <Field field='culture' label='Culture' />
      </ItemDetails>
    );

    return (
      <RowBlock left={itemList} right={itemDetails}/>
    )
  }
}