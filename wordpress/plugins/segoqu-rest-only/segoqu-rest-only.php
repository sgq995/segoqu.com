<?php

/**
 * Plugin Name: REST Only
 * Description: Disable WordPress standalone frontend
 * Author: segoqu.com
 */

add_action('init', 'segoqu_rest_only_redirect_to_backend');

function segoqu_rest_only_redirect_to_backend() {
  if(
    !is_admin() &&
    !segoqu_rest_only_is_wplogin() &&
    !segoqu_rest_only_is_rest()
  ) {
    wp_redirect(site_url('wp-admin'));
    exit();
  }
}

/**
 * Checks if the current request is a WP REST API request.
 * 
 * Case #1: After WP_REST_Request initialisation
 * Case #2: Support "plain" permalink settings
 * Case #3: URL Path begins with wp-json/ (your REST prefix)
 *          Also supports WP installations in subfolders
 * 
 * @returns boolean
 * @author matzeeable
 */
function segoqu_rest_only_is_rest() {
  $prefix = rest_get_url_prefix( );
  
  if ((defined('REST_REQUEST') && REST_REQUEST)
    || isset($_GET['rest_route']))
    return true;

  // (#3)
  $rest_url = wp_parse_url( site_url( $prefix ) );
  $current_url = wp_parse_url( add_query_arg( array( ) ) );
  return strpos( $current_url['path'], $rest_url['path'], 0 ) === 0;
}

function segoqu_rest_only_is_wplogin(){
  $ABSPATH_MY = str_replace(array('\\','/'), DIRECTORY_SEPARATOR, ABSPATH);
  return ((in_array($ABSPATH_MY.'wp-login.php', get_included_files()) || in_array($ABSPATH_MY.'wp-register.php', get_included_files()) ) || (isset($_GLOBALS['pagenow']) && $GLOBALS['pagenow'] === 'wp-login.php') || $_SERVER['PHP_SELF']== '/wp-login.php');
}
