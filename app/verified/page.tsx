import { redirect } from 'next/navigation';

export default async function VerifiedRedirectPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  const params = await searchParams;
  const raw = params?.token;
  const token = Array.isArray(raw) ? raw[0] : raw;

  if (token && typeof token === 'string') {
    redirect(`/auth/verify-email?token=${encodeURIComponent(token)}`);
  }

  redirect('/auth/verify-email');
}
