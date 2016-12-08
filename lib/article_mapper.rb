class ArticleMapper < ContentfulMiddleman::Mapper::Base
  def map(context, entry)
    super
    context.created_at = entry.sys[:createdAt]
    context.updated_at = entry.sys[:updatedAt]
  end
end
