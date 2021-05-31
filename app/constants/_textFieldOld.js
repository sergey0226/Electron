import React, { Component } from 'react';
import {TextField,InputLabel,FormGroup, FormHelperText} from '@material-ui/core';

export default class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width:"100%"
    };
  }

  componentDidMount(){
    if(this.props.style){
      const w = this.props.style.width;
      this.setState({width:w || '100%'})
    }
  }

  render() {
    if(this.props.select)
      return (
        <FormGroup style={{width:this.state.width,display:'flex',flexDirection:'column',marginRight:10,paddingRight:'5px',marginBottom:10}}>
            <InputLabel style={{fontSize:"12px",marginBottom:'6px',width:this.state.width}}>{this.props.label?this.props.label:''}</InputLabel>
            <select>{this.props.children}</select>
        </FormGroup>
      );
    return (
        <FormGroup style={{width:this.state.width,display:'flex',flexDirection:'column',marginRight:10,paddingRight:'5px',marginBottom:10}}>
            <InputLabel style={{fontSize:"12px",marginBottom:'6px',width:this.state.width}}>{this.props.label?this.props.label:''}</InputLabel>
            {/* <TextField id={this.props.key} {...this.props} style={{padding:0}} label=""/> */}
            <input />
        </FormGroup>
    );
  }
}