# Phase 3: Adding Comments to Photos

## Rails
### Models

### Controllers
* Api::CommentsController (create, destroy)
* Api::PhotosController (Send Comment associations)

### Views
* photos/show.jbuilder (Send Comment associations)

## Backbone
### Models
* Photo (parses nested `Comment` association)
* Comment

### Collections
* Comments

### Views
* PhotoShow (composite view, contains CommentsItem subviews)
* CommentItem

## Gems/Libraries
