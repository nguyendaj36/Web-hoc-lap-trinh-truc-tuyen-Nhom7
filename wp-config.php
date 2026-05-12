<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'studyhub_db' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'Ena68HO,GW34C_}izCV{YoHOO?qEGkmy#F=I3X@LLvS1pi?x`pI_g?*8NEFh~ijS' );
define( 'SECURE_AUTH_KEY',  'Tdyz+8Jx<<BQj*#_16lXN&&_GZHb`c!M$6o*2d9_Ljg~;^`M4Nqzoq##f%7P`2 ]' );
define( 'LOGGED_IN_KEY',    'o,8[UU5{.&YQo5_tJ]%N%v(q?j5-vm-d&$[ a.BIBxC^rb[!}%;a!q~cv|W3#*Hp' );
define( 'NONCE_KEY',        '8^OW-&*[d5~F/UkiW oJwi1G`geoIKgG7R!^.LVc(Ki3u*+tpL4TOe,mHL-awv}?' );
define( 'AUTH_SALT',        'h9;E|UoRHxWPi[vGLzU 7D,rLej4OsW8?V!n4q,d!zcc6dCf9Wz},0`0U-WJflYb' );
define( 'SECURE_AUTH_SALT', 'Hxp:DdA(:A#y7{/B^|,:^j[Wi#(GDk[9?HxN47/feRiL@`Ao]x0ABULt=pJXmNsD' );
define( 'LOGGED_IN_SALT',   'a(dNB6W^q]VKQL<cPP%Dfi3e}JV3J#y+]woqp[hj~IH`.<|Q#{yC% )OiO_S/3`F' );
define( 'NONCE_SALT',       'X{^7+d,A<c<A%$n.r:L;_G!5M=~7$-,q(&GMGG_xVoV[LH15ZqDRP(fOXwEQ^A!s' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
