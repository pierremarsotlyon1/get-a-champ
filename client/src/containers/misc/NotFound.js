import React from 'react';
import gif404 from './404.gif';

const NotFound = () =>
  (
    <div style={{margin: '0 auto', width: '400px'}}>
      <h1>404!</h1>
      <p>Oops, no such page exists.</p>
      <img src={gif404} alt='404 gif'/>
    </div>
  );

export default NotFound;
