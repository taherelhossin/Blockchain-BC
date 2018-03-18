import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ratingContract } from "./EthereumSetup";
import { ShowMovies } from "./ShowMovies";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [{ name: 'El-3ar', rating: 0 }, { name: 'El-Keef', rating: 0 }, { name: 'Inception', rating: 0 }],
      numberOfToBuyTokens: ''
    }
    this.handleVoting = this.handleVoting.bind(this)
    this.buyTokens = this.buyTokens.bind(this)
    this.renderBalance = this.renderBalance.bind(this)
    this.displayBalanceOf = this.displayBalanceOf.bind(this)
    this.refreshVotes = this.refreshVotes.bind(this)
  }

  handleVoting(movie) {
    ratingContract.voteForMovie(movie, (error, res) => {
      let votes = ratingContract.totalVotesFor(movie, (error, res) => {
        alert("result")
        this.setState({
          movies: this.state.movies.map(
            (el) => el.name === movie ? Object.assign({}, el, { rating: res.toNumber() }) : el

          )
        });
      })
    })


  }

  buyTokens(e) {
    ratingContract.buyTokens({ value: 1000, gas: 300000 }, (error, res) => {
      alert("Cogratulation");
    });
    /* ratingContract.buyToken({amount:this.state.numberOfToBuyTokens},(error,res)=>{
       alert("Cogratulation");*/


  }
  renderBuyTokens() {
    return (<div>
      <button onClick={this.buyTokens}>Buy tokens</button>
    </div>)
  }
  renderRefreshVotes = () => {
    return (<div>
      <button onClick={this.refreshVotes}>Refresh Votes</button>
    </div>)
  }


  displayBalanceOf(e) {
    var add = window.web3.eth.accounts[0];
    //alert(add);

    ratingContract.balanceOf((add), (error, res) => {
      alert(res);
    });

  }
  renderBalance() {
    return (<div>
      {/* <input onChange = {(e) =>this.setState({address: e.target.value})}/> */}
      <button onClick={this.displayBalanceOf}>Get balance</button>
    </div>)
  }

   refreshVotes(e) {
   let temAraa = this.state.movies.concat();
   temAraa.forEach((i)=>{
      let votes = ratingContract.totalVotesFor(i.name, (error, res) => {
       // alert("result");
        this.setState({
          movies: this.state.movies.map(
            (el) => el.name === i.name ? Object.assign({}, el, { rating: res.toNumber() }) : el
  
          )
        });
      });
    });
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Ethereum</h1>
        </header>
        <p className="App-intro">
          Movie Rating Application in Ethereum and React
        </p>
        <div className="movie-table">
          <ShowMovies movies={this.state.movies} vote={this.handleVoting} />
        </div>
        {this.renderBuyTokens()}
        {this.renderBalance()}
        {this.renderRefreshVotes()}
      </div>
    );
  }
}

export default App;