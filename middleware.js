export default function middleware(req) {
  const authorizationHeader = req.headers.get('authorization');

  if (authorizationHeader) {
    const basicAuth = authorizationHeader.split(' ')[1];
    const [user, password] = atob(basicAuth).split(':');

    // 👇 This is the list of users you can manage
    const allowedUsers = {
      'evanportfolio': 'helix2026',
      'recruiter': 'hireme'
    };

    // If the username exists and password matches, let them in
    if (allowedUsers[user] === password) {
      return new Response(null, {
        headers: {
          'x-middleware-next': '1' // Tell Vercel to show the Storybook
        }
      });
    }
  }

  // Otherwise, show the password prompt
  return new Response('Access Denied', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Storybook"',
    },
  });
}
