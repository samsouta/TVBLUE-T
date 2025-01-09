import React, { useEffect, useState } from 'react';
import { User } from '@nextui-org/react';
import Cookies from 'js-cookie';

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<{ name: string; email: string; avatar: string } | null>(null);
  useEffect(() => {
    // Retrieve the user cookie and parse it
    const userCookie = Cookies.get('user');

    if (userCookie) {
      const parsedUser = JSON.parse(userCookie);

      setUser({
        name: parsedUser?.name,
        email: parsedUser?.email,
        avatar: parsedUser?.avatar || null
      });
    }
  }, []);
  return (
    <div>
      {user ? (
        <User
          avatarProps={{
            src: `${user?.avatar === null ? 'https://i.pinimg.com/736x/76/da/dc/76dadcae2845339368c408ae67b6585d.jpg' : user?.avatar}`
          }}
          name={user.name || 'John Doe'}  // Display name or fallback text
          description={user.email || 'No email available'}  // Display email or fallback text
        />
      ) : (
        <p>Loading user info...</p>
      )}

    </div>
  );
};

export default UserProfile;
