import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      songs: [],
      library: [],
      user: {}
    };
  }

  componentDidMount() {
    const queryParams = new URLSearchParams(window.location.search);
    let token = queryParams.get('token');

    if (token == null) {
      token = localStorage.getItem("sessiontoken");
    } else {
      localStorage.setItem('sessiontoken',token);
    }

    fetch("http://localhost:8080/api/songs")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            songs: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

    fetch("http://localhost:8080/api/authcheck?token=" + token)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          if (!result) {
            window.location.replace("http://localhost:8080/auth/google");
          }

          this.setState({
            user: result
          });

          this.getLibrary(result.id);

        },
        (error) => {
          console.log(error);
        }
      )
  }

  getLibrary(userId) {
    fetch("http://localhost:8080/api/library?user_id=" + userId)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          library: result
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
  }

  addToCart(song) {
    if (this.state.cart.some(e => e.id === song.id)) {
      alert(`${song.songName} already exists in your cart!`);
      return;
    }
    this.state.cart.push(song);
    this.setState({
      cart: this.state.cart
    });
  }

  checkout() {
    fetch('http://localhost:8080/api/checkout', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ user_id: this.state.user.id, song_ids: this.state.cart.map(s => s.id)})
     })
     .then(res => res.json())
     .then(
       (result) => {
        this.getLibrary(this.state.user.id);
        this.setState({cart: []});
       },
       (error) => {
         console.log(error);
       }
     );;

     
  }

  render() {
    const { error, isLoaded, songs, cart, library, user } = this.state;
    return (
      <div>
        <h2>Dotty MP3 Store</h2>
        <h3>Welcome {user.name}</h3>
        <ul>
          {songs.map(item => (
            <li key={item.id}>
              {item.songName} - {item.artist} <button onClick={() => this.addToCart(item)}>+ Cart</button>
            </li>
          ))}
        </ul>
        <h2>Your Shopping Cart</h2>
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              {item.songName} - {item.artist} <button onClick={() => this.removeCart(item)}>Remove</button>
            </li>
          ))}
        </ul>
        <button onClick={() => this.checkout()}>Checkout</button>
        <h2>Your Song Library</h2>
        <ul>
          {library.map(item => (
            <li key={item.id}>
              {item.songName} - {item.artist} <button onClick={() => this.addToCart(item)}>+ Cart</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

}

export default App;
