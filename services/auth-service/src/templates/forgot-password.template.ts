export const forgotPasswordTemplate = (
  url: string
) => `
<h2>Reset Password</h2>

<p>Click the link below to reset your password.</p>

<a href="${url}">
Reset Password
</a>
`;