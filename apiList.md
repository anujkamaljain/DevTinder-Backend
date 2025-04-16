# Dev Tinder API's

## authRouter
- POST /auth/signup
- POST /auth/login
- POST /auth/logout 

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## RequestRouter
- POST /request/send/:status/:userid
- POST /request/review/:status/:requestid

## userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed 

Status: like, pass, accepted, rejected
