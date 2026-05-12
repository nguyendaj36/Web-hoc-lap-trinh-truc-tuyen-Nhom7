/**
 * File customizer.js.
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */

(function ($) {
	// Site title.
	wp.customize('blogname', function (value) {
		value.bind(function (to) {
			$('#site-title a').text(to);
		});
	});

	// Site description.
	wp.customize('blogdescription', function (value) {
		value.bind(function (to) {
			$('#site-description').text(to);
		});
	});
})(jQuery);

(function ($) {
	function elearningColorPalette(v, to) {
		let styles = '';
		Object.entries(to.colors).forEach(([k, v]) => {
			styles += `--wp--preset--color--${k}:${v};`;
		});
		v = `:root {${styles}}`;
		return v;
	}

	function elearningGenerateCommonCSS(selector, property, value) {
		if (undefined === value || '' === value) {
			return '';
		}
		return `${selector} {${property}:${value};}`;
	}

	function elearningGenerateSliderCSS(selector, property, value) {
		return `${selector} {${property}: ${value.size}${value.unit};}`;
	}

	function elearningGenerateBackgroundCSS(selector, value) {
		let backgroundColor = value['background-color'],
			backgroundImage = value['background-image'],
			backgroundAttachment = value['background-attachment'],
			backgroundPosition = value['background-position'],
			backgroundSize = value['background-size'],
			backgroundRepeat = value['background-repeat'];

		return `${selector}{background-color: ${backgroundColor};background-image: url( ${backgroundImage} );background-attachment: ${backgroundAttachment};background-position: ${backgroundPosition};background-size: ${backgroundSize};background-repeat: ${backgroundRepeat};}`;
	}

	function elearningGenerateSlidebarWidthCSS(
		selector,
		secondarySelector,
		property,
		value,
	) {
		let sidebarCss = value.size;
		let primaryCss = 100 - value.size;
		let css = '';
		css = `${selector} {${property}: ${sidebarCss}${value.unit};}`;
		css += `${secondarySelector} {${property}: ${primaryCss}${value.unit};}`;

		return css;
	}

	/**
	 * @param {string} str
	 * @returns {boolean}
	 */
	function elearningIsNumeric(str) {
		var matches;

		if ('string' !== typeof str) {
			return false;
		}

		matches = str.match(/\d+/g);

		return null !== matches;
	}

	function elearningGenerateTypographyCSS(controlId, selector, typography) {
		let css = '';
		var link = '',
			fontFamily = '',
			fontWeight = '',
			fontStyle = '',
			fontTransform = '',
			desktopFontSize = '',
			tabletFontSize = '',
			mobileFontSize = '',
			desktopLineHeight = '',
			tabletLineHeight = '',
			mobileLineHeight = '',
			desktopLetterSpacing = '',
			tabletLetterSpacing = '',
			mobileLetterSpacing = '';

		if ('object' == typeof typography) {
			if (undefined !== typography['font-size']) {
				if (
					'undefined' !== typeof typography?.['font-size']?.desktop?.size &&
					'' !== typography['font-size']['desktop']['size']
				) {
					desktopFontSize =
						typography['font-size']['desktop']['size'] +
						typography['font-size']['desktop']['unit'];
				}

				if (
					'undefined' !== typeof typography?.['font-size']?.tablet?.size &&
					'' !== typography['font-size']['tablet']['size']
				) {
					tabletFontSize =
						typography['font-size']['tablet']['size'] +
						typography['font-size']['tablet']['unit'];
				}

				if (
					'undefined' !== typeof typography?.['font-size']?.mobile?.size &&
					'' !== typography['font-size']['mobile']['size']
				) {
					mobileFontSize =
						typography['font-size']['mobile']['size'] +
						typography['font-size']['mobile']['unit'];
				}
			}

			if (undefined !== typography['line-height']) {
				if (
					'undefined' !== typeof typography?.['line-height']?.desktop?.size &&
					'' !== typography['line-height']['desktop']['size']
				) {
					const desktopLineHeightUnit =
						'-' !== typography['line-height']['desktop']['unit']
							? typography['line-height']['desktop']['unit']
							: '';
					desktopLineHeight =
						typography['line-height']['desktop']['size'] +
						desktopLineHeightUnit;
				}

				if (
					'undefined' !== typeof typography?.['line-height']?.tablet?.size &&
					'' !== typography['line-height']['tablet']['size']
				) {
					const tabletLineHeightUnit =
						'-' !== typography['line-height']['tablet']['unit']
							? typography['line-height']['tablet']['unit']
							: '';
					tabletLineHeight =
						typography['line-height']['tablet']['size'] + tabletLineHeightUnit;
				}

				if (
					'undefined' !== typeof typography?.['line-height']?.mobile?.size &&
					'' !== typography['line-height']['mobile']['size']
				) {
					const mobileLineHeightUnit =
						'-' !== typography['line-height']['mobile']['unit']
							? typography['line-height']['mobile']['unit']
							: '';
					mobileLineHeight =
						typography['line-height']['mobile']['size'] + mobileLineHeightUnit;
				}
			}

			if (undefined !== typography['letter-spacing']) {
				if (
					'undefined' !==
						typeof typography?.['letter-spacing']?.desktop?.size &&
					'' !== typography['letter-spacing']['desktop']['size']
				) {
					const desktopLetterSpacingUnit =
						'-' !== typography['letter-spacing']['desktop']['unit']
							? typography['letter-spacing']['desktop']['unit']
							: '';
					desktopLetterSpacing =
						typography['letter-spacing']['desktop']['size'] +
						desktopLetterSpacingUnit;
				}

				if (
					'undefined' !== typeof typography?.['letter-spacing']?.tablet?.size &&
					'' !== typography['letter-spacing']['tablet']['size']
				) {
					const tabletLetterSpacingUnit =
						'-' !== typography['letter-spacing']['tablet']['unit']
							? typography['letter-spacing']['tablet']['unit']
							: '';
					tabletLetterSpacing =
						typography['letter-spacing']['tablet']['size'] +
						tabletLetterSpacingUnit;
				}

				if (
					'undefined' !== typeof typography?.['letter-spacing']?.mobile?.size &&
					'' !== typography['letter-spacing']['mobile']['size']
				) {
					const mobileLetterSpacingUnit =
						'-' !== typography['letter-spacing']['mobile']['unit']
							? typography['letter-spacing']['mobile']['unit']
							: '';
					mobileLetterSpacing =
						typography['letter-spacing']['mobile']['size'] +
						mobileLetterSpacingUnit;
				}
			}

			if (
				undefined !== typography['font-family'] &&
				'' !== typography['font-family']
			) {
				fontFamily = typography['font-family'].split(',')[0];
				fontFamily = fontFamily.replace(/'/g, '');

				if (
					fontFamily.includes('default') ||
					fontFamily.includes('Default') ||
					fontFamily.includes('-apple-system')
				) {
					fontFamily =
						'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, sans-serif';
				} else if (fontFamily.includes('Monaco')) {
					fontFamily =
						'Monaco,"Lucida Sans Typewriter","Lucida Typewriter","Courier New",Courier,monospace';
				} else {
					link = `<link id="${controlId}" href="https://fonts.googleapis.com/css?family=${fontFamily}" rel="stylesheet">`;
				}
			}

			if (
				undefined !== typography['font-weight'] &&
				'' !== typography['font-weight']
			) {
				if (elearningIsNumeric(typography['font-weight'])) {
					fontWeight = parseInt(typography['font-weight']);
				} else {
					fontWeight =
						'regular' != typography['font-weight']
							? typography['font-weight']
							: 'normal';
				}
			}

			if (
				undefined !== typography['font-style'] &&
				'' !== typography['font-style']
			) {
				fontStyle = typography['font-style'];
			}

			if (
				undefined !== typography['text-transform'] &&
				'' !== typography['text-transform']
			) {
				fontTransform = typography['text-transform'];
			}

			jQuery('link#' + controlId).remove();

			css = `${selector} {
						font-family: ${fontFamily};
						font-weight: ${fontWeight};
						font-style: ${fontStyle};
						text-transform: ${fontTransform};
						font-size: ${desktopFontSize};
						line-height: ${desktopLineHeight};
						letter-spacing: ${desktopLetterSpacing};
					}`;

			css += `@media (max-width: 768px) {
						${selector} {
							font-size: ${tabletFontSize};
							line-height: ${tabletLineHeight};
							letter-spacing: ${tabletLetterSpacing};
						}
					}`;

			css += `@media (max-width: 600px) {
						${selector}{
							font-size: ${mobileFontSize};
							line-height:${mobileLineHeight};
							letter-spacing: ${mobileLetterSpacing};
						}
					}`;

			jQuery('head').append(link);

			return css;
		}

		return css;
	}

	function elearningGenerateDimensionCSS(selector, property, value) {
		let topCSS = value.top ? value.top : 0,
			rightCSS = value.right ? value.right : 0,
			bottomCSS = value.bottom ? value.bottom : 0,
			leftCSS = value.left ? value.left : 0,
			unit = value.unit ? value.unit : 'px';

		return `${selector}{ ${property} : ${topCSS + unit + ' ' + rightCSS + unit + ' ' + bottomCSS + unit + ' ' + leftCSS + unit}}`;
	}

	wp.hooks.addFilter(
		'customind.dynamic.css',
		'customind',
		function (css, value, id) {
			switch (id) {
				case 'elearning_color_palette':
					css = elearningColorPalette(css, value);
					break;
				case 'elearning_base_color_text':
					css = elearningGenerateCommonCSS('body, a', 'color', value);
					break;

				case 'elearning_base_color_border':
					css = elearningGenerateCommonCSS(
						'.tg-site-header, .tg-primary-menu, .tg-primary-menu > div ul li ul, .tg-primary-menu > div ul li ul li a, .posts-navigation, #comments, .widget ul li, .post-navigation, #secondary, .tg-site-footer .tg-site-footer-widgets, .tg-site-footer .tg-site-footer-bar .tg-container',
						'border-color',
						value,
					);
					css += elearningGenerateCommonCSS(
						'hr .tg-container--separate',
						'background-color',
						value,
					);
					break;

				case 'elearning_link_color':
					css = elearningGenerateCommonCSS('.entry-content a', 'color', value);
					break;

				case 'elearning_link_hover_color':
					css = elearningGenerateCommonCSS(
						`h1, h2, h3, h4, h5, h6, .entry-title a`,
						'color',
						value,
					);
					break;

				case 'elearning_heading_color':
					css = elearningGenerateCommonCSS(
						`h1, h2, h3, h4, h5, h6, .entry-title a`,
						'color',
						value,
					);
					break;

				case 'elearning_general_container_width':
					css = elearningGenerateSliderCSS('.tg-container', 'max-width', value);
					break;

				case 'elearning_general_sidebar_width':
					css = elearningGenerateSlidebarWidthCSS(
						'#secondary',
						'#primary',
						'width',
						value,
					);
					break;

				case 'elearning_content_area_padding':
					css = elearningGenerateDimensionCSS(
						'.site-content',
						'padding-top',
						value,
					);
					css += elearningGenerateDimensionCSS(
						'.site-content',
						'padding-bottom',
						value,
					);
					break;

				case 'elearning_inside_container_background':
					css = elearningGenerateBackgroundCSS('#main', value);
					break;

				case 'elearning_outside_container_background':
					css = elearningGenerateBackgroundCSS(
						'body,body.page-template-pagebuilder',
						value,
					);
					break;

				case 'elearning_base_typography_body':
					css = elearningGenerateTypographyCSS(id, 'body', value);
					break;

				case 'elearning_base_typography_heading':
					css = elearningGenerateTypographyCSS(
						id,
						'h1, h2, h3, h4, h5, h6',
						value,
					);
					break;

				case 'elearning_typography_h1':
					css = elearningGenerateTypographyCSS(id, 'h1', value);
					break;

				case 'elearning_typography_h2':
					css = elearningGenerateTypographyCSS(id, 'h2', value);
					break;

				case 'elearning_typography_h3':
					css = elearningGenerateTypographyCSS(id, 'h3', value);
					break;

				case 'elearning_typography_h4':
					css = elearningGenerateTypographyCSS(id, 'h4', value);
					break;

				case 'elearning_typography_h5':
					css = elearningGenerateTypographyCSS(id, 'h5', value);
					break;

				case 'elearning_typography_h6':
					css = elearningGenerateTypographyCSS(id, 'h6', value);
					break;

				case 'elearning_button_text_color':
					css = elearningGenerateCommonCSS(
						`button, input[type="button"], input[type="reset"], input[type="submit"], #infinite-handle span,.tg-header-button a,.site-content .wp-block-button .wp-block-buttons .wp-block-button__link`,
						'color',
						value,
					);
					break;

				case 'elearning_button_text_hover_color':
					css = elearningGenerateCommonCSS(
						`button:hover, input[type="button"]:hover, input[type="reset"]:hover, input[type="submit"]:hover, #infinite-handle span:hover,.tg-header-button a:hover, .site-content .wp-block-button .wp-block-buttons .wp-block-button__link:hover `,
						'color',
						value,
					);
					break;

				case 'elearning_button_bg_color':
					css = elearningGenerateCommonCSS(
						`button, input[type="button"], input[type="reset"], input[type="submit"], #infinite-handle span,.tg-header-button a,#page .site-main .site-content .wp-block-button .wp-block-buttons .wp-block-button__link`,
						'background-color',
						value,
					);
					break;

				case 'elearning_button_bg_hover_color':
					css = elearningGenerateCommonCSS(
						`button:hover, input[type="button"]:hover, input[type="reset"]:hover, input[type="submit"]:hover, #infinite-handle span:hover,.tg-header-button a:hover,#page .site-main .site-content .wp-block-button .wp-block-buttons .wp-block-button__link:hover`,
						'background-color',
						value,
					);
					break;

				case 'elearning_button_padding':
					css = elearningGenerateDimensionCSS(
						`button, input[type="button"], input[type="reset"], input[type="submit"], #infinite-handle span, .tg-header-button a`,
						'padding',
						value,
					);
					break;

				case 'elearning_button_roundness':
					css = elearningGenerateSliderCSS(
						`button, input[type="button"], input[type="reset"], input[type="submit"], #infinite-handle span, .tg-header-button a`,
						'border-radius',
						value,
					);
					break;

				case 'elearning_header_top_text_color':
					css = elearningGenerateCommonCSS(
						'.tg-site-header .tg-site-header-top',
						'color',
						value,
					);
					break;

				case 'elearning_header_top_bg':
					css = elearningGenerateBackgroundCSS(
						'.tg-site-header .tg-site-header-top',
						value,
					);
					break;

				case 'elearning_header_main_bg':
					css = elearningGenerateBackgroundCSS(
						'.tg-site-header, .tg-container--separate .tg-site-header',
						value,
					);
					break;

				case 'elearning_header_main_border_bottom_size':
					css = elearningGenerateSliderCSS(
						'.tg-site-header',
						'border-bottom-width',
						value,
					);
					break;

				case 'elearning_header_main_border_bottom_color':
					css = elearningGenerateCommonCSS(
						'.tg-site .tg-site-header',
						'border-bottom-color',
						value,
					);
					break;

				case 'elearning_primary_menu_text_color':
					css = elearningGenerateCommonCSS(
						'.tg-primary-menu > div > ul li:not(.tg-header-button-wrap) a',
						'color',
						value,
					);
					break;

				case 'elearning_primary_menu_text_hover_color':
					css = elearningGenerateCommonCSS(
						`.tg-primary-menu > div > ul li:not(.tg-header-button-wrap):hover > a`,
						'color',
						value,
					);
					break;

				case 'elearning_primary_menu_text_active_color':
					css = elearningGenerateCommonCSS(
						`.tg-primary-menu > div ul li:active > a, .tg-primary-menu > div ul > li:not(.tg-header-button-wrap).current_page_item > a, .tg-primary-menu > div ul > li:not(.tg-header-button-wrap).current_page_ancestor > a, .tg-primary-menu > div ul > li:not(.tg-header-button-wrap).current-menu-item > a, .tg-primary-menu > div ul > li:not(.tg-header-button-wrap).current-menu-ancestor > a`,
						'color',
						value,
					);
					css += elearningGenerateCommonCSS(
						`.tg-primary-menu.tg-primary-menu--style-underline > div ul > li:not(.tg-header-button-wrap).current_page_item > a::before, .tg-primary-menu.tg-primary-menu--style-underline > div ul > li:not(.tg-header-button-wrap).current_page_ancestor > a::before, .tg-primary-menu.tg-primary-menu--style-underline > div ul > li:not(.tg-header-button-wrap).current-menu-item > a::before, .tg-primary-menu.tg-primary-menu--style-underline > div ul > li:not(.tg-header-button-wrap).current-menu-ancestor > a::before, .tg-primary-menu.tg-primary-menu--style-left-border > div ul > li:not(.tg-header-button-wrap).current_page_item > a::before, .tg-primary-menu.tg-primary-menu--style-left-border > div ul > li:not(.tg-header-button-wrap).current_page_ancestor > a::before, .tg-primary-menu.tg-primary-menu--style-left-border > div ul > li:not(.tg-header-button-wrap).current-menu-item > a::before, .tg-primary-menu.tg-primary-menu--style-left-border > div ul > li:not(.tg-header-button-wrap).current-menu-ancestor > a::before, .tg-primary-menu.tg-primary-menu--style-right-border > div ul > li:not(.tg-header-button-wrap).current_page_item > a::before, .tg-primary-menu.tg-primary-menu--style-right-border > div ul > li:not(.tg-header-button-wrap).current_page_ancestor > a::before, .tg-primary-menu.tg-primary-menu--style-right-border > div ul > li:not(.tg-header-button-wrap).current-menu-item > a::before, .tg-primary-menu.tg-primary-menu--style-right-border > div ul > li:not(.tg-header-button-wrap).current-menu-ancestor > a::before`,
						'background-color',
						value,
					);

				case 'elearning_typography_primary_menu':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-primary-menu > div ul li a',
						value,
					);
					break;

				case 'elearning_typography_primary_menu_dropdown_item':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-primary-menu > div ul li ul li a',
						value,
					);
					break;

				case 'elearning_typography_mobile_menu':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-mobile-navigation a',
						value,
					);
					break;

				case 'elearning_primary_menu_border_bottom_size':
					css = elearningGenerateSliderCSS(
						'.tg-site-header .main-navigation',
						'border-bottom-width',
						value,
					);
					break;

				case 'elearning_primary_menu_border_bottom_color':
					css = elearningGenerateCommonCSS(
						`.tg-site-header .main-navigation`,
						'border-bottom-color',
						value,
					);
					break;

				case 'elearning_page_title_bg':
					css = elearningGenerateBackgroundCSS(
						'.tg-page-header, .tg-container--separate .tg-page-header',
						value,
					);
					break;

				case 'elearning_page_title_padding':
					css = elearningGenerateDimensionCSS(
						'.tg-page-header',
						'padding',
						value,
					);
					break;

				case 'elearning_post_page_title_color':
					css = elearningGenerateCommonCSS(
						'.tg-page-header .tg-page-header__title, .tg-page-content__title, .tg-page-header .archive-description > p',
						'color',
						value,
					);
					break;

				case 'elearning_typography_post_page_title':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-page-header .tg-page-header__title, .tg-page-content__title',
						value,
					);
					break;

				case 'elearning_breadcrumb_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-page-header .breadcrumb-trail ul li',
						value,
					);
					break;

				case 'elearning_breadcrumbs_text_color':
					css = elearningGenerateCommonCSS(
						'.tg-page-header .breadcrumb-trail ul li',
						'color',
						value,
					);
					break;

				case 'elearning_breadcrumbs_seperator_color':
					css = elearningGenerateCommonCSS(
						'.tg-page-header .breadcrumb-trail ul li::after',
						'color',
						value,
					);
					break;

				case 'elearning_breadcrumbs_link_color':
					css = elearningGenerateCommonCSS(
						'.tg-page-header .breadcrumb-trail ul li a',
						'color',
						value,
					);
					break;

				case 'elearning_breadcrumbs_link_hover_color':
					css = elearningGenerateCommonCSS(
						'.tg-page-header .breadcrumb-trail ul li a:hover ',
						'color',
						value,
					);
					break;

				case 'elearning_typography_blog_post_title':
					css = elearningGenerateTypographyCSS(
						id,
						'.entry-title:not(.tg-page-content__title)',
						value,
					);
					break;
				case 'elearning_widget_title_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-secondary .widget .widget-title, .tg-secondary .widget .wp-block-heading',
						value,
					);
					break;
				case 'elearning_widget_content_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-secondary .widget, .tg-secondary .widget li a',
						value,
					);
					break;
				case 'elearning_footer_widgets_bg':
					css = elearningGenerateBackgroundCSS(
						'.tg-site-footer-widgets',
						value,
					);
					break;

				case 'elearning_footer_widgets_border_top_width':
					css = elearningGenerateSliderCSS(
						'.tg-site-footer .tg-site-footer-widgets',
						'border-top-width',
						value,
					);
					break;

				case 'elearning_footer_widgets_border_top_color':
					css = elearningGenerateCommonCSS(
						'.tg-site-footer .tg-site-footer-widgets',
						'border-top-color',
						value,
					);
					break;

				case 'elearning_footer_widgets_text_color':
					css = elearningGenerateCommonCSS(
						'.tg-site-footer .tg-site-footer-widgets, .tg-site-footer .tg-site-footer-widgets p',
						'color',
						value,
					);
					break;

				case 'elearning_footer_widgets_link_color':
					css = elearningGenerateCommonCSS(
						'.tg-site-footer .tg-site-footer-widgets a',
						'color',
						value,
					);
					break;

				case 'elearning_footer_widgets_link_hover_color':
					css = elearningGenerateCommonCSS(
						'.tg-site-footer .tg-site-footer-widgets a:hover, .tg-site-footer .tg-site-footer-widgets a:focus',
						'color',
						value,
					);
					break;

				case 'elearning_footer_widgets_title_color':
					css = elearningGenerateCommonCSS(
						'.tg-site-footer .tg-site-footer-widgets .widget-title',
						'color',
						value,
					);
					break;

				case 'elearning_footer_widgets_item_border_bottom_width':
					css = elearningGenerateSliderCSS(
						'.tg-site-footer .tg-site-footer-widgets ul li',
						'border-bottom-width',
						value,
					);
					break;

				case 'elearning_footer_widgets_item_border_bottom_color':
					css = elearningGenerateCommonCSS(
						'.tg-site-footer .tg-site-footer-widgets ul li',
						'border-bottom-color',
						value,
					);
					break;

				case 'elearning_footer_bar_bg':
					css = elearningGenerateBackgroundCSS(
						'.tg-site-footer .tg-site-footer-bar',
						value,
					);
					break;

				case 'elearning_footer_bar_border_top_width':
					css = elearningGenerateSliderCSS(
						'.tg-site-footer .tg-site-footer-bar',
						'border-top-width',
						value,
					);
					break;

				case 'elearning_footer_bar_border_top_color':
					css = elearningGenerateCommonCSS(
						'.tg-site-footer .tg-site-footer-bar',
						'border-top-color',
						value,
					);
					break;

				case 'elearning_footer_bar_text_color':
					css = elearningGenerateCommonCSS(
						'.tg-site-footer .tg-site-footer-bar',
						'color',
						value,
					);
					break;

				case 'elearning_footer_bar_link_color':
					css = elearningGenerateCommonCSS(
						'.tg-site-footer .tg-site-footer-bar a',
						'color',
						value,
					);
					break;

				case 'elearning_footer_bar_link_hover_color':
					css = elearningGenerateCommonCSS(
						'.tg-site-footer .tg-site-footer-bar a:hover, .tg-site-footer .tg-site-footer-bar a:focus',
						'color',
						value,
					);
					break;

				case 'elearning_scroll_to_top_bg_color':
					css = elearningGenerateCommonCSS(
						'.tg-scroll-to-top',
						'background-color',
						value,
					);
					break;

				case 'elearning_scroll_to_top_bg_hover_color':
					css = elearningGenerateCommonCSS(
						'.tg-scroll-to-top:hover',
						'background-color',
						value,
					);
					break;

				case 'elearning_scroll_to_top_color':
					css = elearningGenerateCommonCSS('.tg-scroll-to-top', 'color', value);
					break;

				case 'elearning_scroll_to_top_hover_color':
					css = elearningGenerateCommonCSS(
						'.tg-scroll-to-top:hover',
						'color',
						value,
					);
					break;

				case 'elearning_typography_widget_heading':
					css = elearningGenerateTypographyCSS(
						id,
						'.widget .widget-title',
						value,
					);
					break;

				// Builder options.
				case 'elearning_header_top_area_height':
					css = elearningGenerateSliderCSS(
						'.tg-header-builder .tg-top-row',
						'height',
						value,
					);
					break;

				case 'elearning_header_top_area_container':
					css = elearningGenerateSliderCSS(
						'.tg-header-builder .tg-header-top-row .tg-container',
						'max-width',
						value,
					);
					break;

				case 'elearning_header_top_area_background':
					css = elearningGenerateBackgroundCSS(
						'.tg-header-builder .tg-header-top-row',
						value,
					);
					break;

				case 'elearning_header_top_area_padding':
					css = elearningGenerateDimensionCSS(
						'.tg-header-builder .tg-header-top-row',
						'padding',
						value,
					);
					break;

				case 'elearning_header_top_area_border_width':
					css = elearningGenerateDimensionCSS(
						'.tg-header-builder .tg-header-top-row',
						'border-width',
						value,
					);
					css += elearningGenerateCommonCSS(
						'.tg-header-builder .tg-header-top-row',
						'border-style',
						'solid',
					);
					break;

				case 'elearning_header_top_area_border_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-header-top-row',
						'border-color',
						value,
					);
					break;

				case 'elearning_header_top_area_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-header-top-row',
						'color',
						value,
					);
					break;

				case 'elearning_header_main_area_height':
					css = elearningGenerateSliderCSS(
						'.tg-header-builder .tg-main-row',
						'height',
						value,
					);
					break;

				case 'elearning_header_main_area_container':
					css = elearningGenerateSliderCSS(
						'.tg-header-builder .tg-header-main-row .tg-container',
						'max-width',
						value,
					);
					break;

				case 'elearning_header_main_area_background':
					css = elearningGenerateBackgroundCSS(
						'.tg-header-builder .tg-header-main-row',
						value,
					);
					break;

				case 'elearning_header_main_area_padding':
					css = elearningGenerateDimensionCSS(
						'.tg-header-builder .tg-header-main-row',
						'padding',
						value,
					);
					break;

				case 'elearning_header_main_area_margin':
					css = elearningGenerateDimensionCSS(
						'.tg-header-builder .tg-header-main-row',
						'margin',
						value,
					);
					break;

				case 'elearning_header_main_area_border_width':
					css = elearningGenerateDimensionCSS(
						'.tg-header-builder .tg-header-main-row',
						'border-width',
						value,
					);
					css += elearningGenerateCommonCSS(
						'.tg-header-builder .tg-header-main-row',
						'border-style',
						'solid',
					);
					break;

				case 'elearning_header_main_area_border_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-header-main-row',
						'border-color',
						value,
					);
					break;

				case 'elearning_header_main_area_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-header-main-row',
						'color',
						value,
					);
					break;

				case 'elearning_header_bottom_area_height':
					css = elearningGenerateSliderCSS(
						'.tg-header-builder .tg-bottom-row',
						'height',
						value,
					);
					break;

				case 'elearning_header_bottom_area_container':
					css = elearningGenerateSliderCSS(
						'.tg-header-builder .tg-header-bottom-row .tg-container',
						'max-width',
						value,
					);
					break;

				case 'elearning_header_bottom_area_background':
					css = elearningGenerateBackgroundCSS(
						'.tg-header-builder .tg-header-bottom-row',
						value,
					);
					break;

				case 'elearning_header_bottom_area_padding':
					css = elearningGenerateDimensionCSS(
						'.tg-header-builder .tg-header-bottom-row',
						'padding',
						value,
					);
					break;

				case 'elearning_header_bottom_area_margin':
					css = elearningGenerateDimensionCSS(
						'.tg-header-builder .tg-header-bottom-row',
						'margin',
						value,
					);
					break;

				case 'elearning_header_bottom_area_border_width':
					css = elearningGenerateDimensionCSS(
						'.tg-header-builder .tg-header-bottom-row',
						'border-width',
						value,
					);
					css += elearningGenerateCommonCSS(
						'.tg-header-builder .tg-header-bottom-row',
						'border-style',
						'solid',
					);
					break;

				case 'elearning_header_bottom_area_border_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-header-bottom-row',
						'border-color',
						value,
					);
					break;

				case 'elearning_header_bottom_area_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-header-bottom-row',
						'color',
						value,
					);
					break;

				case 'elearning_header_menu_border_bottom_width':
					css = elearningGenerateSliderCSS(
						'.tg-header-builder .tg-main-nav',
						'border-bottom-width',
						value,
					);
					break;

				case 'elearning_header_secondary_menu_border_bottom_width':
					css = elearningGenerateSliderCSS(
						'.tg-header-builder .tg-secondary-nav',
						'border-bottom-width',
						value,
					);
					break;

				case 'elearning_header_tertiary_menu_border_bottom_width':
					css = elearningGenerateSliderCSS(
						'.tg-header-builder .tg-tertiary-nav',
						'border-bottom-width',
						value,
					);
					break;

				case 'elearning_header_menu_border_bottom_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-main-nav',
						'border-color',
						value,
					);
					break;

				case 'elearning_header_secondary_menu_border_bottom_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-secondary-nav',
						'border-color',
						value,
					);
					break;

				case 'elearning_header_tertiary_menu_border_bottom_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-tertiary-nav',
						'border-color',
						value,
					);
					break;

				case 'elearning_header_main_menu_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-primary-nav ul li > a, .tg-header-builder .tg-main-nav.tg-primary-nav ul.tg-primary-menu > li > a, .tg-header-builder .tg-primary-nav.tg-menu-item--layout-2 > ul > li > a',
						'color',
						value,
					);
					css += elearningGenerateCommonCSS(
						'.tg-header-builder .tg-primary-nav ul li > a .tg-icon, .tg-header-builder .tg-main-nav.tg-primary-nav ul.tg-primary-menu li .tg-icon, .tg-header-builder .tg-primary-nav.tg-menu-item--layout-2 > ul > li > .tg-icon',
						'fill',
						value,
					);
					break;

				case 'elearning_header_secondary_menu_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-secondary-nav ul li > a, .tg-header-builder .tg-main-nav.tg-secondary-nav ul.tg-secondary-menu > li > a, .tg-header-builder .tg-secondary-nav.tg-menu-item--layout-2 > ul > li > a',
						'color',
						value,
					);
					css += elearningGenerateCommonCSS(
						'.tg-header-builder .tg-secondary-nav ul li > a .tg-icon, .tg-header-builder .tg-main-nav.tg-secondary-nav ul.tg-secondary-menu li .tg-icon, .tg-header-builder .tg-secondary-nav.tg-menu-item--layout-2 > ul > li > .tg-icon',
						'fill',
						value,
					);
					break;

				case 'elearning_header_tertiary_menu_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-tertiary-nav ul li > a, .tg-header-builder .tg-main-nav.tg-tertiary-nav ul.tg-tertiary-menu > li > a, .tg-header-builder .tg-tertiary-nav.tg-menu-item--layout-2 > ul > li > a',
						'color',
						value,
					);
					css += elearningGenerateCommonCSS(
						'.tg-header-builder .tg-tertiary-nav ul li > a .tg-icon, .tg-header-builder .tg-main-nav.tg-tertiary-nav ul.tg-tertiary-menu li .tg-icon, .tg-header-builder .tg-tertiary-nav.tg-menu-item--layout-2 > ul > li > .tg-icon',
						'fill',
						value,
					);
					break;

				case 'elearning_header_quaternary_menu_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-quaternary-nav ul li > a, .tg-header-builder .tg-main-nav.tg-quaternary-nav ul.tg-quaternary-menu > li > a, .tg-header-builder .tg-quaternary-nav.tg-menu-item--layout-2 > ul > li > a',
						'color',
						value,
					);
					css += elearningGenerateCommonCSS(
						'.tg-header-builder .tg-quaternary-nav ul li > a .tg-icon, .tg-header-builder .tg-main-nav.tg-quaternary-nav ul.tg-quaternary-menu li .tg-icon, .tg-header-builder .tg-quaternary-nav.tg-menu-item--layout-2 > ul > li > .tg-icon',
						'fill',
						value,
					);
					break;

				case 'elearning_header_main_menu_hover_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-primary-nav ul li:hover > a, .tg-header-builder .tg-primary-nav.tg-menu-item--layout-2 > ul > li:hover > a, .tg-header-builder .tg-primary-nav ul li:hover > a, .tg-header-builder .tg-main-nav.tg-primary-nav ul.tg-primary-menu li:hover > a',
						'color',
						value,
					);
					css += elearningGenerateCommonCSS(
						'.tg-header-builder .tg-primary-nav ul li:hover > .tg-icon, .tg-header-builder .tg-primary-nav.tg-menu-item--layout-2 > ul > li:hover > .tg-icon',
						'fill',
						value,
					);
					break;

				case 'elearning_header_secondary_menu_hover_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-secondary-nav ul li:hover > a, .tg-header-builder .tg-secondary-nav.tg-menu-item--layout-2 > ul > li:hover > a, .tg-header-builder .tg-secondary-nav ul li:hover > a, .tg-header-builder .tg-main-nav.tg-secondary-nav ul.tg-secondary-menu li:hover > a',
						'color',
						value,
					);
					css += elearningGenerateCommonCSS(
						'.tg-header-builder .tg-secondary-nav ul li:hover > .tg-icon, .tg-header-builder .tg-secondary-nav.tg-menu-item--layout-2 > ul > li:hover > .tg-icon',
						'fill',
						value,
					);
					break;

				case 'elearning_header_tertiary_menu_hover_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-tertiary-nav ul li:hover > a, .tg-header-builder .tg-tertiary-nav.tg-menu-item--layout-2 > ul > li:hover > a, .tg-header-builder .tg-tertiary-nav ul li:hover > a, .tg-header-builder .tg-main-nav.tg-tertiary-nav ul.tg-tertiary-menu li:hover > a',
						'color',
						value,
					);
					css += elearningGenerateCommonCSS(
						'.tg-header-builder .tg-tertiary-nav ul li:hover > .tg-icon, .tg-header-builder .tg-tertiary-nav.tg-menu-item--layout-2 > ul > li:hover > .tg-icon',
						'fill',
						value,
					);
					break;

				case 'elearning_header_quaternary_menu_hover_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-quaternary-nav ul li:hover > a, .tg-header-builder .tg-quaternary-nav.tg-menu-item--layout-2 > ul > li:hover > a, .tg-header-builder .tg-quaternary-nav ul li:hover > a, .tg-header-builder .tg-main-nav.tg-quaternary-nav ul.tg-quaternary-menu li:hover > a',
						'color',
						value,
					);
					css += elearningGenerateCommonCSS(
						'.tg-header-builder .tg-quaternary-nav ul li:hover > .tg-icon, .tg-header-builder .tg-quaternary-nav.tg-menu-item--layout-2 > ul > li:hover > .tg-icon',
						'fill',
						value,
						value,
					);
					break;

				case 'elearning_header_main_menu_active_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-primary-nav ul li:active > a, .tg-header-builder .tg-primary-nav ul > li:not(.tg-header-button).current_page_item > a, .tg-header-builder .tg-primary-nav ul > li:not(.tg-header-button).current_page_ancestor > a, .tg-header-builder .tg-primary-nav ul > li:not(.tg-header-button).current-menu-item > a, .tg-header-builder .tg-primary-nav ul > li:not(.tg-header-button).current-menu-ancestor > a',
						'color',
						value,
					);
					css += elearningGenerateCommonCSS(
						'.tg-header-builder .tg-primary-nav ul li.current-menu-item > a .tg-icon, .tg-header-builder .tg-main-nav.tg-primary-nav ul.tg-primary-menu li.current-menu-item .tg-icon',
						'fill',
						value,
					);
					break;

				case 'elearning_header_secondary_menu_active_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-secondary-nav ul li:active > a, .tg-header-builder .tg-secondary-nav ul > li:not(.tg-header-button).current_page_item > a, .tg-header-builder .tg-secondary-nav ul > li:not(.tg-header-button).current_page_ancestor > a, .tg-header-builder .tg-secondary-nav ul > li:not(.tg-header-button).current-menu-item > a, .tg-header-builder .tg-secondary-nav ul > li:not(.tg-header-button).current-menu-ancestor > a',
						'color',
						value,
					);
					css += elearningGenerateCommonCSS(
						'.tg-header-builder .tg-secondary-nav ul li.current-menu-item > a .tg-icon, .tg-header-builder .tg-main-nav.tg-secondary-nav ul.tg-secondary-menu li.current-menu-item .tg-icon',
						'fill',
						value,
					);
					break;

				case 'elearning_header_tertiary_menu_active_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-tertiary-nav ul li:active > a, .tg-header-builder .tg-tertiary-nav ul > li:not(.tg-header-button).current_page_item > a, .tg-header-builder .tg-tertiary-nav ul > li:not(.tg-header-button).current_page_ancestor > a, .tg-header-builder .tg-tertiary-nav ul > li:not(.tg-header-button).current-menu-item > a, .tg-header-builder .tg-tertiary-nav ul > li:not(.tg-header-button).current-menu-ancestor > a',
						'color',
						value,
					);
					css += elearningGenerateCommonCSS(
						'.tg-header-builder .tg-tertiary-nav ul li.current-menu-item > a .tg-icon, .tg-header-builder .tg-main-nav.tg-tertiary-nav ul.tg-tertiary-menu li.current-menu-item .tg-icon',
						'fill',
						value,
					);
					break;

				case 'elearning_header_quaternary_menu_active_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-quaternary-nav ul li:active > a, .tg-header-builder .tg-quaternary-nav ul > li:not(.tg-header-button).current_page_item > a, .tg-header-builder .tg-quaternary-nav ul > li:not(.tg-header-button).current_page_ancestor > a, .tg-header-builder .tg-quaternary-nav ul > li:not(.tg-header-button).current-menu-item > a, .tg-header-builder .tg-quaternary-nav ul > li:not(.tg-header-button).current-menu-ancestor > a',
						'color',
						value,
					);
					css += elearningGenerateCommonCSS(
						'.tg-header-builder .tg-quaternary-nav ul li.current-menu-item > a .tg-icon, .tg-header-builder .tg-main-nav.tg-quaternary-nav ul.tg-quaternary-menu li.current-menu-item .tg-icon',
						'fill',
						value,
					);
					break;

				case 'elearning_header_main_menu_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-header-builder .tg-primary-nav ul li a',
						value,
					);
					break;

				case 'elearning_header_secondary_menu_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-header-builder .tg-secondary-nav ul li a',
						value,
					);
					break;

				case 'elearning_header_tertiary_menu_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-header-builder .tg-tertiary-nav ul li a',
						value,
					);
					break;

				case 'elearning_header_quaternary_menu_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-header-builder .tg-quaternary-nav ul li a',
						value,
					);
					break;

				case 'elearning_header_sub_menu_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-header-builder .tg-primary-nav ul li ul li a',
						value,
					);
					break;

				case 'elearning_header_secondary_sub_menu_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-header-builder .tg-secondary-nav ul li ul li a',
						value,
					);
					break;

				case 'elearning_header_search_icon_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-header-search__toggle .tg-icon-search',
						'color',
						value,
					);
					break;

				case 'elearning_header_search_background':
					css = elearningGenerateBackgroundCSS(
						'.tg-header-builder .search-field',
						value,
					);
					break;

				case 'elearning_header_search_text_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .search-form .search-field, .tg-header-builder .search-form .search-field:focus',
						'color',
						value,
					);
					css += elearningGenerateCommonCSS(
						'.tg-header-builder .tg-header-search__toggle .tg-icon-search',
						'fill',
						value,
					);
					break;

				case 'elearning_header_button_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-header-buttons .tg-header-button .tg-button',
						'color',
						value,
					);
					break;

				case 'elearning_header_button_typography':
					css = elearningGenerateTypographyCSS(
						id,
						`.tg-header-builder .tg-header-buttons .tg-header-button .tg-button`,
						value,
					);
					break;

				case 'elearning_button_typography':
					css = elearningGenerateTypographyCSS(
						id,
						`button, input[type="button"], input[type="reset"], input[type="submit"], .wp-block-button .wp-block-button__link`,
						value,
					);
					break;

				case 'elearning_header_button_hover_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-header-buttons .tg-header-button .tg-button:hover',
						'color',
						value,
					);
					break;

				case 'elearning_header_button_background_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-header-buttons .tg-header-button .tg-button',
						'background-color',
						value,
					);
					break;

				case 'elearning_header_button_background_hover_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-header-buttons .tg-header-button .tg-button:hover',
						'background-color',
						value,
					);
					break;

				case 'elearning_header_button_padding':
					css = elearningGenerateDimensionCSS(
						'.tg-header-builder .tg-header-buttons .tg-header-button .tg-button',
						'padding',
						value,
					);
					break;

				case 'elearning_header_button_border_radius':
					css = elearningGenerateSliderCSS(
						'.tg-header-builder .tg-header-buttons .tg-header-button .tg-button',
						'border-radius',
						value,
					);
					break;

				case 'elearning_header_button_border_width':
					css = elearningGenerateDimensionCSS(
						'.tg-header-builder .tg-header-buttons .tg-header-button .tg-button',
						'border-width',
						value,
					);
					break;

				case 'elearning_header_button_border_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-header-buttons .tg-header-button .tg-button',
						'border-color',
						value,
					);
					break;

				case 'elearning_header_html_1_text_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-html-1',
						'color',
						value,
					);
					break;

				case 'elearning_header_html_1_link_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-html-1 a',
						'color',
						value,
					);
					break;

				case 'elearning_header_html_1_link_hover_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-html-1 a:hover',
						'color',
						value,
					);
					break;

				case 'elearning_header_html_1_font_size':
					css = elearningGenerateSliderCSS(
						'.tg-header-builder .tg-html-1 *',
						'font-size',
						value,
					);
					break;

				case 'elearning_header_html_1_margin':
					css = elearningGenerateDimensionCSS(
						'.tg-header-builder .tg-html-1',
						'margin',
						value,
					);
					break;

				case 'elearning_header_html_2_text_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-html-2',
						'color',
						value,
					);
					break;

				case 'elearning_header_html_2_link_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-html-2 a',
						'color',
						value,
					);
					break;

				case 'elearning_header_html_2_link_hover_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-html-2 a:hover',
						'color',
						value,
					);
					break;

				case 'elearning_header_html_2_font_size':
					css = elearningGenerateSliderCSS(
						'.tg-header-builder .tg-html-2 p',
						'font-size',
						value,
					);
					break;

				case 'elearning_header_html_2_margin':
					css = elearningGenerateDimensionCSS(
						'.tg-header-builder .tg-html-2',
						'margin',
						value,
					);
					break;

				case 'elearning_footer_top_area_height':
					css = elearningGenerateSliderCSS(
						'.tg-footer-builder .tg-top-row',
						'height',
						value,
					);
					break;

				case 'elearning_footer_top_area_container':
					css = elearningGenerateSliderCSS(
						'.tg-footer-builder .tg-footer-top-row .tg-container',
						'max-width',
						value,
					);
					break;

				case 'elearning_footer_top_area_background':
					css = elearningGenerateBackgroundCSS(
						'.tg-footer-builder .tg-footer-top-row',
						value,
					);
					break;

				case 'elearning_footer_top_area_padding':
					css = elearningGenerateDimensionCSS(
						'.tg-footer-builder .tg-footer-top-row',
						'padding',
						value,
					);
					break;

				case 'elearning_footer_top_area_margin':
					css = elearningGenerateDimensionCSS(
						'.tg-footer-builder .tg-footer-top-row',
						'margin',
						value,
					);
					break;

				case 'elearning_footer_top_area_border_width':
					css = elearningGenerateDimensionCSS(
						'.tg-footer-builder .tg-footer-top-row',
						'border-width',
						value,
					);
					css += elearningGenerateCommonCSS(
						'.tg-footer-builder .tg-footer-top-row',
						'border-style',
						'solid',
					);
					break;

				case 'elearning_footer_top_area_border_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .tg-footer-top-row',
						'border-color',
						value,
					);
					break;

				case 'elearning_footer_main_area_height':
					css = elearningGenerateSliderCSS(
						'.tg-footer-builder .tg-main-row',
						'height',
						value,
					);
					break;

				case 'elearning_footer_main_area_container':
					css = elearningGenerateSliderCSS(
						'.tg-footer-builder .tg-footer-main-row .tg-container',
						'max-width',
						value,
					);
					break;

				case 'elearning_footer_main_area_background':
					css = elearningGenerateBackgroundCSS(
						'.tg-footer-builder .tg-footer-main-row',
						value,
					);
					break;
				case 'elearning_footer_main_area_padding':
					css = elearningGenerateDimensionCSS(
						'.tg-footer-builder .tg-footer-main-row',
						'padding',
						value,
					);
					break;
				case 'elearning_footer_main_area_margin':
					css = elearningGenerateDimensionCSS(
						'.tg-footer-builder .tg-footer-main-row',
						'margin',
						value,
					);
					break;
				case 'elearning_footer_main_area_border_width':
					css = elearningGenerateDimensionCSS(
						'.tg-footer-builder .tg-footer-main-row',
						'border-width',
						value,
					);
					css += elearningGenerateCommonCSS(
						'.tg-footer-builder .tg-footer-main-row',
						'border-style',
						'solid',
					);
					break;
				case 'elearning_footer_main_area_border_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .tg-footer-main-row',
						'border-color',
						value,
					);
					break;
				case 'elearning_footer_bottom_area_height':
					css = elearningGenerateSliderCSS(
						'.tg-footer-builder .tg-bottom-row',
						'height',
						value,
					);
					break;
				case 'elearning_footer_bottom_area_container':
					css = elearningGenerateSliderCSS(
						'.tg-footer-builder .tg-footer-bottom-row .tg-container',
						'max-width',
						value,
					);
					break;
				case 'elearning_footer_bottom_area_background':
					css = elearningGenerateBackgroundCSS(
						'.tg-footer-builder .tg-footer-bottom-row',
						value,
					);
					break;
				case 'elearning_footer_bottom_area_padding':
					css = elearningGenerateDimensionCSS(
						'.tg-footer-builder .tg-footer-bottom-row',
						'padding',
						value,
					);
					break;
				case 'elearning_footer_bottom_area_margin':
					css = elearningGenerateDimensionCSS(
						'.tg-footer-builder .tg-footer-bottom-row',
						'margin',
						value,
					);
					break;
				case 'elearning_footer_bottom_area_border_width':
					css = elearningGenerateDimensionCSS(
						'.tg-footer-builder .tg-footer-bottom-row',
						'border-width',
						value,
					);
					css += elearningGenerateCommonCSS(
						'.tg-footer-builder .tg-footer-bottom-row',
						'border-style',
						'solid',
					);
					break;
				case 'elearning_footer_bottom_area_border_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .tg-footer-bottom-row',
						'border-color',
						value,
					);
					break;
				case 'elearning_site_logo_height':
					css = elearningGenerateSliderCSS(
						'.site-branding .custom-logo-link img',
						'max-width',
						value,
					);
					break;
				case 'elearning_site_identity_color':
					css = elearningGenerateCommonCSS('.site-title', 'color', value);
					break;
				case 'elearning_site_title_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.site-branding .site-title',
						value,
					);
					break;
				case 'elearning_site_tagline_color':
					css = elearningGenerateCommonCSS('.site-description', 'color', value);
					break;
				case 'elearning_site_tagline_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.site-branding .site-description',
						value,
					);
					break;
				case 'elearning_widget_1_title_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .widget.widget-header-top-left-sidebar .widget-title',
						'color',
						value,
					);
					break;
				case 'elearning_widget_1_title_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-header-builder .widget.widget-header-top-left-sidebar .widget-title',
						value,
					);
					break;
				case 'elearning_widget_1_content_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .widget.widget-header-top-left-sidebar',
						'color',
						value,
					);
					break;
				case 'elearning_widget_1_link_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .widget.widget-header-top-left-sidebar a',
						'color',
						value,
					);
					break;
				case 'elearning_widget_1_content_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-header-builder .widget.widget-header-top-left-sidebar',
						value,
					);
					break;
				case 'elearning_widget_2_title_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .widget.widget-header-top-right-sidebar .widget-title',
						'color',
						value,
					);
					break;
				case 'elearning_widget_2_title_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-header-builder .widget.widget-header-top-right-sidebar .widget-title',
						value,
					);
					break;
				case 'elearning_widget_2_content_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .widget.widget-header-top-right-sidebar',
						'color',
						value,
					);
					break;
				case 'elearning_widget_2_link_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .widget.widget-header-top-right-sidebar a',
						'color',
						value,
					);
					break;
				case 'elearning_widget_2_content_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-header-builder .widget.widget-header-top-right-sidebar',
						value,
					);
					break;
				case 'elearning_header_mobile_menu_item_color':
					css = elearningGenerateCommonCSS('.tg-mobile-nav a', 'color', value);
					css += elearningGenerateCommonCSS(
						'.tg-mobile-nav li.page_item_has_children .tg-submenu-toggle .tg-icon, .tg-mobile-nav li.menu-item-has-children .tg-submenu-toggle .tg-icon',
						'fill',
						value,
					);
					break;
				case 'elearning_header_mobile_menu_item_hover_color':
					css = elearningGenerateCommonCSS(
						'.tg-mobile-nav li:hover > a',
						'color',
						value,
					);
					break;
				case 'elearning_header_mobile_menu_item_active_color':
					css = elearningGenerateCommonCSS(
						'.tg-mobile-nav .current_page_item a, .tg-mobile-nav > .menu ul li.current-menu-item > a',
						'color',
						value,
					);
					break;
				case 'elearning_header_mobile_menu_background':
					css = elearningGenerateCommonCSS(
						'.tg-mobile-nav, .search-form .search-field,.tg-mobile-navigation',
						'background-color',
						value,
					);
					break;
				case 'elearning_header_mobile_menu_item_border_bottom':
					css = elearningGenerateSliderCSS(
						'.tg-mobile-nav li:not(:last-child)',
						'border-bottom-width',
						value,
					);
					break;
				case 'elearning_header_mobile_menu_item_border_bottom_style':
					css = elearningGenerateCommonCSS(
						'.tg-mobile-nav li',
						'border-bottom-style',
						value,
					);
					break;
				case 'elearning_header_mobile_menu_item_border_bottom_color':
					css = elearningGenerateCommonCSS(
						'.tg-mobile-nav li',
						'border-color',
						value,
					);
					break;

				case 'elearning_footer_html_1_text_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .tg-html-1 *',
						'color',
						value,
					);
					break;
				case 'elearning_footer_html_1_link_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .tg-html-1 a',
						'color',
						value,
					);
					break;
				case 'elearning_footer_html_1_link_hover_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .tg-html-1 a:hover',
						'color',
						value,
					);
					break;
				case 'elearning_footer_html_1_font_size':
					css = elearningGenerateSliderCSS(
						'.tg-footer-builder .tg-html-1 *',
						'font-size',
						value,
					);
					break;
				case 'elearning_footer_html_1_margin':
					css = elearningGenerateDimensionCSS(
						'.tg-footer-builder .tg-html-1',
						'margin',
						value,
					);
					break;
				case 'elearning_footer_html_2_text_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .tg-html-2 *',
						'color',
						value,
					);
					break;
				case 'elearning_footer_html_2_link_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .tg-html-2 a',
						'color',
						value,
					);
					break;
				case 'elearning_footer_html_2_link_hover_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .tg-html-2 a:hover',
						'color',
						value,
					);
					break;
				case 'elearning_footer_html_2_font_size':
					css = elearningGenerateSliderCSS(
						'.tg-footer-builder .tg-html-2 *',
						'font-size',
						value,
					);
					break;
				case 'elearning_footer_html_2_margin':
					css = elearningGenerateDimensionCSS(
						'.tg-footer-builder .tg-html-2',
						'margin',
						value,
					);
					break;
				case 'elearning_footer_widget_1_title_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .widget.widget-footer-sidebar-1 .widget-title',
						'color',
						value,
					);
					break;
				case 'elearning_footer_widget_1_title_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-footer-builder .widget.widget-footer-sidebar-1 .widget-title',
						value,
					);
					break;
				case 'elearning_footer_widget_1_content_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .widget.widget-footer-sidebar-1',
						'color',
						value,
					);
					break;
				case 'elearning_footer_widget_1_link_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .widget.widget-footer-sidebar-1 a',
						'color',
						value,
					);
					break;
				case 'elearning_cart_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .tg-icon--cart',
						'fill',
						value,
					);
					break;
				case 'elearning_footer_widget_1_content_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-footer-builder .widget.widget-footer-sidebar-1',
						value,
					);
					break;
				case 'elearning_footer_widget_2_title_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .widget.widget-footer-sidebar-2 .widget-title',
						'color',
						value,
					);
					break;
				case 'elearning_footer_widget_2_title_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-footer-builder .widget.widget-footer-sidebar-2 .widget-title',
						value,
					);
					break;
				case 'elearning_footer_widget_2_content_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .widget.widget-footer-sidebar-2',
						'color',
						value,
					);
					break;
				case 'elearning_footer_widget_2_link_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .widget.widget-footer-sidebar-2 a',
						'color',
						value,
					);
					break;
				case 'elearning_footer_widget_2_content_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-footer-builder .widget.widget-footer-sidebar-2',
						value,
					);
					break;
				case 'elearning_footer_widget_3_title_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .widget.widget-footer-sidebar-3 .widget-title',
						'color',
						value,
					);
					break;
				case 'elearning_footer_widget_3_title_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-footer-builder .widget.widget-footer-sidebar-3 .widget-title',
						value,
					);
					break;
				case 'elearning_footer_widget_3_content_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .widget.widget-footer-sidebar-3',
						'color',
						value,
					);
					break;
				case 'elearning_footer_widget_3_link_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .widget.widget-footer-sidebar-3 a',
						'color',
						value,
					);
					break;
				case 'elearning_footer_widget_3_content_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-footer-builder .widget.widget-footer-sidebar-3',
						value,
					);
					break;
				case 'elearning_footer_widget_4_title_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .widget.widget-footer-sidebar-4 .widget-title',
						'color',
						value,
					);
					break;
				case 'elearning_footer_widget_4_title_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-footer-builder .widget.widget-footer-sidebar-4 .widget-title',
						value,
					);
					break;
				case 'elearning_footer_widget_4_content_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .widget.widget-footer-sidebar-4',
						'color',
						value,
					);
					break;
				case 'elearning_footer_widget_4_link_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .widget.widget-footer-sidebar-4 a',
						'color',
						value,
					);
					break;
				case 'elearning_footer_widget_4_content_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-footer-builder .widget.widget-footer-sidebar-4',
						value,
					);
					break;
				case 'elearning_footer_menu_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .tg-footer-nav ul li a',
						'color',
						value,
					);
					break;
				case 'elearning_footer_menu_hover_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .tg-footer-nav ul li a:hover',
						'color',
						value,
					);
					break;
				case 'elearning_footer_menu_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-footer-builder .tg-footer-nav ul li a',
						value,
					);
					break;
				case 'elearning_footer_menu_2_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .tg-footer-nav-2 ul li a',
						'color',
						value,
					);
					break;
				case 'elearning_footer_menu_2_hover_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .tg-footer-nav-2 ul li a:hover',
						'color',
						value,
					);
					break;
				case 'elearning_footer_menu_2_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-footer-builder .tg-footer-nav-2 ul li a',
						value,
					);
					break;
				case 'elearning_footer_copyright_text_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .tg-copyright',
						'color',
						value,
					);
					break;
				case 'elearning_footer_copyright_link_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .tg-copyright a',
						'color',
						value,
					);
					break;
				case 'elearning_footer_copyright_link_hover_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .tg-copyright a:hover',
						'color',
						value,
					);
					break;
				case 'elearning_footer_copyright_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-footer-builder .tg-copyright',
						value,
					);
					break;
				case 'elearning_footer_copyright_margin':
					css = elearningGenerateDimensionCSS(
						'.tg-footer-builder .tg-copyright',
						'margin',
						value,
					);
					break;
				case 'elearning_header_site_logo_height':
					css = elearningGenerateSliderCSS(
						'.tg-header-builder .site-branding .custom-logo-link img',
						'width',
						value,
					);
					break;
				case 'elearning_header_site_identity_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .site-title, .tg-header-builder .site-title a',
						'color',
						value,
					);
					break;
				case 'elearning_header_site_title_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-header-builder .site-title',
						value,
					);
					break;
				case 'elearning_header_site_tagline_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder .site-description',
						'color',
						value,
					);
					break;
				case 'elearning_header_site_tagline_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-header-builder .site-description',
						value,
					);
					break;
				case 'elearning_footer_bottom_area_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .tg-footer-bottom-row',
						'color',
						value,
					);
					break;
				case 'elearning_footer_top_area_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .tg-footer-top-row',
						'color',
						value,
					);
					break;
				case 'elearning_footer_main_area_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .tg-footer-main-row',
						'color',
						value,
					);
					break;
				case 'elearning_footer_main_area_link_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .tg-footer-main-row a, .tg-footer-builder .tg-footer-main-row ul li a, .tg-footer-builder .tg-footer-main-row .widget ul li a',
						'color',
						value,
					);
					break;
				case 'elearning_footer_main_area_link_hover_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .tg-footer-main-row a, .tg-footer-builder .tg-footer-main-row ul li a:hover, .tg-footer-builder .tg-footer-main-row .widget ul li a:hover',
						'color',
						value,
					);
					break;
				case 'elearning_footer_main_area_widget_title_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .tg-footer-main-row .widget-title, .tg-footer-builder .tg-footer-main-row h1, .tg-footer-builder .tg-footer-main-row h2, .tg-footer-builder .tg-footer-main-row h3, .tg-footer-builder .tg-footer-main-row h4, .tg-footer-builder .tg-footer-main-row h5, .tg-footer-builder .tg-footer-main-row h6',
						'color',
						value,
					);
					break;
				case 'elearning_header_builder_background':
					css = elearningGenerateBackgroundCSS('.tg-header-builder', value);
					break;
				case 'elearning_header_builder_border_width':
					css = elearningGenerateDimensionCSS(
						'.tg-header-builder',
						'border-width',
						value,
					);
					css += elearningGenerateCommonCSS(
						'.tg-header-builder',
						'border-style',
						'solid',
					);
					break;
				case 'elearning_header_builder_border_color':
					css = elearningGenerateCommonCSS(
						'.tg-header-builder',
						'border-color',
						value,
					);
					break;
				case 'elearning_footer_widget_5_title_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .widget.widget-footer-bar-left-sidebar .widget-title',
						'color',
						value,
					);
					break;
				case 'elearning_footer_widget_5_title_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-footer-builder .widget.widget-footer-bar-left-sidebar .widget-title',
						value,
					);
					break;
				case 'elearning_footer_widget_5_content_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .widget.widget-footer-bar-left-sidebar',
						'color',
						value,
					);
					break;
				case 'elearning_footer_widget_5_link_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .widget.widget-footer-bar-left-sidebar a',
						'color',
						value,
					);
					break;
				case 'elearning_footer_widget_5_content_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-footer-builder .widget.widget-footer-bar-left-sidebar',
						value,
					);
					break;
				case 'elearning_footer_widget_6_title_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .widget.widget-footer-bar-right-sidebar .widget-title',
						'color',
						value,
					);
					break;
				case 'elearning_footer_widget_6_title_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-footer-builder .widget.widget-footer-bar-right-sidebar .widget-title',
						value,
					);
					break;
				case 'elearning_footer_widget_6_content_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .widget.widget-footer-bar-right-sidebar',
						'color',
						value,
					);
					break;
				case 'elearning_footer_widget_6_link_color':
					css = elearningGenerateCommonCSS(
						'.tg-footer-builder .widget.widget-footer-bar-right-sidebar a',
						'color',
						value,
					);
					break;
				case 'elearning_footer_widget_6_content_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-footer-builder .widget.widget-footer-bar-right-sidebar',
						value,
					);
					break;
				case 'elearning_header_mobile_menu_typography':
					css = elearningGenerateTypographyCSS(
						id,
						'.tg-header-builder .tg-mobile-menu a',
						value,
					);
					break;
			}
			return css;
		},
	);

	wp.hooks.addAction(
		'customind.change.elearning_color_palette',
		'customind',
		function (newValue) {
			// Trigger the color palette change event
			jQuery(document).trigger('elearning_color_palette_changed', [newValue]);

			// Update WordPress preset color variables immediately
			if (newValue && newValue.colors) {
				const root = document.documentElement;
				Object.entries(newValue.colors).forEach(([key, colorValue]) => {
					root.style.setProperty('--wp--preset--color--' + key, colorValue);
				});
			}
		},
	);

	// Add customizer control change handler for elearning_color_palette
	wp.customize('elearning_color_palette', function (value) {
		value.bind(function (newValue) {
			// Update WordPress preset color variables immediately when palette changes
			if (newValue && newValue.colors) {
				const root = document.documentElement;
				Object.entries(newValue.colors).forEach(([key, colorValue]) => {
					root.style.setProperty('--wp--preset--color--' + key, colorValue);
				});
			}
		});
	});
})(jQuery);
