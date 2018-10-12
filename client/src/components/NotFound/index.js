import React from 'react';

const NotFound = () => {
    return (
        <section className="App-header">
          <h2 className="App-error">Sorry, couldn't find what you are looking for</h2>
          <p>The link you followed appears to be broken or doesn't exists. Please try again or go back to the <a href="/">homepage</a></p>
        </section>
    )
}

export default NotFound;