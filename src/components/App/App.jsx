//import React from 'react';
import './App.css';
import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { Button,Container,Row,Col,Image } from 'react-bootstrap';


const App = () => {


  const stateProfile = { id: null, name: '', login: '', html_url: '', company: '', avatar_url: '' }
  const stateRepositories = []
  const stateFollowers = []
  const stateFollowed = []
  const searchState = { name: '' }


  // Setting state
  const [ search, setSearch ] = useState(searchState);
  const [ currentProfile, setProfile ] = useState(stateProfile);
  const [ repositories, setRepositories] = useState(stateRepositories)
  const [ followers, setfollowers] = useState(stateFollowers)
  const [ followed, setfollowed] = useState(stateFollowed)


  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrors] = useState(false);


  async function fetchData(name) {

    setErrors(false);
    setIsLoading(true);

    try {
      const res = await fetch("https://api.github.com/users/"+name);
      res
      .json()
      .then(res => setProfile(res))
      .catch(err => setErrors(true));

      const res2 = await fetch("https://api.github.com/users/"+name+"/repos");
      res2
      .json()
      .then(res2 => setRepositories(res2))
      .catch(err => setErrors(true));

      const res3 = await fetch("https://api.github.com/users/"+name+"/followers");
      res3
      .json()
      .then(res3 => setfollowers(res3))
      .catch(err => setErrors(true));

      const res4 = await fetch("https://api.github.com/users/"+name+"/following");
      res4
      .json()
      .then(res4 => setfollowed(res4))
      .catch(err => setErrors(true));
    } catch(error){
      return setErrors(true);
    }
    
    

    setIsLoading(false);
  }

  function handleChange(event) {
    setSearch(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    fetchData(search);
  }

  /*useEffect(() => {
    fetchData("anthonyvno");
  });*/

  return (
    <div className="App-greeting">


      <form class="form-inline mb-3"
      onSubmit={handleSubmit}
			
		>
			<input type="text" class="form-control" value={search.name} onChange={handleChange} id="nameSearch" aria-describedby="Name" placeholder="Enter name"/>
			<button type="submit" class="btn btn-primary">Search</button>
		  </form>


      { isLoading &&
        <div>Loading ...</div>
       }

      {currentProfile.id == null || isLoading ? (<p>Search a Github profile</p>):
      (
      <Container class="mb-3" className="App-profile">
        <Row>
          <Col >
            <Image className="App-image"  src={currentProfile.avatar_url} roundedCircle />
          </Col>
          <Col >
          <h2>{currentProfile.name}</h2>
          <p>Works at {currentProfile.company}</p>
          <a href={currentProfile.html_url}>Visit profile</a>

          </Col>
        </Row>
        <Row>
        <Col>
        <h2>Repositories</h2>
          {repositories.length>0? (repositories.map(repo => (
            <p>
            <a href={repo.html_url}>
              {repo.name}
            </a>
            </p>
          ))):(<p>No repositories</p>)
            }
          </Col>
          <Col>
          <h2>Followers</h2>

          {followers.length>0?(followers.map(follower => (
            <p>
            <a href={follower.html_url}>
              {follower.login}
            </a>
            </p>
          ))):(<p>No followers</p>)
            }
          </Col>
          <Col>
          <h2>Followed</h2>

          {followed.length>0?(followed.map(foll => (
            <p>
            <a href={foll.html_url}>
              {foll.login}
            </a>
            </p>
          ))):(<p>Not following</p>)
            }
          </Col>
          
        </Row>
        
      </Container>
      
      )
      
      }
      {
        hasError ? (<p>er is een error: {hasError}</p>) : (<p></p>)
      }


      

    </div>

  );
};

export default React.memo(App);
