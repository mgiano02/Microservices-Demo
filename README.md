# Wardrobify

Team:

* Person 1 - Sina Klughardt, Shoes - dev-branch-1
* Person 2 - Michael Gianoulakis, Hats - dev-branch-2

## Design

## Shoes microservice

* At first I created a Value object for the Bin Model that gets polled, so I can store it to the Shoe microservice database
* then I created a Shoe model so a Shoe can get created
* I wrote the poller so it polls the Bin Model and stores it in the BinVO Value object. I used the Bin id as an identifier so the right BinVO object can be found and get updated
* then I created views for the RESTful Apis and checked if they work in Insomnia.

## Hats microservice

* Created hat model and locationvo model which obtains data from the wardrobe location model. Set up polling via href to     obtain locationvo data. Set up hats views with encoders and connected them to hats urls and hat files on frontend with react.
