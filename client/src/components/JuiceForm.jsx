import React from 'react'
const style = {
  position: 'absolute',
  top: '200px',
  left:'200px',
  border: 'solid black 1px',
}

const JuiceForm = (props) => {
return(
<div className="juiceForm" style={style}>
  <h3> New Juice Form </h3>
  <form>
    <label htmlFor="name">Name:</label>
    <input 
      name="name"
      onChange={props.handleChange}
      value={props.name}
      type="text"
    />
    <br /><br />
    <label htmlFor="sugar">Sugar:</label>
    <input
      name="sugar"
      onChange={props.handleChange}
      value={props.sugar}
      type="text"
    />
  </form>
  <button onClick={props.submitNew}>Submit</button>
</div>
)
}

export default JuiceForm