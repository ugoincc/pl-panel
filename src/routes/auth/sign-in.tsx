import { createFileRoute } from '@tanstack/react-router';
import { SignIn } from '@clerk/react';

export const Route = createFileRoute('/auth/sign-in')({
  component: SignInPage,
});

function SignInPage() {
  return (
    <div className='auth-bg pl-dark w-full h-screen flex items-center justify-center'>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <SignIn />
      </div>
    </div>
  );
}
