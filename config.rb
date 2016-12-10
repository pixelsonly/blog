require 'contentful_middleman'
require 'lib/article_mapper'

# ------------------------------------------------------------------------------
# Middleman Configuration
# ------------------------------------------------------------------------------
activate :dotenv
activate :directory_indexes

config[:css_dir]     = '/assets/stylesheets'
config[:images_dir]  = '/assets/images'
config[:js_dir]      = '/assets/javascripts'

activate :external_pipeline,
  name: :webpack,
  command: build? ?
  "./node_modules/webpack/bin/webpack.js --bail -p" :
  "./node_modules/webpack/bin/webpack.js --watch -d --progress --color",
  source: ".tmp/dist",
  latency: 1

# ------------------------------------------------------------------------------
# Contentful Configuration
# ------------------------------------------------------------------------------
activate :contentful do |config|
  config.space = {
    blog: ENV['CONTENTFUL_SPACE']
  }
  config.access_token = ENV['CONTENTFUL_ACCESS_TOKEN']
  config.content_types = {
    post: {
      mapper: ArticleMapper, id: ENV['CONTENTFUL_MAPPER_POST_TYPE_ID']
    },
    category: ENV['CONTENTFUL_MAPPER_CATEGORY_TYPE_ID'],
    author: ENV['CONTENTFUL_MAPPER_AUTHOR_TYPE_ID']
  }
  config.cda_query = {
    content_type: ENV['CONTENTFUL_MAPPER_POST_TYPE_ID'],
    include: 3,
    order: 'fields.date'}
end

# ------------------------------------------------------------------------------
# After Middleman Configuration
# ------------------------------------------------------------------------------
after_configuration do
  # Generate a static page for each blog post stored in local data
  data.blog.post.each do |id, post|
    proxy "/articles/#{post.slug}/index.html", 'views/articles/show.html', locals: {post: post }, ignore: true
  end
end

# ------------------------------------------------------------------------------
# Development
# ------------------------------------------------------------------------------
configure :development do
  activate :livereload,
    no_swf: true,
    livereload_css_target: 'assets/stylesheets/app.css.scss',
    livereload_css_pattern: Regexp.new('_.*\.scss')
end

# ------------------------------------------------------------------------------
# Build
# ------------------------------------------------------------------------------
configure :build do
  ignore 'assets/javascripts/components'
  ignore 'assets/stylesheets/components'
  ignore 'assets/stylesheets/app.css.scss'

  config[:host] = "https://pixelsonly.com"

  activate :asset_hash
end

# ------------------------------------------------------------------------------
# Helpers
# ------------------------------------------------------------------------------
helpers do
  def author
    data.blog.post.first[1][:author].first
  end

  def all_posts
    data.blog.post.all
  end

  def recent_posts
    data.blog.post.first(3)
  end
end
