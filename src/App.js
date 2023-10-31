import React, { lazy, Suspense } from 'react';
  //try 
  //http://localhost:3000/folder/page
   //http://localhost:3000/index
function App() {
  
   const Router = LazyRouter(window.location.pathname);

  return (
    <> 
      <Router />
    </>
  );
}


function LazyRouter(pathname) { 
   
  const LazyComponent = lazy(() => import(`./release${pathname}`));

  return function (props) {
    return (
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyComponent {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };

}

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  componentDidCatch(error) {
    // Set the state to indicate that an error has occurred
    this.setState({ hasError: true, error });
  }

  render() {
    if (this.state.hasError) {
      // You can suppress the overlay by not returning the error message or a fallback UI
      // Instead, handle the error here and display a custom message or UI
      return (
        <div>
          <h2>Not Found</h2>
          <p>{this.state.error ? this.state.error.message : 'An error occurred.'}</p>
        </div>
      );
    }

    return this.props.children;
  }
} 

export default App;
