import {
	CheckboxControl,
	Flex,
	PanelRow,
	SelectControl,
	withFilters,
} from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import React from 'react';
import { withMeta } from '../hoc/withMeta';
import {
	ContainedSidebar,
	Customizer,
	LeftSidebar,
	RightSidebar,
	StretchedSidebar,
} from './Icons';
import { MetaProps } from './types';

const OPTIONS = applyFilters('elearning.meta.general.layout', [
	{
		label: __('Customizer', 'elearning'),
		icon: Customizer,
		value: 'tg-site-layout--default',
	},
	{
		label: __('Contained Sidebar', 'elearning'),
		icon: ContainedSidebar,
		value: 'tg-site-layout--no-sidebar',
	},
	{
		label: __('Stretched  Sidebar', 'elearning'),
		icon: StretchedSidebar,
		value: 'tg-site-layout--stretched',
	},
]) as Array<{
	label: string;
	icon: React.ElementType;
	value: string;
}>;

const SIDEBAR_OPTIONS = applyFilters('elearning.meta.general.layout', [
	{
		label: __('Customizer', 'elearning'),
		icon: Customizer,
		value: 'tg-site-layout--default',
	},
	{
		label: __('Left Sidebar', 'elearning'),
		icon: LeftSidebar,
		value: 'tg-site-layout--left',
	},
	{
		label: __('Right Sidebar', 'elearning'),
		icon: RightSidebar,
		value: 'tg-site-layout--right',
	},
]) as Array<{
	label: string;
	icon: React.ElementType;
	value: string;
}>;

const GeneralPanel = ({ meta, updateMeta }: MetaProps) => {
	const currentLayout = meta?.elearning_container_layout ?? 'customizer';
	const sidebarCurrentLayout = meta?.elearning_sidebar_layout ?? 'customizer';

	return (
		<PanelRow>
			<Flex className="mainFlexbox" direction={'column'}>
				<p>{__('Layout', 'elearning')}</p>
				<Flex style={{ flex: 1, flexWrap: 'wrap', gap: 8 }}>
					{OPTIONS?.map((option) => {
						const Icon = option.icon;
						return (
							<Flex
								key={option.value}
								style={{ width: 'calc(50% - 10px)' }}
								data-state={
									currentLayout === option.value ? 'active' : 'inactive'
								}
								onClick={() => {
									updateMeta?.('elearning_container_layout', option.value);
								}}
							>
								<Icon className={option.value} />
							</Flex>
						);
					})}
				</Flex>

				<p>{__('Sidebar', 'elearning')}</p>
				<Flex style={{ flex: 1, flexWrap: 'wrap', gap: 8 }}>
					{SIDEBAR_OPTIONS?.map((option) => {
						const Icon = option.icon;
						return (
							<Flex
								key={option.value}
								style={{ width: 'calc(50% - 10px)' }}
								data-state={
									sidebarCurrentLayout === option.value ? 'active' : 'inactive'
								}
								onClick={() => {
									updateMeta?.('elearning_sidebar_layout', option.value);
								}}
							>
								<Icon className={option.value} />
							</Flex>
						);
					})}
				</Flex>
				<Flex className={'padding-section'} align="baseline">
					<p>{__('Remove content padding', 'elearning')}</p>
					<CheckboxControl
						checked={meta?.elearning_remove_content_margin}
						onChange={(val) => {
							updateMeta?.('elearning_remove_content_margin', val);
						}}
						className="checkboxWidth"
					/>
				</Flex>
				<div className="underline" />
				<Flex className={'padding-section'} direction={'column'}>
					<p className="bold" style={{ marginBottom: '4px' }}>
						{__('Sidebar', 'elearning')}
					</p>
					<SelectControl
						onChange={(value) => {
							updateMeta?.('elearning_sidebar', value);
						}}
						size="__unstable-large"
						value={meta?.elearning_sidebar}
						options={[
							{
								label: __('Default', 'elearning'),
								value: 'default',
							},
							{
								label: __('Sidebar Right', 'elearning'),
								value: 'sidebar-right',
							},
							{
								label: __('Sidebar Left', 'elearning'),
								value: 'sidebar-left',
							},
							{
								label: __('Footer One', 'elearning'),
								value: 'footer-sidebar-1',
							},
							{
								label: __('Footer Two', 'elearning'),
								value: 'footer-sidebar-2',
							},
							{
								label: __('Footer Three', 'elearning'),
								value: 'footer-sidebar-3',
							},
							{
								label: __('Footer Four', 'elearning'),
								value: 'footer-sidebar-4',
							},
						]}
					/>
				</Flex>
			</Flex>
		</PanelRow>
	);
};

// @ts-ignore
export default withMeta(withFilters('eLearningMetaGeneralPanel')(GeneralPanel));
