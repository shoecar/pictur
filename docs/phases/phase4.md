# Phase 4: Adding Votings to Photos

## Rails
### Models

### Controllers
* Api::VotingsController (create, update)
* Api::PhotosController (Send Votings associations)

### Views
* photos/show.jbuilder (Send Votings associations)

## Backbone
### Models
* Photo (parses nested `Votings` association)
* Voting

### Collections
* Votings

### Views
* PhotoShow (incorporate sum score of votings)

## Gems/Libraries
