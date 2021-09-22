import React from 'react';
import getDataApi from '../utils/getData.js';
import github from '@images/github.png';
import twitter from '@images/twitter.png';
import instagram from '@images/instagram.png';
import '@styles/main.css';


function App() {

   const {
      data,
      isloading
   } = getDataApi();
   console.log('app ' + isloading)
   return (
      <div className="About">
         <div className="card">
            <div className="card_details">
               <div className="card_photo center circle">
                  <img
                     src={isloading == false ? `${data.picture.large}` : ''}
                     alt={isloading == false ? `${data.name.first}` : ''}
                  />
               </div>
               <p className="card_title">Hi, My name is</p>
               <p className="card_value">{isloading == false ? `${data.name.first} ${data.name.last}` : 'Loading...'}</p>
            </div>
            <div className="card_userdata">
               <ul>
                  <li>{isloading == false ? `${data.email}` : 'Loading...'}</li>
                  <li>{isloading == false ? `${data.location.country}` : 'Loading...'}</li>
               </ul>
            </div>
            <div className="card_social">
               <a href="https://twitter.com/gndx">
                  <img src={twitter} />
               </a>
               <a href="https://github.com/gndx">
                  <img src={github} />
               </a>
               <a href="https://instagram.com/gndx">
                  <img src={instagram} />
               </a>
            </div>
         </div>
      </div>
   );
}

export {App};
