// Higher order component --> A component (HOC) that renders anpther component
//Goal is to re-use code
//render hijacking
// prop manipulation
// abstract State
 import React from 'react';
 import ReactDOM from 'react-dom';

 const Info = (props) => (
   <div>
    <h1>Info</h1>
    <p>The details are: {props.details}</p>
   </div>
 );

 const warningMessage = (WrappedComponent) => {
   return (props) => (
     <div>
      {props.isAdmin && <h1>Warning!</h1>}
      <WrappedComponent {...props}/>
     </div>
   );
 };

 const HigherOrderCompnent = warningMessage(Info);

 const requireAcuthentication = (WrappedComponent) => {
   return (props) => (
     <div>
       {props.isAuthenticated ? <WrappedComponent {...props}/> : <h1>Please Log In</h1>}
     </div>
   );
 };

 const AuthInfo = requireAcuthentication(Info);



 ReactDOM.render(<AuthInfo isAuthenticated={true} details='HERE!'/>, document.getElementById('app'));
