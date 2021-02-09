require 'csv'

class Category < ApplicationRecord
  has_many :subtitles, dependent: :destroy
  has_ancestry

  validates :name, presence: true

  def self.import(file)
    is_first_row = true
    root = nil

    CSV.foreach(file.path, headers: true, col_sep: ';') do |row|
      if is_first_row
        if row[0] && !row['pai']
          root = Category.find_by_name(row[0])
          root && root.destroy

          root = Category.create(name: row[0])
        end

        is_first_row = false
      elsif root && row[0] && row['pai']
        create_category(row, root.id)
      end
    rescue StandardError => e
      p "ERROR: #{e} | ROW: #{row.to_hash}"
    end
  end

  private_class_method def self.create_category(row, root_id)
    parent = Category.where('id >= ?', root_id).find_by_name(row['pai'])
    parent.children.create(name: row[0])
  end
end
