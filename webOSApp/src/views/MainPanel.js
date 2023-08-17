import Button from '@enact/sandstone/Button';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/sandstone/Panels';
import React from 'react'

var bridge = new WebOSServiceBridge();

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<Header title="감자밭 곰두리" />
			<Button>Click me</Button>
		</Panel>
	)
});

export default MainPanel;
