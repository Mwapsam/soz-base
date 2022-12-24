class User < ApplicationRecord
    validates :username, :session_token, uniqueness: true
    validates :username, presence: true
    validates :password, length: {minimum: 6, allow_nil: true}

    has_one_attached :photo

    attr_reader :password
    before_validation :ensure_session_token

    def self.find_by_credentials(email, password)
        @user = User.find_by(email: email)
        return nil unless @user
        @user.is_password?(password) ? @user : nil
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def ensure_session_token
        self.session_token ||= SecureRandom::urlsafe_base64
    end

    def reset_session_token!
        self.session_token = SecureRandom::urlsafe_base64
    end

    # Stripe user created here
    def to_s
        username
    end

    def to_s
        email
    end

    after_create do
        customer = Stripe::Customer.create(name: username, email: email)
        update(stripe_customer_id: customer.id)
    end
end
