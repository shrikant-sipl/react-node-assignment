import React, {Component} from "react";

class NotFoundPage extends Component{
	render(){
        return (
			<div className="m-3">
				<h1>Page Not Found</h1>
				<p>Sorry, there is nothing to see here. </p>
                <a href="/dashboard">Back to Home </a>			
			</div>
		);
    }
}

export default NotFoundPage;