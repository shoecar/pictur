Rails.application.routes.draw do
  root to: "roots#index"

  resource :root, only: :index
end
