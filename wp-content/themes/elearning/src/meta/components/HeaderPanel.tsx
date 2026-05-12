import { Button, Flex, PanelRow, withFilters } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { MediaUpload } from '@wordpress/media-utils';
import React, { useState } from 'react';
import { withMeta } from '../hoc/withMeta';
import ButtonGroup from './ButtonGroup';
import { Customizer, HeaderCenter, HeaderLeft, HeaderRight } from './Icons';
import { MetaProps } from './types';

const HeaderPanel = ({ meta, updateMeta }: MetaProps) => {
	const [isHovered, setIsHovered] = useState(false);

	const media: undefined | null | Record<string, any> = useSelect(
		(select) => {
			return meta?.elearning_logo
				? (select('core') as any).getMedia(meta.elearning_logo)
				: null;
		},
		[meta?.elearning_logo],
	);

	const currentLayout = meta?.elearning_header_style ?? 'default';
	const headerOptions = [
		{ label: 'Default', value: 'customizer' },
		{ label: 'Enable', value: '1' },
		{ label: 'Disable', value: '0' },
	];
	const OPTIONS = applyFilters('elearning.meta.header.layout', [
		{
			label: __('From Customizer', 'elearning'),
			icon: Customizer,
			value: 'default',
		},
		{
			label: __('Header Left', 'elearning'),
			icon: HeaderLeft,
			value: 'tg-site-header--left',
		},
		{
			label: __('Header Center', 'elearning'),
			icon: HeaderCenter,
			value: 'tg-site-header--center',
		},
		{
			label: __('Header Right', 'elearning'),
			icon: HeaderRight,
			value: 'tg-site-header--right',
		},
	]) as Array<{
		label: string;
		icon: React.ElementType;
		value: string;
	}>;

	const handleRemoveImage = () => {
		updateMeta?.('elearning_logo', null);
	};

	return (
		<PanelRow>
			<Flex className="mainFlexbox" direction={'column'}>
				<p>{__('Enable Transparent Header', 'elearning')}</p>
				<Flex style={{ flex: 1, flexWrap: 'wrap', gap: 0 }}>
					<div className="btn-group">
						<ButtonGroup
							options={headerOptions}
							selectedValue={meta?.elearning_transparent_header}
							onChange={(value: string) =>
								updateMeta?.('elearning_transparent_header', value)
							}
						/>
					</div>
				</Flex>

				<div className="padding-logo">
					<MediaUpload
						allowedTypes={['image']}
						onSelect={(data: Record<string, any>) => {
							updateMeta?.('elearning_logo', data.id);
						}}
						render={({ open }: { open: () => void }) => (
							<Flex
								direction={'column'}
								onMouseEnter={() => setIsHovered(true)}
								onMouseLeave={() => setIsHovered(false)}
								className={'relative'}
							>
								<p style={{ marginBottom: 0, marginRight: 'auto' }}>
									{__('Logo', 'elearning')}
								</p>
								{media ? (
									<>
										<div
											className="components-responsive-wrapper"
											style={{
												width: '100%',
												background: '#F4F4F4',
											}}
										>
											<div>
												<img
													src={
														media?.media_details?.sizes?.thumbnail?.source_url
													}
													alt="Featured Image"
													className="featureRelativeImg"
												/>
											</div>
										</div>
										{isHovered ? (
											<Flex className="positionAbsolute" justify="flex-start">
												<Button className="btnHeaderPanel" onClick={open}>
													{__('Replace', 'elearning')}
												</Button>
												<Button
													className="btnHeaderPanel"
													onClick={handleRemoveImage}
												>
													{__('Remove', 'elearning')}
												</Button>
											</Flex>
										) : null}
									</>
								) : (
									<div className="centered-button-container">
										<Button onClick={open} className="featuredImage">
											{__('Set featured image', 'elearning')}
										</Button>
									</div>
								)}
							</Flex>
						)}
					/>
				</div>
				<div>
					<p>{__('Style', 'elearning')}</p>
					<Flex style={{ flex: 1, flexWrap: 'wrap', rowGap: 12 }}>
						{OPTIONS.map((option) => {
							const Icon = option.icon;
							return (
								<Flex
									key={option.value}
									style={{ width: 'calc(50% - 10px)' }}
									data-state={
										currentLayout === option.value ? 'active' : 'inactive'
									}
									onClick={() => {
										updateMeta?.('elearning_header_style', option.value);
									}}
								>
									<Icon className={option.value} />
								</Flex>
							);
						})}
					</Flex>
				</div>
			</Flex>
		</PanelRow>
	);
};

// @ts-ignore
export default withMeta(withFilters('eLearningMetaHeaderPanel')(HeaderPanel));
