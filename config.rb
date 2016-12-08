require 'contentful_middleman'
require 'lib/article_mapper'

activate :dotenv
activate :directory_indexes

config[:css_dir]     = '/assets/stylesheets'
config[:images_dir]  = '/assets/images'
config[:js_dir]      = '/assets/js'

# Setup Contentful
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
  config.cda_query = {content_type: ENV['CONTENTFUL_MAPPER_POST_TYPE_ID'], include: 3}
end

after_configuration do
  # Generate static pages for each Post
  data.blog.post.each do |id, post|
    proxy "/articles/#{post.slug}/index.html", 'views/articles/show.html', locals: {post: post }, ignore: true
  end
end

configure :development do
  activate :livereload, no_swf: true
end

configure :build do
  config[:host] = "https://pixelsonly.com"

  activate :minify_css
  activate :asset_hash
  activate :relative_assets
end

helpers do
  def author
    data.blog.post.first[1][:author].first
  end
end
