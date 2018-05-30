import React, { Component } from 'react';
import './signup.css';
import bcrypt from 'bcryptjs'
import axios from 'axios'

class Signup extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      confirmPassword: '',
      user_emails: [],
      enabled: false
    }
  }

  componentDidMount() {
    axios('/user/get').then(res => {
      let emails = res.data.map(item => item.email);
      this.setState({ user_emails: emails})
    })
  }
  
  handleChange(field, e) {
    this.setState({ [`${field}`]: e }, () => {
      if(this.state.password === this.state.confirmPassword && 
        this.state.password.length > 0) {
        if (this.state.user_emails.includes(this.state.email)) {
          alert("email already exists")
        }
        else {
          this.setState({ enabled: true })
        }
      }
      else {
        this.setState({ enabled: false})
      }
    })
  }

  signup() {
    let {password, confirmPassword, email, first_name, last_name} = this.state;
      this.setState({ password: '',
                      confirmPassword: '',
                      email: '',
                      first_name: '',
                      last_name: ''})
      let hash = bcrypt.hashSync(password, 10);
      let user = {
        email: email,
        first_name: first_name,
        last_name: last_name,
        hash: hash
      }
      // ------------------- This will add the user to the database, and log them in ------------------- 
      axios.post('/user/signup', {user}).then( res => {
        console.log(res);
      }).catch((error) => console.log(error))
  }

  render() {
    return (
      <div id="sig-wrapper">
        <input type="text" placeholder="email" onChange={(e) => this.handleChange("email", e.target.value)} value={this.state.email}/>
        <input type="text" placeholder="first name" onChange={(e) => this.handleChange("first_name", e.target.value)} value={this.state.first_name} />
        <input type="text" placeholder="last name" onChange={(e) => this.handleChange("last_name", e.target.value)} value={this.state.last_name} />
        <input type="password" placeholder="password" onChange={(e) => this.handleChange("password", e.target.value)} value={this.state.password}/>
        <input type="password" placeholder="confirm password" onChange={(e) => this.handleChange("confirmPassword", e.target.value)} value={this.state.confirmPassword}/>
        {this.state.enabled ? <button onClick={()=>this.signup()}> Signup </button> : 
        <button className="disabled"> Signup </button>}
      </div>
    );
  }
}

export default Signup;
