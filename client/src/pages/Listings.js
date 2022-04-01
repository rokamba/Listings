import React, {Component} from 'react'
import './Listings.css'
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import List from '../components/Listings/List';
import Authentication from '../context/authentication'

class Listings extends Component {

  state ={
    creating: false,
    listing: [],
    selectedListing: null
  };
  static contextType = Authentication

  constructor(props){
    super(props);
    this.titleElRef = React.createRef();
    this.priceElRef =React.createRef();
    this.dateElRef = React.createRef();
    this.descriptionElRef =React.createRef();
  };

  componentDidMount() {
    this.fetchListings();
  }

  createListingHandler = () =>{
    this.setState({creating:true, selectedListing: null});
  };

  modalConfirmHandler =() =>{
    this.setState({creating:false});
    const title = this.titleElRef.current.value;
    const price = +this.priceElRef.current.value;
    const date = this.dateElRef.current.value;
    const description = this.descriptionElRef.current.value;

    // if (
    //   title.length === 0 ||
    //   price <= 0 ||
    //   date.length === 0 ||
    //   description.length === 0
    // ) {
    //   return;
    // }

    const list = {title, price, date, description};

    console.log(list);

     const requestBody = {
        query: `
          mutation {
            createListing(listingInput: {title: "${title}", description: "${description}", price: ${price}, date: "${date}"}) {
              _id
              title
              description
              date
              price
              
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
         'Authorization': 'Bearer ' + token
       }

     }).then(res =>{
      if (res.status !== 200 && res.status !== 201){
        throw new Error('Failed!');
      }
      return res.json(); 
    })
    .then(resData =>{
      this.setState(prevState => {
        const updatedListings = [...prevState.listing];
        updatedListings.push({
          _id: resData.data.createListing._id,
          title: resData.data.createListing.title,
          description: resData.createListing.description,
          date: resData.data.createListing.date,
          price: resData.data.createListing.price,
          creator: {
            _id: this.context.userId
          }
        });
        return { listing: updatedListings };
      });
      
    })
    .catch(err =>{
      console.log(err)
    });

  };



  
  modalCancelHandler =() =>{
    this.setState({creating:false, selectedListing: null});
  };

  fetchListings(){
    const requestBody = {
      query: `
        query {
          listing {
            _id
            title
            description
            date
            price
            creator {
              _id
              email
            }
          }
        }
      `
    };

    

   fetch('http://localhost:3001/graphql',{
     method: 'POST',
     body:JSON.stringify(requestBody),
     headers:{
       'Content-Type': 'application/json',
       
     }

   }).then(res =>{
    if (res.status !== 200 && res.status !== 201){
      throw new Error('Failed!');
    }
    return res.json(); 
  })
  .then(resData =>{
    const listing = resData.data.listing;
    this.setState({listing:listing})
    console.log(resData)
    
  })
  .catch(err =>{
    console.log(err)
  });

  }

  showDetailHandler = eventId => {
    this.setState(prevState => {
      const selectedListing = prevState.listing.find(e => e._id === eventId);
      return { selectedListing: selectedListing };
    });
  };

  bookListingHandler = () => {};

  render(){
  return (
    <React.Fragment>
      {(this.state.creating || this.state.selectedListing) && <Backdrop/>}
      {this.state.creating && (
      <Modal title ="Add services" canCancel canConfirm onCancel={this.modalCancelHandler} onConfirm={this.modalConfirmHandler} confirmText="Confirm">
        <form>
          <div className='form'>
            <label htmlFor='title'>Title</label>
            <input type ='text' id = 'title' ref={this.titleElRef}></input>
          </div>
          <div className='form'>
            <label htmlFor='price'>Price</label>
            <input type='number' id = 'price' ref={this.priceElRef}></input>
          </div>
          <div className='form'>
            <label htmlFor='date'>Date</label>
            <input type ='date' id = 'date' ref={this.dateElRef}></input>
            </div>

            <div className='form'>
            <label htmlFor='Description'>Description</label>
            <textarea id='description' rows= '4' ref={this.descriptionElRef}></textarea>
          </div>
        </form> 
      </Modal >)}

      {this.state.selectedListing && (
          <Modal
            title={this.state.selectedListing.title}
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.bookListingHandler}
            confirmText="Book"
          >
            <h1>{this.state.selectedListing.title}</h1>
            <h2>
              ${this.state.selectedListing.price} -{' '}
              {this.state.selectedListing.date}
            </h2>
            <p>{this.state.selectedListing.description}</p>
          </Modal>
        )}


      {this.context.token &&(<div className='listing-control'>
      <p>Add services</p>
      <button className='.btn' onClick={this.createListingHandler}>Create Service</button>
    </div>)}
      
      <List events ={this.state.listing}
      authUserId={this.context.userId}
      onViewDetail={this.showDetailHandler}
      />
      
    </React.Fragment>
  )
};
}
 export default Listings