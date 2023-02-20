# redux-firebase-todo-app

This is a TODO App that I've made using Redux-toolkit & Firebase, basically my first ever fullstack app (if firebase counts as backend).

This was also my first time using Firebase, Redux-toolkit, & TypeScript.

**More functionalities will be added in the future inshallah!**

The user should be able to:

- Create an account
- Sign In with email and password, or using google authentication
- Reset the account's password
- Create, edit, delete and archive todos (each type of todos will be grouped in a separate page)
- Switch todos's completed state
- Create, edit and delete labels
- Add labels to, and delete labels from todos
- Filter todos by labels
- Switch between light and dark themes

## Usage:

1. Clone the repo and run `npm install` to install all dependencies
2. Make a Firebase project
3. Make an `.env.local` file and paste this with your project's data:

   ```
   VITE_FB_API_KEY=
   VITE_FB_AUTHDOMAIN=
   VITE_FB_PROJECTID=
   VITE_FB_STORAGEBUCKET=
   VITE_FB_MESSAGINGSENDERID=
   VITE_FB_APPID=
   ```

**Make sure you add 127.0.0.1 to your authorized domains**

## Resources:

- [React.js](https://beta.reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Redux-toolkit](https://redux-toolkit.js.org/)
- [Firebase](https://firebase.google.com/)
