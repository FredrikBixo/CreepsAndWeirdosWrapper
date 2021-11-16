import React from "react";
import wrapperContractAddress from "../contracts/wrapper-contract-address.json";

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export class Wrapper extends React.Component {

//  var selectedItemToWrap = -1;
  //var selectedItemToUnwrap = -1;

  constructor(props) {
    super(props);

    this.initialState = {
      selectedItemToWrap:-1,
      selectedItemToUnwrap:-1,
    };

    this.state = this.initialState;
  }

   _onSelectWrap(selectedOption) {
      this.state.selectedItemToWrap = selectedOption.value;
      console.log(this.state.selectedItemToWrap);
  }

   _onSelectUnwrap(selectedOption) {
      this.state.selectedItemToUnwrap = selectedOption.value;
      console.log(this.state.selectedItemToUnwrap);
  }

   _wrap() {
    if (this.state.selectedItemToWrap != -1) {
      this.props.wrap(this.state.selectedItemToWrap);
    }
  }

   _unwrap() {
    if (this.state.selectedItemToUnwrap != -1) {
      this.props.unwrap(this.state.selectedItemToUnwrap);
    }
  }

render() {
  return (


  <div>
      <Dropdown options={this.props.dropDownText} onChange={this._onSelectWrap.bind(this)} value={0} placeholder="Select drawing to wrap" />
      {this.props.wrappingPreprationDone ? <button onClick={this._wrap}>  Wrap </button>
      :
      <button style={{margin:10}} onClick={this._wrap.bind(this)}>  Prepare wrapping </button>
      }
      <br/>
      <br/>
      <Dropdown options={this.props.dropDownTextERC721} onChange={this._onSelectUnwrap.bind(this)} value={0} placeholder="Select drawing to unwrap" />
      <button style={{margin:10}} onClick={this._unwrap.bind(this)}> Unwrap </button>
    </div>
  );
}
}
