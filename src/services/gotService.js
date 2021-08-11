
export default class GotService {
  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api';
  }

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);
  
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, 
      status: ${res.status}`);
    }
  
    return await res.json();
  }

  getAllCharacters = async () => {
    const res = await this.getResource(`/characters?page=5&pageSize=10`);
    return res.map((item) => this._transformCharacter(item));
  }

  getCharacter = async (id) => {
    const char = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(char);
  }

  getAllBooks = async () => {
    const res = await this.getResource(`/books`);
    return res.map((item) => this._transformBook(item));
  }

  getBook = async (id) => {
    const char = await this.getResource(`/books/${id}`);
    return this._transformBook(char);
  }

  getAllHouses = async () => {
    const res = await this.getResource(`/houses`);
    return res.map((item) => this._transformHouse(item));
  }

  getHouse = async (id) => {
    const char = await this.getResource(`/houses/${id}`);
    return this._transformHouse(char);
  }

  isSet(data) {
    const res = data ? data : 'no info';
    return res;
  }

  _extractId = (item) => {
    const idRegExp = /\/([0-9]*)$/;
    return item.url.match(idRegExp)[1];
  }

  _transformCharacter(char) {
    return {
      // name: char.name || 'no info',
      name: this.isSet(char.name),
      gender: this.isSet(char.gender),
      born: this.isSet(char.born),
      died: this.isSet(char.died),
      culture: this.isSet(char.culture),
      // charId: +char.url.replace(`${this._apiBase}/characters/`, '') || 12
      id: this._extractId(char)
    }
  }

  _transformHouse(house) {
    return {
      name: this.isSet(house.name),
      region: this.isSet(house.region),
      words: this.isSet(house.words),
      titles: this.isSet(house.titles),
      overlord: this.isSet(house.overlord),
      ancestralWeapons: house.ancestralWeapons,
      id: this._extractId(house)
    }
  }

  _transformBook(book) {
    return {
      name: this.isSet(book.name),
      numberOfPages: this.isSet(book.numberOfPages),
      publisher: this.isSet(book.publisher),
      released: this.isSet(book.released),
      id: this._extractId(book)
    }
  }
}
