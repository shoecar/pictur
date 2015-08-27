# Pictur

<a href="http://pictur.xyz">Live Site</a>

Pictur is a mock photo sharing web application built in its entirety over a fifteen day stretch in August 2015. Inspiration for design came from websites such as Imgur, Pinterest, and Instagram. These websites were referenced for general design, organization, and functionality. The style of Pictur, however, was entirely manufactured, not copied or mimicked.

Pictur runs a Postgres database inside Ruby on Rails. The front end is handled by Backbone and jQuery. HTML5 and SASS complied into CSS3 were extensively used in combination with Bootstrap.

## Minimum Viable Product
- [x] Create accounts
- [x] Create sessions (log in)
- [x] Create photos
- [x] Create comments
- [x] View user account
- [x] View photos
- [x] Like Photos
- [x] Comment on photos
- [x] Photo sorting
- [x] InfiniteScroll
- [x] Style photo with filters

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, and JSON views (~1 day)
First I will implement user authentication. I will then create users and photos
with API routes rendering in JSON. By the end of this phase I will be able to create
test data and view it through my API routes.

[Details][phase-one]

### Phase 2: Viewing User and Photos (~3 days)
Add backbone User and Photo models. User will parse out Photo associations for
show page. Create views for User show page with Photos. Create Photo Index as
landing page and Photo Show. Create Photo form using CarrierWave or similar gem
for database storage.

[Details][phase-two]

### Phase 3: Adding Comments to Photos (~2 days)
I will add a Comments controller. I will need to change my Photo controller to
send comment associations. Also, I will need to update the Photo show jbuilder to
package the comment JSON. Backbone side update the Photo model and Photo show
to hold Comments. Add Comment model, collection and view item.

[Details][phase-three]

### Phase 4: Adding Votings to Photos (~1-2 days)
Again in this phase I will need to refactor my Comments assets on both the Rails
and Backbone sides to accommodate my Votings join table. I will add a controller to
create and destroy Votings. Also a model and collection to track client side.

[Details][phase-four]

### Phase 5: Styling It All (~1-2 days)
I will concentrate on styling my site. Namely I want to use a gem called Masonry.
This is used to dynamically display photos on the landing page. It also allows
infinite scrolling.

[Details][phase-five]

### Bonus Features
- [x] Add comments to User show page
- [x] Implement Albums to hold pictures
- [x] User profile pictures
- [x] Picture sorting
- [ ] Photo Tag system
- [ ] Nested comments
- [ ] Search functionality

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
