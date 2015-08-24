Rails.application.routes.draw do
  root to: "roots#index"

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]

  namespace :api do
    resources :users, only: [:show, :update]
    resources :photos, except: [:new, :edit]
    resources :albums, except: [:new, :edit]
    resources :comments, only: [:create, :destroy]
    resources :votings, only: [:create, :destroy]
    resources :albumings, only: [:create, :destroy]
  end
end
