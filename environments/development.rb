configure :development do
  config[:host] = 'http://localhost:4567'

  after_configuration do
    data.articles.article.each do |id, article|
      proxy "/articles/#{article.slug}/index.html", 'articles/show.html', locals: {article: article }, ignore: true
    end

    puts "Proxy pages generated successfully!"

    activate :external_pipeline,
      name: :webpack,
      command: './node_modules/webpack/bin/webpack.js --watch -d --progress --color',
      source: '.tmp/dist',
      latency: 0
  end

  activate :livereload,
    no_swf: true,
    livereload_css_target: 'assets/stylesheets/app.css.scss',
    livereload_css_pattern: Regexp.new('_.*\.scss')
end
