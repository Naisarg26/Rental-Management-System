import React, { useContext } from "react";
import Featured from "../../components/featured/featured";
import { UserContext } from "../../UserContext";
import Header from "../../components/Header2/Header2";
import PropertyList from "../../components/propertyList/propertyList";
// import FeaturedProperties from "../../components/featuredProperties/featuredProperties";
// import MailList from "../../components/mailList/mailList";
// import Footer from "../../components/footer/footer";
import "./home.css";
import ChatComponent from "../../components/chat";
const Home = () => {
	const { user } = useContext(UserContext);
	const userContent = user && typeof user === 'string' ? (
		<span className="text-success">{user}'s</span>
	  ) : null;
	return (
		<div>
      		<Header/>
	  		<div className="homeContainer">
	  			<Featured/>
				  <h1 className="homeTitle">Browse by property type</h1>
				  <PropertyList/>
				  {/* <h1 className="homeTitle">Homes guests love</h1> */}
        		  {/* <FeaturedProperties/>
				  <MailList/>
				  <Footer/>  */}
  			</div>
			<ChatComponent/>
	  	</div>
	  
		
	);
};

export default Home;
