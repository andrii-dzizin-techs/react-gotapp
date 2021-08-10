
export default class GotService {
  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api';
  }

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);
  
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, 
      status: ${res.status}`);
    }
  
    return await res.json();
  }

  async getAllCharacters() {
    const res = await this.getResource(`/characters?page=5&pageSize=10`);
    return res.map((item) => this._transformCharacter(item));
  }

  async getCharacter(id) {
    const char = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(char);
  }

  async getAllBooks() {
    const res = await this.getResource(`/books`);
    return res.map((item) => this._transformBook(item));
  }

  async getBook(id) {
    const char = await this.getResource(`/books/${id}`);
    return this._transformBook(char);
  }

  async getAllHouses() {
    const res = await this.getResource(`/houses`);
    return res.map((item) => this._transformHouse(item));
  }

  async getHouse(id) {
    const char = await this.getResource(`/houses/${id}`);
    return this._transformHouse(char);
  }

  _transformCharacter(char) {
    return {
      name: char.name || 'no info',
      gender: char.gender || 'no info',
      born: char.born || 'no info',
      died: char.died || 'no info',
      culture: char.culture || 'no info',
      charId: +char.url.replace(`${this._apiBase}/characters/`, '') || 12
    }
  }

  _transformHouse(house) {
    return {
      name: house.name || 'no info',
      region: house.region || 'no info',
      words: house.words || 'no info',
      titles: house.titles || 'no info',
      overlord: house.overlord || 'no info',
      ancestralWeapons: house.ancestralWeapons || 'no info'
    }
  }

  _transformBook(book) {
    return {
      name: book.name || 'no info',
      numberOfPages: book.numberOfPages || 'no info',
      publiser: book.publiser || 'no info',
      released: book.released || 'no info'
    }
  }
}
