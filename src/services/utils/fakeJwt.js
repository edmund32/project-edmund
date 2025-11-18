const base64 = (string) => btoa(unescape(encodeURIComponent(string)));

export const generateFakeJWT = (user) => {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  // payload berisi info user + expired
  const payload = {
    id: user.id,
    username: user.username,
    exp: Math.floor(Date.now() / 1000) + 5 * 60, // expire 5 menit (DETIK)
  };

  const encodedHeader = base64(JSON.stringify(header));
  const encodedPayload = base64(JSON.stringify(payload));

  // Fake signature (karena ngga ada backend sebenernya)
  const signature = base64(`${encodedHeader}.${encodedPayload}.secret`);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};
