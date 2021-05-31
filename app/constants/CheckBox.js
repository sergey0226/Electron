import React from 'react';
import Styles from "./CheckBox.module.css";

export default function StyledCheckbox(props) {
  // console.log(Styles)
  return (
    <div>
      <input type="checkbox" className={Styles.checkbox} {...props}/>
    </div>
  );
}