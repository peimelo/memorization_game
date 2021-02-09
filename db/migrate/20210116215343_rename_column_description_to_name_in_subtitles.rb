class RenameColumnDescriptionToNameInSubtitles < ActiveRecord::Migration[6.1]
  def change
    rename_column :subtitles, :description, :name
  end
end
