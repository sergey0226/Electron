import React, { Component } from 'react';
import {TextField,InputLabel,FormGroup, FormHelperText} from '@material-ui/core';

export default class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width:"100%",
      inputProps:{}
    };
  }

  componentDidMount(){
    if(this.props.style){
      const w = this.props.style.width;
      this.setState({width:w || '100%'})
    }
    if(this.props.inputProps){
      const w = this.props.inputProps;
      this.setState({inputProps:w || {style:{padding:10}}})
    }
  }

  render() {
    return (
        <FormGroup style={{width:this.state.width,display:'flex',flexDirection:'column',marginRight:10,paddingRight:5,marginBottom:2}}>
            <div style={{paddingLeft:'10px',marginBottom:'2px',width:this.state.width}}>
              <InputLabel style={{fontSize:"12px",}}>{this.props.label?this.props.label:''}</InputLabel>
            </div>
            <TextField {...this.props} style={{height:this.props.multiline?'auto':38}} inputProps={this.state.inputProps} label=""/>
        </FormGroup>
    );
  }
}
