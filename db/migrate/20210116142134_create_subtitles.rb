class CreateSubtitles < ActiveRecord::Migration[6.1]
  def change
    create_table :subtitles do |t|
      t.string :description, null: false
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
