import React, { Component } from 'react';

class Portfolio extends Component {
	// <a href={projects.url} title={img}>   15
	//<img alt={projects.name} src={img} />   16

	render() {
		if (this.props.data) {

			var projects = this.props.data.map(function (projectInfo) {
				var projectInfoImage =
					'https://raw.githubusercontent.com/' +
					projectInfo.owner.login +
					'/' +
					projectInfo.name +
					'/' +
					projectInfo.default_branch +
					'/img.png';
//				console.log(projectInfoImage);
				return (
					<div key={projectInfo.name} className='columns portfolio-item'>
						<div className='item-wrap'>
							<a href={projectInfo.html_url}>
								<img
									alt={projectInfo.name.toUpperCase()}
									src={projectInfoImage}
									style={{ width: '110%', height: '135px' }}
								/>
								<div className='overlay'>
									<div className='portfolio-item-meta'>
										<h5>{projectInfo.name.toUpperCase()}</h5>
										<p>{projectInfo.name.toLowerCase()}</p>
									</div>
								</div>
								<div className='link-icon'>
									<i className='fa fa-link'></i>
								</div>
							</a>
						</div>
					</div>
				);
			});
		}

		return (
			<section id='portfolio'>
				<div className='row'>
					<div className='twelve columns collapsed'>
						<h1>Check Out Some of My Works.</h1>

						<div
							id='portfolio-wrapper'
							className='bgrid-quarters s-bgrid-thirds cf'>
							{projects}
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default Portfolio;
