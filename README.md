# Sector17

[Sector17](https://sector17.netlify.app/) refers to the vision of the ionic sector17 market of Chandigarh. It is a simple platform for everyshopkeeper/businessperson to sell their products online. Sellers have complete freedom over pricing and discounts It also lets sellers optout of the courier services(provided by our platform), where end users can enjoy less or free delivery charges. Which is a win-win situation for User and Shopkeeper.


## Stakeholders 

**Please feel free to contact on Slack in case of any setup related issue or post in** [#n2-theta](https://join.slack.com/share/zt-sa486201-IYsy2Ms6fvqvauMmtmmbnQ)

- Pardeep Sharma - [LinkedIn](https://www.linkedin.com/in/pardeep2411/) - [GitHub](https://github.com/pardeep24)
- Raghav Narang - [LinkedIn](https://www.linkedin.com/in/raghav-narang/) - [GitHub](https://github.com/raghavnarang)
- Ravi Yadav - [LinkedIn](https://linkedin.com/in/raviyadav01/) - [GitHub](https://github.com/yadavravi2801)


## How to run the project

- Run `git clone https://github.com/pesto-students/sector17-N2-theta.git`


### Fisrt Run Express server

*Node JS as Backend code uploaded under "server" folder. It utilizes the Firebase Functions feature from Firebase suite of tools.*

**Requirment:** NPM v6.14.11, Node v14.15.4 and [Firebase cli](https://firebase.google.com/docs/cli#install_the_firebase_cli)

- Go to path `cd sector17-N2-theta/server/functions`
- Run `npm install` to install all required project dependencies
- Run `npm run serve` to start project on http://localhost:3001

You can set the port in firebase.json file or default will be http://localhost:3001

**Note: When you execute the deploy command, public URL for the server will be visible in CLI**


### For Running frontend code
- Go to main project folder `cd sector17-N2-theta`
- Run `npm install` to install all required project dependencies
- Run `npm run dev` to the project in dev mode
- Open the `https://localhost:3000` to run the project 



## Environments and Deployments

| Environment | Base URL | Description  | Deployment |
| :-------:   | :------: | :----------: | :--------: |
| Development | [http://localhost:3000](http://localhost:3000) | When running locally on your machine  | When PR is Raise Netlify will create a preview URL on related environement on based on base branch  |
| Statging | [https://staging-sector17.netlify.app](https://staging-sector17.netlify.app) | An environment corresponding to `master` branch of this repo  |  Any changes merge to `master` branch will auto deploy on `staging` environment |
| Preproduction | [https://preproduction-sector17.netlify.app](https://preproduction-sector17.netlify.app) | `preproduction` branch for QA  | Any changes merge to `preproduction` branch will auto deploy on `preproduction` environment |
| Production | [https://sector17.netlify.app/](https://sector17.netlify.app/) | Main production environment  | Any changes merge to `production` branch will auto deploy on `production` environment |

## Error Monitoring and Logs
- We are using [Sentry](https://sentry.io/organizations/sector-17/issues/?environment=production&project=5814430
) for application monitoring and error traking **Please feel free to contact on Slack for access to Sentry** [#n2-theta](https://join.slack.com/share/zt-sa486201-IYsy2Ms6fvqvauMmtmmbnQ)

## UI Design mocks

[UI Design Figma link](https://www.figma.com/proto/vqaZjgHWYmHxOl9Gz1E6CU/Homepage?node-id=0%3A1&frame-preset-name=Desktop&scaling=scale-down&page-id=0%3A1)


## User Flowchart

[User Flowchart Figma link](https://www.figma.com/proto/qaFqDsQnEg2wQ3NA4qWavN/FlowChart?node-id=13%3A2&scaling=scale-down-width&page-id=0%3A1)


## System Design

[System Design Figma link](https://www.figma.com/proto/knwI6lMdUkmkazuGlO45Rb/HLDS---Sector-17?node-id=2%3A1&scaling=contain&page-id=0%3A1)

## Performance Screenshort
![alt text](https://storage.googleapis.com/sector17-chandigarh.appspot.com/readme/performance.jpg)


## Features

- **Authentication** - Authentication using Facebook, Google One user, one account
- **Search** - Help users to search shops, products, categories etc.
- **Filters** - Filter products according Price, size, brand etc.
- **Cart** - Bag to put all items you are willing to purchase
- **Guest Checkout** - No strings attached
- **Payment Method** - Pay using different payment methods
- **Dynamic Pricing/Shipping** - Different pricing for different users, Loyaltyprogram, Express Delivery.
- **Services** - OrderHistory, Wishlist, Manage profile, RecentlyViewed/Searched, Trending etc.


## Upcoming Features

- Frequently bought together
- Best deals
- Vendor Admin Panel
- Product Review System


## Third party tools

- Netlify (To deploy the build)
- Sentry.io (For error and performance insights)
- Algolia (For Search)



## Tech Stack

- NextJS
- NodeJS
- Firebase (FirestoreDB, Authentication, Hosting, Storage)
- Jest

