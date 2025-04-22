import React from 'react'

const Form = (props) => {
  return (
      <div>
        	<form onSubmit={props.handleSubmit}>
            	<h2>Where are you?</h2>
            	<div className="input--wrapper">
            		<input
                  		type="text"
                  		name="zip"
                  		placeholder="Enter zip code"
                  		onChange={props.handleChange}
              		/>
              		<button>Submit</button>
            	</div>
        	</form>
    </div>
  )
}

export default Form;