  import { Route, Switch } from "react-router-dom";
  import React from "react";
  import Navigation from "./components/Navigation";
  import ListingIndex from "./components/Listings/ListingIndex";
  import ListingShowPage from "./components/Listings/ListingShowPage";
  import LoginForm from "./components/LoginFormModal/LoginForm";
  import ProfilePage from "./components/Profile/ProfilePage";

  function App() {
    return (
      <>
        <Navigation />
        <Switch>
          <Route exact path="/" component={ListingIndex} />
          <Route exact path="/listings/:listingId" component={ListingShowPage} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/profile" component={ProfilePage} />
        </Switch>
      </>
    );
  }

  export default App;
