# Sector17

[Sector17](https://sector17.netlify.app/) refers to the vision of the ionic sector17 market of Chandigarh. It is a simple platform for everyshopkeeper/businessperson to sell their products online. Sellers have complete freedom over pricing and discounts It also lets sellers optout of the courier services(provided by our platform), where end users can enjoy less or free delivery charges. Which is a win-win situation for User and Shopkeeper.

## Environments




## Stakeholders 

**Please feel free to contact on Slack in case of any setup related issue or post in** [#n2-theta](https://join.slack.com/share/zt-sa486201-IYsy2Ms6fvqvauMmtmmbnQ)

- Pardeep Sharma - [LinkedIn](https://www.linkedin.com/in/pardeep2411/) - [GitHub](https://github.com/pardeep24)
- Raghav Narang - [LinkedIn](https://www.linkedin.com/in/raghav-narang/) - [GitHub](https://github.com/raghavnarang)
- Ravi Yadav - [LinkedIn](https://linkedin.com/in/raviyadav01/) - [GitHub](https://github.com/yadavravi2801)


## How to run the project

- Run `git clone https://github.com/pesto-students/sector17-N2-theta.git`


### For Running Express server

**Node JS as Backend code uploaded under "server" folder. It utilizes the Firebase Functions feature from Firebase suite of tools.**
**Requirment:** NPM and Node setup, and [Firebase cli](https://firebase.google.com/docs/cli#install_the_firebase_cli)

- Go to path `/sector17-N2-theta/server`
- Run `npm install` to install all required project dependencies
- Run `npm run server` to start project on http://localhost:3001
- Run `npm run deploy` to deploy on firebase cloud functions

You can set the port in firebase.json file or default will be http://localhost:3001

**Note: When you execute the deploy command, public URL for the server will be visible in CLI**


### For Running frontend code
- Go to path `/sector17-N2-theta`
- Run `npm install` to install all required project dependencies
- Run `npm run dev` to the project in dev mode
- Open the `https://localhost:3000` to run the project 


## Performance Screenshort
![alt text](https://storage.googleapis.com/sector17-chandigarh.appspot.com/readme/performance.jpg)


## Third party tools

- Netlify (To deploy the build)
- Sentry.io (For error and performance insights)
- Algolia (For Search)


## UI Design mocks

[Ui Design Figma link](https://www.figma.com/proto/vqaZjgHWYmHxOl9Gz1E6CU/Homepage?node-id=0%3A1&frame-preset-name=Desktop&scaling=scale-down&page-id=0%3A1)


## User Flowchart

[User flowchart Figma link](https://www.figma.com/proto/qaFqDsQnEg2wQ3NA4qWavN/FlowChart?node-id=13%3A2&scaling=scale-down-width&page-id=0%3A1)


## System Design

[System Design Figma link](https://www.figma.com/proto/knwI6lMdUkmkazuGlO45Rb/HLDS---Sector-17?node-id=2%3A1&scaling=contain&page-id=0%3A1)


## Features

- **Authentication** - Authentication using Facebook, Google.One user, one account
- **Search** - Help users to search shops, products, categoriesetc
- **Filters** - Filter products according Price, size, brandetc
- **Cart** - Bag to put all items you are willing to purchase
- **Guest Checkout** - No strings attached
- **Payment Method** - Pay using different payment methods
- **Dynamic Pricing/Shipping** - Different pricing for different users, Loyaltyprogram, Express Delivery.
- **Services** - OrderHistory, Wishlist, Manage profile, RecentlyViewed/Searched, Trending etc.


## Upcoming Features

- Frequently bought together
- Best deals
- Security Scenario
- Vendor Admin Panel
- Product Review System


## Tech Stack

- NextJS
- NodeJS
- Firebase (FirestoreDB, Authentication, Hosting, Storage)
- Jest

