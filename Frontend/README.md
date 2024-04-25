# Space Wonders Frontend

# ReactJS Frontend Documentation

## Introduction

- This Project uses the following Tech Stack
- **ReactJS
- **TailwindCSS
- **Redux for State Management
- **MUI for some components overriden with CSS
- **Other React Libraries as Well
- **Vite Build Tool

### Here's a breakdown of the Redux folders alignment:

- **Actions folder**: This folder contains all the actions and API requests setup using axios.
- **Reducers folder**: This folder contain the reducer files which are used for redux state management after API requests has been sent.
- **Constants folder:**: This folder contains all the constants for redux. These are all the possible cases for API handling.

# Installation and Setup

To set up the frontend locally, follow these steps:

1. **Clone the repository**
   `git clone <repository-url>`

2. **Install dependencies**
   Navigate to the project root directory and run the following command to install the required dependencies:
   `npm install`
   This will install all the dependencies listed in the `package.json` file
   
3. **Start the development server**
   To start the development server in development mode with automatic restart on file changes, run the following command:
   `npm run dev`

---

# Directory Setup

```
 -Frontend/src
     /Pages
         | - This contain all the Main Category Pages
     /Info
         | - All the static information data can be edited from here - Privacy Policy, Shipping & Return Policy, FAQs , Legal Notice and Articles(not static)
         | - Dynamic Articles are fetched here
     /user
         | - This contains all the use related pages and components
         | - Profile - Edit
         | - Address
         | - Auth Modals
     /Home
         | - This contains the complete content of Homepage
         | - Category Sections
         | - About Section
         | - Search Bar
         | - ContactUs
         | - Ads & Small Ads
         | - Divider Banners
         | - Hero Image
         | - Testimonials
         | - Articles
         | - Impact Section
     /Contact	
         | - This contains all the forms and components after the cart checkout
         | - Shipping
         | - Billing
         | - Animals List
         | - Confirm Order Window
     /RFQ
         | - This folder contains all the contact section 
         | - TabsSidebar of homepage
         | - RFQ Window	
         | - Catalog
         | - Category List
      /product
         | - This folder contains all the components regarding products
         | - Product.jsx list all the products
         | - ProductCard 
         | - Product Details
         | - Product Images & Mobile Images
         | - Other Details Components - Reviews, Sizes, Ratings, FAQ's, Variants & other details.
      /Cart
         | - Cart Item Card
         | - All Cart Itmes
         | - ProductCard 
      /MyOrders
         | - My Orders Table
      /Filters
         | - Filters Bar on All Products Page
      /context
         | - Filtering Logic
      /Redux
         | - actions, reducers, constants, store - explained above
      /Other ComponentS
         | - layout/loader
         | - Navbar
         | - Footer
     .gitignore
     App.jsx
     App.css
     index.css
     index.jsx
-package.json
-package-lock.json
```


