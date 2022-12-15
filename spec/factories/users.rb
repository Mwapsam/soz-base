FactoryBot.define do
    factory :user do
      username { Faker::Name.unique.name }
      email { Faker::Internet.email }
      password { '@#HelloWorld2022*Root' }
      created_at { Time.now }
      updated_at { Time.now}
    end
end