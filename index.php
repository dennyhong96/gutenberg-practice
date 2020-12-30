<?php
/**
 * Plugin Name: lilo-blocks
 * Description: blocks for lilo
 * Author: Denny Hong
 */

//  Prevent access to this file directly
if (!defined('ABSPATH')) {
  exit;
}

// Add block categories
function lilo_blocks_categories( $categories, $post ) {
  // $post is used to add category for specific post types
  return array_merge(
    $categories,
    array(
      array(
        'slug' => 'lilo-category',
        'title' => __('Lilo', 'lilo-blocks'),
        'icon' => 'wordpress'
      )
    )
  );
}
add_filter( 'block_categories', 'lilo_blocks_categories', 10, 2);

// Regsiter block helper
function lilo_blocks_register_block_type($block, $options = array()) {
  register_block_type(
    'lilo-blocks/'.$block,
    array_merge(
      array(
        'editor_script' => 'lilo-blocks-editor-script', // editor only
        'script' => 'lilo-blocks-script', // frontend + editor
        'editor_style' => 'lilo-blocks-editor-style', // editor only
        'style' => 'lilo-blocks-style' // frontend + editor
      ),
      $options
    )
  );
}

// Register blocks
function lilo_blocks_register() {

  // Register editor script
  wp_register_script(
    'lilo-blocks-editor-script', // Script handle
    plugins_url('dist/editor.js', __FILE__), // File Url
    array( 'wp-blocks', 'wp-block-editor', 'wp-i18n','wp-element', 'wp-editor', 'wp-components', 'wp-blob', 'wp-data' , 'wp-html-entities' , 'lodash' ) // Deps
  );
  // Register frontend script
  wp_register_script(
    'lilo-blocks-script', // Script handle
    plugins_url('dist/script.js', __FILE__), // File Url
    array('jquery')
  );

  // Register editor styles
  wp_register_style(
    'lilo-blocks-editor-style',
    plugins_url('dist/editor.css', __FILE__),
    array('wp-edit-blocks') // Depends on default stylesheet
  );
  // Register frontend styles
  wp_register_style(
    'lilo-blocks-style',
    plugins_url('dist/style.css', __FILE__)
  );

  // Register blocks
  lilo_blocks_register_block_type('section-header');
  lilo_blocks_register_block_type('big-bg');
  lilo_blocks_register_block_type('card-group');
}
add_action('init', 'lilo_blocks_register');

// Enqueue redux store script
function lilo_blocks_enqueue_assets() {
  wp_enqueue_script(
    'lilo-blocks-editor-js',
    plugins_url('dist/editor_script.js',__FILE__),
    array( 'wp-data', 'wp-plugins', 'wp-edit-post', 'wp-i18n', 'wp-components' )
  );
}
add_action( "enqueue_block_editor_assets", "lilo_blocks_enqueue_assets" );
?>
