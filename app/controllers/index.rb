get '/' do
  # Look in app/views/index.erb
  erb :index
end


post '/' do 
  @user1 = User.find_or_create_by_name(name: params[:name], email: params[:email])
  @user2 = User.find_or_create_by_name(name: params[:name2], email: params[:email2])
  session[:user_id1] = @user1.id
  session[:user_id2] = @user2.id
  session[:length] = params[:length]
  redirect "/game"
end


get '/game' do 
  @game = Game.create(track_length: session[:length].to_i)
  @relation1 = GamesUser.create(user_id: session[:user_id1], game_id: @game.id)
  @relation2 = GamesUser.create(user_id: session[:user_id2], game_id: @game.id)
  erb :play
end


post '/finish' do
  content_type :json
  @game = Game.find(params["game_id"].to_i)
  p "session #{session.inspect}"
  p "@game: #{@game.inspect}"
  p "params #{params.inspect}"
  if params["winner"] == "1"
   @winner_id = session[:user_id1]
  else
   @winner_id = session[:user_id2]
  end
  p "winner id :#{@winner_id}"
  @game.update_attributes(winner_id: @winner_id, time: params["time"].to_i)
  p "@game updated: #{@game.inspect}"
end