<?php

/**
 * Plugin Name: REST Security
 * Description: Require authorization for consuming REST API
 * Author: segoqu.com
 */

function segoqu_is_valid_secret() {
  if ( ! defined('API_SECRET') ) {
    return false;
  }

  if ( 
    isset($_SERVER['HTTP_X_SECRET']) 
    && $_SERVER['HTTP_X_SECRET'] === API_SECRET 
  ) {
    return true;
  }

  return false;
}

add_filter( 'rest_authentication_errors', function( $result ) {
  // If a previous authentication check was applied,
  // pass that result along without modification.
  if ( true === $result || is_wp_error( $result ) ) {
    return $result;
  }

  // No authentication has been performed yet.
  // Return an error if user is not logged in.
  if ( 
    ! is_user_logged_in() 
    && ! wp_verify_nonce( $_SERVER['HTTP_X_WP_NONCE'], 'wp_rest' )
    && ! segoqu_is_valid_secret()
  ) {
    $data = array(
      'status' => 401
    );

    return new WP_Error(
      'rest_not_logged_in',
      __( 'You are not currently logged in.' ),
      $data
    );
  }

  // Our custom authentication check should have no effect
  // on logged-in requests
  return $result;
});

function segoqu_security_nonce() {
  return array(
    'root' => esc_url_raw( rest_url() ),
    'nonce' => wp_create_nonce( 'wp_rest' ),
  );
}

add_action( 'rest_api_init', function () {
  register_rest_route( 'security/v1', '/nonce', array(
    'methods' => 'GET',
    'callback' => 'segoqu_security_nonce',
  ) );
} );
