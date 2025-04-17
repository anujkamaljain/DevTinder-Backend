# Dev Tinder API's

## authRouter
- POST /signup
- POST /login
- POST /logout 

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## RequestRouter
- POST /request/send/:status/:userid
- POST /request/review/:status/:requestid

## userRouter
- GET /user/requests
- GET /user/connections
- GET /user/feed 

Status: like, pass, accepted, rejected
