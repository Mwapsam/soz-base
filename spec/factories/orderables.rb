FactoryBot.define do
  factory :orderable do
    quantity { 1 }
    product { nil }
    cart { nil }
  end
end
