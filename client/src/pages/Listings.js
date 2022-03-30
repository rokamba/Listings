import React, {Component} from 'react'
import './Listings.css'
import Authentication from '../context/authentication';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';

class Listings extends Component {

  state ={
    creating: false,
    listings: []
  };

  static contextType = Authentication;

  constructor (props) {
    super(props);
    this.titleElRef = React.createRef();
    this.priceElRef = React.createRef();
    this.descriptionElRef = React.createRef();
  }

 componentDidMount() {
   this.fetchListing();
 }

  createListingHandler = () =>{
    this.setState({creating:true});
  };

  modalConfirmHandler =() =>{
    this.setState({creating:false});
    const title = this.titleElRef.current.value;
    const price = +this.priceElRef.current.value;
    const description = this.descriptionElRef.current.value;

    if (title.trim().length === 0 || price <= 0 || description.trim().length === 0)
    {
    return;
    }

    const listing = {title, price, description};
    console.log(listing);

    const requestBody = {
        query: `
          mutation {
            createListing(listingInput: {title: "${title}", description: "${description}", price: ${price}} ) {
              _id
              title
              description
              price
              creator {
                _id
                email
              }
            }
          }
        `
      };

      const token = this.context.token;

     fetch('http://localhost:3001/graphql',{
       method: 'POST',
       body:JSON.stringify(requestBody),
       headers:{
         'Content-Type': 'application/json',
         'Authorization': 'Bearer' + token
       }

     }).then(res =>{
      if (res.status !== 200 && res.status !== 201){
        throw new Error('Failed!');
      }
      return res.json(); 
    })
    .then(resData =>{
      this.fetchListing();
    })
    
    .catch(err =>{
      console.log(err)
    });

  };
  modalCancelHandler =() =>{
    this.setState({creating:false});
  };

  fetchListing() {
    const requestBody = {
      query: `
          query {
            listing {
              _id
              title
              description
              price
              creator {
                _id
                email
              }
            }
          }
        `
    };

    fetch('http://localhost:3001/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const listings = resData.data.listings;
        this.setState({ listings: listings });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const list = this.state.listings.map(listing =>  {
      return (<li key = {listing._id} className='listings-li'>{listing.title}</li>);
    });

  return (
    <React.Fragment>
      {this.state.creating && <Backdrop/>}
      {this.state.creating &&<Modal title ="Add services" canCancel canConfirm onCancel={this.modalCancelHandler} onConfirm={this.modalConfirmHandler}>
        <form>
          <div className='form-control'>
            <label htmlFor='title'>Title</label>
            <input type='text' id = 'title' ref={this.titleElRef}></input>
          </div>
          <div className='form-control'>
            <label htmlFor='price'>Price</label>
            <input type='number' id = 'price'ref={this.priceElRef}></input>
          </div>
          <div className='form-control'>
            <label htmlFor='description'>Description</label>
            <textarea id='description' rows='5' ref={this.descriptionElRef}></textarea>
          </div>
        </form>
      </Modal >}
      {this.context.token && (<div className='listing-control'>
      <p>Add services</p>
      <button className='.btn' onClick={this.createListingHandler}>Create Service</button>
    </div>)}
    <ul className='listings-list'>{list}
    </ul>
    </React.Fragment>
  )
};
}
 export default Listings;