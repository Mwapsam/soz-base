FactoryBot.define do
  factory :product do
    name { "MyString" }
    description { "MyText" }
    price { 1 }
    stripe_price_id { "MyString" }
    stripe_product_id { "MyString" }
    currency { "MyString" }
    user { nil }
  end
end
