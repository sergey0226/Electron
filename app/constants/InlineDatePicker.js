import React, { Component } from 'react';
import {FormGroup,InputLabel} from '@material-ui/core';
import { InlineDatePicker } from 'material-ui-pickers';

export default class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <FormGroup style={{width:this.state.width,display:'flex',flexDirection:'column',marginRight:10,paddingRight:5,marginBottom:2}}>
        <div style={{paddingLeft:'10px',marginBottom:'2px',width:this.state.width}}>
          <InputLabel style={{fontSize:"12px",}}>{this.props.label?this.props.label:''}</InputLabel>
        </div>
        <InlineDatePicker {...this.props} style={{height:38}} label=""/>
    </FormGroup>
    );
  }
}