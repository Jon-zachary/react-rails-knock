import React from 'react'
const style = {
  position: 'absolute',
  top: '200px',
  left:'200px',
  border: 'solid black 1px',
}

const JuiceForm = (props) => {
const button = props.isEdit ? <div>
                              <button onClick={() => props.submitEdit(props.id)}>Submit edit</button>
                              <button onClick={props.cancel}>Cancel</button>
                              </div>
                            : <div>
                              <button onClick={props.submitNew}>Submit New</button>
                              <button onClick={props.cancel}>Clear</button>
                              </div>
return(
<div className="juiceForm" style={style}>
  <h3> Juice Form </h3>
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
  {button}
</div>
)
}

export default JuiceForm