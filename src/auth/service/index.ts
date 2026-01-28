import { authClient } from '../authClient.js';
const signUp = async (email: string, password: string, name: string) => {
  //import the auth client

  const { data, error } = await authClient.signUp.email(
    {
      email, // user email address
      password, // user password -> min 8 characters by default
      name, // user display name
      callbackURL: '/dashboard', // A URL to redirect to after the user verifies their email (optional)
    },
    {
      onSuccess: (ctx: any) => {
        // console.log(ctx);
        return ctx;
        //redirect to the dashboard or sign in page
      },
      onError: (ctx: any) => {
        // display the error message
        alert(ctx.error.message);
      },
    },
  );
  return { data, error };
};
