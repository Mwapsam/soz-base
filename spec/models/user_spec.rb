require 'rails_helper'

RSpec.describe User, type: :model do
  before(:all) do
    @user1 = create(:user)
  end

  describe 'validations' do
    it 'is valid with valid attributes' do
      expect(@user1).to be_valid
    end

    it 'is not valid without a name' do
      user = build(:user, username: nil)
      expect(user).to_not be_valid
    end

    it 'is not a valid password' do
      user = build(:user, password: 'pass')
      expect(user).to_not be_valid
    end
  end
end