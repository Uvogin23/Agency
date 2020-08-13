<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'agencebd' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost:3306' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'a{+@Tc1h+E{^lJP}ATtwD5g}Z8H|;Jn6,5nPCb^M2:O^&&!K++ f{Mu-+25&lZxE');
define('SECURE_AUTH_KEY',  '}<(^lKx+q0-B&2K-t|+ 5a` e+Jx^VC_ %>3*tgix!mr.tT|+d@!gmZ=oA7<-tP@');
define('LOGGED_IN_KEY',    'j~=).L_S/=&|Y?EB.rFt{?V#56{gC.(eO4c.N:75GjG1M[%qYkh=WtJde:tAz-07');
define('NONCE_KEY',        '{a@1]<g#1U|KX|cnl.w5eul[i7>j$(NeW[]k7zeQ_BeGIRWd.2-Hw6L3>|MvC%q-');
define('AUTH_SALT',        '? 7CC+k`Ru2yUD7!  qyL3Q<,=l$8G&[1J9YkHb|%L(g%>RTjv}Za!:Vx2oYj5rU');
define('SECURE_AUTH_SALT', 'Us^$9Xv9e<FdK|s7IvK5AW1+[j^@b}Rg+3 KbxY:rc%o/vcIlvWT<dtZ*]N>Rv&}');
define('LOGGED_IN_SALT',   'C/g[wyM_0Bq5`vMnj!<mNe29K=`de~fj 1uF-!(j`+./RwN^1SNBH5n$a)qcp3iU');
define('NONCE_SALT',       '7uK;w<NH;>/)NF0%]{~|rq+DUNx-{8r24g^nxwLYzA+eK*j:KO!wLpI~7+o&(zu5');
/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
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
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
