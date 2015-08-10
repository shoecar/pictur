# Pictur

[Heroku link][heroku]

[heroku]: https://pictur-app.herokuapp.com/

## Minimum Viable Product
Pictur is a clone of Imgur built on Rails and Backbone. Users can:

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Create photos
- [ ] Create comments
- [ ] View user account (photos, comments)
- [ ] View photos
- [ ] Like/Dislike Photos
- [ ] Comment on photos

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Blog Creation (~1 day)
First I will implement user authentication. I will then create users and photos
with API routes rendering in JSON. By the end of this phase I will be able to create
test data and view it through my API routes.

[Details][phase-one]

### Phase 2: Viewing Blogs and Posts (~3 days)
Add backbone User and Photo models. User will parse out Photo associations for
show page. Create views for User show page with Photos. Create Photo Index as
landing page and Photo Show. Create Photo form using CarrierWave or similar gem
for database storage.

[Details][phase-two]

### Phase 3: Editing and Displaying Posts (~2 days)
I will add a Comments controller. I will need to change my Photo controller to
send comment associations. Also, I will need to update the Photo show jbuilder to
package the comment JSON. Backbone side update the Photo model and Photo show
to hold Comments. Add Comment model, collection and view item.

[Details][phase-three]

### Phase 4: User Feeds (~1-2 days)
Again in this phase I will need to refactor my Comments assets on both the Rails
and Backbone sides to accommodate my Votings join table. I will add a controller to
create and destroy Votings. Also a model and collection to track client side.

[Details][phase-four]

### Phase 5: Searching for Blogs and Posts (~1-2 days)
I will concentrate on styling my site. Namely I want to use a gem called Masonry.
This is used to dynamically display photos on the landing page. It also allows
infinite scrolling.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Add comments to User show page
- [ ] Implement Albums to hold pictures
- [ ] User profile pictures
- [ ] Tags on photos
- [ ] Nested comments
- [ ] Search functionality

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
