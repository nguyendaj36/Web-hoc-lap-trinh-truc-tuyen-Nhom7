import { Panel, PanelBody } from '@wordpress/components';
import { PluginSidebar } from '@wordpress/edit-post';
import { __ } from '@wordpress/i18n';
import React, { useState } from 'react';
import GeneralPanel from './components/GeneralPanel';
import HeaderPanel from './components/HeaderPanel';
import PageHeaderPanel from './components/PageHeaderPanel';
import PrimaryMenuPanel from './components/PrimaryMenuPanel';
import { PanelTypes } from './components/meta.schema';
import './meta.scss';

export const Plugin = () => {
	const [activePanel, setActivePanel] = useState<any>(PanelTypes.GENERAL);

	const togglePanel = (panel: string | null) => {
		setActivePanel((prevActivePanel: any) =>
			prevActivePanel === panel ? null : panel,
		);
	};
	return (
		<PluginSidebar
			name="elearning-meta-setting-sidebar"
			title={__('eLearning Page Settings', 'elearning')}
			icon={
				<>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						id="Layer_1"
						x="0"
						y="0"
						version="1.1"
						viewBox="0 0 512 512"
					>
						<path
							fill="#7963E0"
							d="m397 56.9-181-37h-2c-2.7 0-4.7.7-6.7 2.7L71.4 158.5l-1.3-.7c-4.7-1.3-8.1-6.1-6.7-11.4.7-1.3 1.3-2.7 2-4L201.2 7.1c2-2 5.4-2.7 8.1-2.7l182.3 37.7c4.7.7 8.1 6.1 7.4 10.8-.7 1.3-1.4 3.3-2 4z"
							className="st0"
						/>
						<path
							fill="#383838"
							d="M60.6 194.1c-2-.7-4-2-4.7-4.7-.7-2 0-4.7 1.3-6.1L210 31.3c1.3-1.3 2.7-2 4.7-2h1.3l205.2 42.4c2 .7 4 2 4.7 4 .7 2 0 4.7-1.3 6.1l-42.4 45.1c-.7.7-1.3 1.3-2.7 1.3l-2 .7h-2c-.7 0-2 0-2.7-.7-26.2-12.8-55.8-19.5-85.4-19.5-70 0-135.2 37.7-169.5 98.9l-57.3-13.5zM56.6 204.9l-4.7 37c-.7 5.4 2 10.1 6.7 12.1l.7.7c6.1 2.7 12.8.7 16.1-4.7 2-3.4 2-8.1.7-11.4L59.3 205c-.7-.7-1.3-.7-1.3-.7-.7-.1-1.4-.1-1.4.6z"
						/>
						<path
							fill="#7963E0"
							d="M229.5 416.1c18.8 15.5 41.7 23.5 68.6 23.5 18.2.7 37-3.4 53.1-10.8 16.1-8.1 31.6-19.5 44.4-32.3l48.4 43c-17.5 20.2-38.3 37-61.9 49.1-24.2 12.1-52.5 18.8-86.1 18.8-24.9 0-49.8-4.7-72.6-13.5-45.1-18.2-80.7-53.1-98.2-97.5-10.1-24.2-14.8-50.4-14.1-76.7 0-24.9 4-49.8 12.8-73.3 8.1-22.2 20.9-42.4 36.3-59.9 15.5-16.8 35-30.9 55.8-41 22.2-10.1 47.1-15.5 71.3-14.8 28.9 0 53.8 5.4 76 15.5 20.9 10.1 39.7 24.2 53.8 42.4 14.8 18.2 25.6 39.7 32.3 62.6 7.4 24.2 10.8 49.1 10.8 74.7 0 3.4 0 7.4-.7 10.8s-.7 7.4-1.3 11.4H193.8c4.7 29.6 16.8 51.8 35.7 68zM378.8 293c-1.3-12.8-4-25.6-8.7-37-4-10.8-10.8-21.5-18.2-30.3-8.1-8.7-17.5-15.5-27.6-20.2-11.4-5.4-24.2-8.1-36.3-7.4-25.6 0-46.4 8.7-63.2 26.2s-26.9 40.4-30.3 68.6l184.3.1z"
							className="st0"
						/>
					</svg>
				</>
			}
		>
			<Panel>
				<PanelBody
					title={__('General', 'elearning')}
					opened={activePanel === PanelTypes.GENERAL}
					onToggle={() => togglePanel(PanelTypes.GENERAL)}
				>
					{activePanel === PanelTypes.GENERAL && <GeneralPanel />}
				</PanelBody>
				<PanelBody
					title={__('Header', 'elearning')}
					opened={activePanel === PanelTypes.HEADER}
					onToggle={() => togglePanel(PanelTypes.HEADER)}
				>
					{activePanel === PanelTypes.HEADER && <HeaderPanel />}
				</PanelBody>
				<PanelBody
					title={__('Primary Menu', 'elearning')}
					opened={activePanel === PanelTypes.PRIMARYMENU}
					onToggle={() => togglePanel(PanelTypes.PRIMARYMENU)}
				>
					{activePanel === PanelTypes.PRIMARYMENU && <PrimaryMenuPanel />}
				</PanelBody>
				<PanelBody
					title={__('Page Header', 'elearning')}
					opened={activePanel === PanelTypes.PAGEHEADER}
					onToggle={() => togglePanel(PanelTypes.PAGEHEADER)}
				>
					{activePanel === PanelTypes.PAGEHEADER && <PageHeaderPanel />}
				</PanelBody>
			</Panel>
		</PluginSidebar>
	);
};
