require 'contentful_middleman'
require 'uglifier'

# ------------------------------------------------------------------------------
# Middleman Configuration
# ------------------------------------------------------------------------------
activate :dotenv
activate :syntax, line_numbers: true
activate :directory_indexes

config[:css_dir]           = '/assets/stylesheets'
config[:images_dir]        = '/assets/images'
config[:js_dir]            = '/assets/javascripts'
config[:sass_assets_paths] = ['node_modules/foundation-sites/scss']

set :haml, { ugly: true, format: :html5 }

set :markdown_engine, :kramdown
set :markdown, layout_engine: :haml,
               tables:              true,
               autolink:            true,
               smartypants:         true,
               fenced_code_blocks:  true

configure :development do
  config[:host] = 'http://localhost:4567'
  config[:sass_source_maps] = true

  activate :livereload,
    no_swf: true,
    livereload_css_target: 'assets/stylesheets/app.css.scss',
    livereload_css_pattern: Regexp.new('_.*\.scss')
end

configure :staging do
  config[:host] = 'https://staging.pixelsonly.com'
end

configure :production do
  config[:host] = 'https://pixelsonly.com'
end

ready do
  puts "Ready => #{config[:environment]} => #{config[:host]}"
end

after_configuration do
  data.articles.article.each do |id, article|
    proxy "/articles/#{article.slug}/index.html", 'articles/show.html', locals: {article: article}, ignore: true
  end
end

# ------------------------------------------------------------------------------
# Contentful Configuration
# ------------------------------------------------------------------------------
activate :contentful do |config|
  config.space = {
    articles: ENV['CONTENTFUL_SPACE']
  }
  config.access_token = ENV['CONTENTFUL_ACCESS_TOKEN']
  config.content_types = {
    article: ENV['CONTENTFUL_MAPPER_POST_TYPE_ID'],
    author: ENV['CONTENTFUL_MAPPER_AUTHOR_TYPE_ID']
  }
  config.cda_query = {
    content_type: ENV['CONTENTFUL_MAPPER_POST_TYPE_ID'],
    include: 10,
    order: 'fields.date',
    limit: 1000}
end

# ------------------------------------------------------------------------------
# Build
# ------------------------------------------------------------------------------
configure :build do
  ignore 'assets/javascripts/components'
  ignore 'assets/stylesheets/**/*.scss'

  activate :asset_hash
  activate :minify_css
  activate :minify_javascript, compressor: -> { Uglifier.new(mangle: {toplevel: true}, compress: {unsafe: true}) }
  activate :gzip
end

# ------------------------------------------------------------------------------
# Helpers
# ------------------------------------------------------------------------------
helpers do
  def author
    data.articles.article.first[1].author[0]
  end

  def sort_by_most_recent(posts)
    posts.sort_by { |key| key["date"] }.reverse
  end

  def recent_articles
    articles = []
    data.articles.article.first(3).each do |id, article|
      articles.push article
    end
    sort_by_most_recent(articles)
  end

  def all_articles
    articles = []
    data.articles.article.each do |id, article|
      articles.push article
    end
    sort_by_most_recent(articles)
  end

  def publish_date(datetime)
    datetime.strftime('%B %d, %Y')
  end

  def microdata_date(datetime)
    datetime.strftime('%Y-%m-%d')
  end

  def render_markdown(input)
    Kramdown::Document.new(input).to_html
  end
end
