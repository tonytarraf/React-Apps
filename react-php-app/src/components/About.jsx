import React, { Component } from "react";
class About extends Component {
	state = {};
	render() {
		return (
			<div>
				<h2 className="aboutTitle">An enthusiasm for success.</h2>

				<div className="row aboutDataRowContainer">
					<div className="col-xl-6 xol-lg-6 col-md-12 col-sm-12">
						<h3>THOUGHTFUL PROCESS</h3>
						<div>
							We care just as much about the performance of a project as we do
							the aesthetics. Our strategic approach is what makes us different
							and great to work with.
						</div>
					</div>
					<div className="col-xl-6 xol-lg-6 col-md-12 col-sm-12">
						<h3>EUREKA MOMENTS</h3>
						<div>
							The best products and brands are a result of powerful moments of
							connection. We invest in finding these, regardless of budget. We
							love good ideas and we have a lot of them.
						</div>
					</div>
				</div>

				<div className="row aboutDataRowContainer">
					<div className="col-xl-6 xol-lg-6 col-md-12 col-sm-12">
						<h3>SCALEABLE &amp; ADAPTABLE</h3>
						<div>
							Our small but experienced team makes it easier to go from start to
							finish regardless of budget or project type. You aren't paying for
							junior designers, you're hiring the A team.
						</div>
					</div>
					<div className="col-xl-6 xol-lg-6 col-md-12 col-sm-12">
						<h3>BE GOOD, DO GOOD</h3>
						<div>
							We have a good reputation because we put people over profit and
							always have. Relationships matter and empower the work.
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default About;
