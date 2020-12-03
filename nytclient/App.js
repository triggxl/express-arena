//CLIENT
// start a new React project named nytclient. For this client application, we will only create 2 components, the App component will contain a form to capture user input and the Book component will display the details of a book.
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: '',
      search: '',
      sort: '',
      error: null
    }
  }
  updateSearch(search) {
    this.setState(search)
  }
  updateSort(sort) {
    this.setState(sort)
  }
  handleSubmit(e) {
    e.preventDefault();
    const baseUrl = 'http://localhost:8000/books';
    const params = [];
    if(this.state.search) {
      params.push(`search=${this.state.search}`);
    }
    if(this.state.sort) {
      params.push(`sort=${this.state.sort}`);
    }
    const query = params.join('&');
    const url = `${baseUrl}?${query}`;

    fetch(url).then(res => {
      if(!res.ok) {
        throw new Error(res.status.text);
      }
      return res.json();
    }).then(data => {
      this.setState({
        books: data,
        error: null
      }).catch(err => {
        this.setState({
          error: 'Sorry, could not get any books at this time'
        })
      })

    })
  }
  render() {
    // map over all books
    const books = this.state.books.map((b, _i) => <Book {...b} key={i}/>)
    return (
      <>
      {/* form with onChange listeners to components for updating the state as user selects values */}
        <div class="App">
          <h1>NYT Best Sellers</h1>
          <div className="search">
            <form>
              <label htmlFor="search">Search: </label>
              <input
              type="text"
              id="search"
              name="search"
              value={this.state.search}
              onChange={e => this.updateSearch(e.target.value)}></input>
              
              <label htmlFor="sort">Sort: </label>
              <select id="sort" name="sort" onChange={e => this.updateSort(e.target.value)}>
                <option value="">None</option>
                <option value="title">Title</option>
                <option value="rank">Rank</option>
              </select>
              <button></button>
            </form>
            <div className="App-error">{this.state.error}</div>
          </div>
          {books}
        </div>
      </>
    )
  }
}

export default App;

/*
Instructions:

1.) Open your command line or terminal
2.) cd to your thinkful projects directory
3.) Run npx create-react-app react-playground to create a new folder called react-playground with a React app inside
4.) cd ./react-playground to go into the new directory
5.) Run npm install to install all the dependencies we need
6.) Run the following commands to remove the following files from this directory:
rm ./src/serviceWorker.js
rm ./src/App.css
rm ./src/logo.svg
7.) Update the content of ./src/App.js and ./src/index.js as follows to create a minimal starting point for the application
//App
import React from 'react';

function App() {
  return (
    <main className='App'>
      content goes here
      </main>
      );
    }
    
    export default App;
//index
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));

*/