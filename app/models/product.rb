class Product < ApplicationRecord
  has_many_attached :photos

  validates :name, presence: true, uniqueness: true, length: { maximum: 150 }
  validates :description, presence: true, length: { maximum: 1000 }
  validates :price, presence: true, :numericality => { :greater_than => 0, only_integer: true }

  scope :sorted, ->{ order(created_at: :asc) }

  def photos_urls
    photos.map do |photo|
      Rails.application.routes.url_helpers.rails_blob_path(photo, only_path: true)
    end
  end
end
