class AddPhotoUrlToListings < ActiveRecord::Migration[7.0]
  def change
    add_column :listings, :photo_url, :string
  end
end
