# frozen_string_literal: true

class Subtitle < ApplicationRecord
  belongs_to :category

  validates :category, :name, presence: true
end
