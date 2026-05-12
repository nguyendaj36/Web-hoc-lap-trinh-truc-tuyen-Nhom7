import { Panel, PanelBody, PanelRow } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import React from 'react';

const Collapse = () => {
	return (
		<div>
			<Panel header={__('My panel', 'elearning')}>
				<React.Fragment key=".0">
					<PanelBody title={__('First section', 'elearning')}>
						<PanelRow>
							<div
								style={{
									background: '#ddd',
									height: 100,
									width: '100%',
								}}
							/>
						</PanelRow>
					</PanelBody>
					<PanelBody title={__('Second section', 'elearning')}>
						<PanelRow>
							<div
								style={{
									background: '#ddd',
									height: 100,
									width: '100%',
								}}
							/>
						</PanelRow>
					</PanelBody>
				</React.Fragment>
			</Panel>
		</div>
	);
};

export default Collapse;
