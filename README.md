# Medical Camps Website

## Overview

This project is a comprehensive web application designed to manage medical camps. It features user authentication, dynamic camp listings, detailed camp information, and dashboards for both organizers and participants. The application provides a seamless experience for users to register for camps, view feedback, and manage their profiles.

## Main Features

### Home Page
1. **Navbar:**
   - Logo and website name.
   - Navigation links: Home, Available Camps, Join Us (or user profile picture if logged in).
   - Profile dropdown: User name (not clickable), Dashboard, Logout button.

2. **Banner Section:**
   - Slider showcasing success stories and impactful moments from past medical camps.

3. **Popular Camps Section:**
   - Displays details of up to six popular camps, including Camp Name, Image, Camp Fees, Date and Time, Location, Healthcare Professional, and participant count.
   - "See All Camps" button linking to the Available Camps page.

4. **Camp Details Page:**
   - Detailed information about each camp with a "Join Camp" button.
   - Modal for participant registration with necessary fields.

5. **Feedback and Ratings:**
   - Displays participant feedback and ratings from registered camps.

### Available Camps Page
- Displays all camp data added by organizers.
- Essential details for each camp.
- Search bar for filtering camps.
- Sorting options: Most Registered, Camp Fees, Alphabetical Order.
- Layout switch button for changing between three-column and two-column layouts.

### Organizer Dashboard (Private Route)
1. **Organizer Profile:**
   - Manage profile information.
2. **Add A Camp:**
   - Form to input new camp details.
3. **Manage Camps:**
   - Table of created camps with edit and delete options.
4. **Manage Registered Camps:**
   - Display registered camp data with payment and confirmation statuses.

### Participant Dashboard (Private Route)
1. **Analytics:**
   - Chart displaying participant's registered camp data.
2. **Participant Profile:**
   - Manage profile information.
3. **Registered Camps:**
   - Table of registered camps with payment, confirmation statuses, feedback, and cancel options.
4. **Payment History:**
   - Records of all payments made by the participant.

### Authentication and Authorization
- **Join Us Page:**
  - Login form with social login options.
- **Register Page:**
  - Registration form with social login options.

## Technologies Used
- **Frontend:**
  - React.js
  - React Hook Form / Formik
  - Recharts (for analytics)
- **Backend:**
  - Node.js
  - Express.js
- **Database:**
  - MongoDB
- **Authentication:**
  - JWT (JSON Web Tokens)
  - Social login integrations

## Getting Started
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up environment variables.
4. Start the development server: `npm start`.

## Contributing
Feel free to fork this repository and make contributions. Pull requests are welcome!

## License
This project is licensed under the MIT License. See the LICENSE file for details.

