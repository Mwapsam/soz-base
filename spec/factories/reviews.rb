FactoryBot.define do
  factory :review do
    rating { 1 }
    comment { "MyString" }
    user { nil }
    product { nil }
  end
end
