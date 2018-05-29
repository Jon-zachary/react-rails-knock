class ApplicationController < ActionController::API
  include knock::Authenticable
end
