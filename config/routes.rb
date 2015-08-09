Rails.application.routes.draw do
  root to: "roots#index"

  resource :root
end
