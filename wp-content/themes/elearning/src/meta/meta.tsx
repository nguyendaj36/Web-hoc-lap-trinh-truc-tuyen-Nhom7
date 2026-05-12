import { registerPlugin } from '@wordpress/plugins';
import { Plugin } from './Plugin';
import './meta.scss';

registerPlugin('elearning-meta-setting-sidebar', { render: Plugin });
