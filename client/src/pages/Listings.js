import React, {Component} from 'react'
import './Listings.css'
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';

class Listings extends Component {

  state ={
    creating: false
  };

  createListingHandler = () =>{
    this.setState({creating:true});
  };

  modalConfirmHandler =() =>{
    this.setState({creating:false});

  };
  modalCancelHandler =() =>{
    this.setState({creating:false});
  };

  render(){
  return (
    <React.Fragment>
      {this.state.creating && <Backdrop/>}
      {this.state.creating &&<Modal title ="Add services" canCancel canConfirm onCancel={this.modalCancelHandler} onConfirm={this.modalConfirmHandler}>
        <p>content</p>
      </Modal >}
      <div className='listing-control'>
      <p>Add services</p>
      <button className='.btn' onClick={this.createListingHandler}>Create Service</button>
    </div>
      
    </React.Fragment>
  )
};
}
 export default Listings