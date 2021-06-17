// import React from 'react';
// import ReactDOM from 'react-dom';
// import Modal from 'react-modal';

// export default class PopupModal extends React.Component {
//   constructor(props){
//     super(props);
//     // parse collapsed status from props
//     this.state = {
//       modalIsOpen: false,
//       setIsOpen: false
//     };
//     this.openModal = this.openModal.bind(this);
//     this.afterOpenModal = this.afterOpenModal.bind(this);
//     this.closeModal = this.closeModal.bind(this);
//   }

//   openModal() {
//     this.setState(state => ({
//       setIsOpen: true
//     }));
//   }
 
//   afterOpenModal() {
//     // any text chaging goes in here

//   }
 
//   closeModal(){
//     this.setState(state => ({
//       setIsOpen: false
//     }));
//   }

//   render(){
//     const customStyles = {
//       content : {
//         top                   : '50%',
//         left                  : '50%',
//         right                 : 'auto',
//         bottom                : 'auto',
//         marginRight           : '-50%',
//         transform             : 'translate(-50%, -50%)'
//       }
//     };
     
//     return (
//       <div>
//         <button onClick={this.openModal}>Open Modal</button>
//         <Modal
//           isOpen={this.state.setIsOpen}
//           onAfterOpen={this.afterOpenModal}
//           onRequestClose={this.closeModal}
//           style={customStyles}
//           contentLabel="Example Modal"
//         >
 
//           <h2>Hello</h2>
//           <button onClick={this.closeModal}>close</button>
//           <div>I am a modal</div>
//           <form>
//             <input />
//             <button>tab navigation</button>
//             <button>stays</button>
//             <button>inside</button>
//             <button>the modal</button>
//           </form>
//         </Modal>
//       </div>
//     );
//   }
// }