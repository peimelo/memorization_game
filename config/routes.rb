Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :categories, except: [:create] do
      collection { post :import }
    end

    resources :subtitles
  end

  match '*all', to: 'static_pages#index', via: [:get]
end
