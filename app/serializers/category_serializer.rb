class CategorySerializer < ActiveModel::Serializer
  # attributes :id # , :name #: :children
  attributes :tree

  has_many :subtitles

  def tree
    object.subtree.order(:id).arrange_serializable do |parent, children|
      {
        id: parent.id,
        name: parent.name,
        children: children
      }
    end
  end
end
