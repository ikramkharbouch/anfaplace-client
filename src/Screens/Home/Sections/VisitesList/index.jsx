import React from 'react';
import { Button, Header } from 'semantic-ui-react';
import './VisitLIst.less';

const VisitesList = () => (
	<div className="visite-list-section">
		<Header as="h2">Ma liste de visites</Header>
		<p>
			Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam voluptua.
			<br />
			<br />
			At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren.
		</p>
		<Button> Gérer ma liste de visites</Button>
	</div>
);

export default VisitesList;
