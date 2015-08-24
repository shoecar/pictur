def generateTime(start)
  time = Faker::Time.between(start, DateTime.now)
  while time > DateTime.now
    time = Faker::Time.between(start, DateTime.now)
  end
  return time
end

Photo.all.each do |photo|
  photo.user_id = rand(8) + 1
  photo.title = Faker::App.name if rand(2) == 0
  photo.description = rand(2) == 0 ? Faker::Lorem.paragraph(rand(10) + 1) : Faker::Lorem.sentence(rand(10) + 1)
  photo.created_at = generateTime(DateTime.now - 14)
  photo.save
end

User.where(id: (1..8)).each do |user|
  3.times do
    a = user.albums.create( name: Faker::App.name, created_at: generateTime(DateTime.now - 14) )
    user.photos.each do |photo|
      if rand(3) == 0
        photo.albumings.create( album_id: a.id, photo_id: photo.id )
      end
    end
  end
end

User.all.each do |user|
  user.created_at = Faker::Time.between(DateTime.now - 800, DateTime.now - 14)
  user.save

  50.times do
    user.votings.create({ user_id: user.id, photo_id: rand(Photo.all.length - 40) + 1, score: 1 })
  end

  15.times do
    photo = Photo.find(rand(Photo.all.length - 40) + 1)
    comment = photo.comments.create!(
      body: (rand(2) == 0 ? Faker::Lorem.paragraph(rand(10) + 1) : Faker::Lorem.sentence(rand(10) + 1)),
      user_id: user.id,
      created_at: generateTime(photo.created_at)
    )

    comment.save
  end
end
