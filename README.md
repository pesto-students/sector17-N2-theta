# Sector17

[Sector17](https://sector17.netlify.app/) refers to the vision of the ionic sector17 market of Chandigarh. It is a simple platform for every shopkeeper/business person to sell their products online. Sellers have complete freedom over pricing and discounts It also let sellers opt-out of the courier services (provided by our platform), where end users can enjoy less or free delivery charges. Which is a win-win situation for User and Shopkeeper.

## Table of Contents
- [Stakeholders](#stakeholders)
- [How to run project](#how-to-run-the-project)
  * [First run Express server](#first-run-express-server)
  * [For running frontend code](#for-running-frontend-code)
- [Environments and Deployments](#environments-and-deployments)
- [Error Monitoring and Logs](#error-monitoring-and-logs)
- [Artefacts](#artefacts)
- [Performance Screenshot](#performance-screenshot)
- [Features](#features)
- [Upcoming Features](#upcoming-features)
- [Third party tools](#third-party-tools)
- [Tech Stack](#tech-stack)

## Stakeholders 

**Please feel free to contact on Slack in case of any setup related issue or post in** [#n2-theta](https://join.slack.com/share/zt-sa486201-IYsy2Ms6fvqvauMmtmmbnQ)

- Pardeep Sharma - [LinkedIn](https://www.linkedin.com/in/pardeep2411/) - [GitHub](https://github.com/pardeep24)
- Raghav Narang - [LinkedIn](https://www.linkedin.com/in/raghav-narang/) - [GitHub](https://github.com/raghavnarang)
- Ravi Yadav - [LinkedIn](https://linkedin.com/in/raviyadav01/) - [GitHub](https://github.com/yadavravi2801)


## How to run the project

- Run `git clone https://github.com/pesto-students/sector17-N2-theta.git`


### First Run Express server

*Node JS as Backend code uploaded under "server" folder. It utilizes the Firebase Functions feature from Firebase suite of tools.*

**Requirment:** NPM v6.14.11, Node v14.15.4 and [Firebase CLI](https://firebase.google.com/docs/cli#install_the_firebase_cli)

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

## Artefacts

- [PRD](https://drive.google.com/file/d/1ckHVe4Kk2GM-xAC1W_pyM_t5bmrI6s_p/view)

- [One Pager](https://drive.google.com/file/d/1KfyLHK_ECKgkQULg7VghJDqAvYIZodW2/view)

- [UI Design Figma](https://www.figma.com/proto/vqaZjgHWYmHxOl9Gz1E6CU/Homepage?node-id=0%3A1&frame-preset-name=Desktop&scaling=scale-down&page-id=0%3A1)

- [User Flowchart Figma](https://www.figma.com/proto/qaFqDsQnEg2wQ3NA4qWavN/FlowChart?node-id=13%3A2&scaling=scale-down-width&page-id=0%3A1)

- [System Design Figma](https://www.figma.com/proto/knwI6lMdUkmkazuGlO45Rb/HLDS---Sector-17?node-id=2%3A1&scaling=contain&page-id=0%3A1)


## Performance Screenshot

![alt text](https://storage.googleapis.com/sector17-chandigarh.appspot.com/readme/performance.jpg)


## Features

- **Authentication** - Authentication using Facebook, Google One user, one account
- **Search** - Help users to search shops, products, categories etc.
- **Filters** - Filter products according Price, size, brand etc.
- **Cart** - Bag to put all items you are willing to purchase
- **Guest Checkout** - No strings attached
- **Payment Method** - Pay using different payment methods
- **Dynamic Pricing/Shipping** - Different pricing for different users, Loyalty Program, Express Delivery.
- **Services** - OrderHistory, Wishlist, Manage profile, Recently Viewed/Searched, Trending etc.
- **Security** - React provides protection from XSS out of the box. CORS applied on Node.JS server, so no other request from unknown origin gets executed.
- **Wishlist** - Shortlist now, Buy later


## Upcoming Features

- Vendor Admin Panel
- Virtual Rendering for Pagination
- Switcher for Incremental Rollout
- .env File for Controlling Different Environments
- Show complete order details on Order History
- Return Exchange on Order History
- Better and more Optimised Filters
- Frequently Bought Together
- Best Deals
- Product Review System


## Third party tools

- Netlify (To deploy the build)
- Sentry.io (For error and performance insights)
- Algolia (For Search)


## Tech Stack

- Next JS
- React JS
- Node JS / Express JS
- Firebase (Firestore DB, Authentication, Storage, Cloud Functions)
- Netlify
- Stripe API, SendGrid API
- Jest
