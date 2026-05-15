import { Show, UserButton, useUser } from '@clerk/react';

export function UserButtonData() {
  const { user, isLoaded, isSignedIn } = useUser();
  return (
    <Show when='signed-in'>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {isLoaded && isSignedIn && (
          <span
            style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: '0.85rem',
              color: '#A0B4C8',
            }}
          >
            {user.firstName} {user.lastName}
          </span>
        )}
        <UserButton />
      </div>
    </Show>
  );
}
