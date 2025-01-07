# Financial Data Filtering App

This React application fetches annual income statements for Apple Inc. (AAPL) from the [Financial Modeling Prep](https://financialmodelingprep.com/) API and displays them in a table with filtering and sorting capabilities.

---

## Features

- **Data Fetching**: Annual income statements from the Financial Modeling Prep API  
- **Filtering**: Filter by date range (year), revenue range, and net income range  
- **Sorting**: Sort by date, revenue, or net income (ascending or descending)  
- **Responsive UI**: Tailwind CSS ensures it looks great on desktop and mobile devices  

---

## Prerequisites

- **Node.js**
- **npm**

---

## Installation

1. **Clone the Repository** (replace `<your-username>` and `<repo-name>` with your actual GitHub username and repository name):

   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   ```  
2. **Navigate to the Project Directory:**  

   ```bash
   cd <repo-name>
   ```  

3. **Install Dependencies:**  

   ```bash
   npm install
   ```  

---

## Running Locally  

Once you have the dependencies installed, you can start the development server with:  
   ```bash
   npm start
   ```  

- The app will be available at http://localhost:3000 (by default).  

---

## Environment Variables (API Key)  

1. **Create a .env File**: Place it in the project’s root directory.  
   ```bash
   touch .env
   ```  
2. **Add Your API Key**: Set a variable named `REACT_APP_FMP_API_KEY` and assign it the value of your Financial Modeling Prep API key.  
   ```bash
   REACT_APP_FMP_API_KEY=YOUR_API_KEY_HERE
   ```  
3. **Include in .gitignore**: Ensure the `.env` file is ignored by Git to protect your key from being committed.
