class ChangeMessageName < ActiveRecord::Migration
  def self.up
    add_column :messages, :text, :string
    remove_column :messages, :message
  end

  def self.down
    add_column :messages, :message, :string
    remove_column :messages, :text
  end
end
