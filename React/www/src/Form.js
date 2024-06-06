import React from 'react'

const Form = () => {
  return (
    <form action="/submit" method="post">
        <label for="name">Name:</label><br></br>
        <input type="text" id="name" name="name"><br></br>
        </input>
        <label for="email">Email:</label><br></br>
        <input type="email" id="email" name="email"><br></br>
        </input>
        <label for="message">Message:</label><br></br>
        <textarea id="message" name="message" rows="4" cols="50"></textarea><br></br>
        
        <input type="submit" value="Submit">
        </input>
    </form>
  )
}

export default Form
