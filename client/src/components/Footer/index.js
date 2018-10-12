import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="bg-white text-dark mt-2 p-2 text-center">
        Copyright &copy; {new Date().getFullYear()} Buntstagram
      </footer>
    );
  }
}

export default Footer;
