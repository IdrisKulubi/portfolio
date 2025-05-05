"use server";

export async function checkAdminCode(code: string): Promise<boolean> {
  // Never expose the code to the client
  const adminCode = process.env.ADMIN_CODE;
  return code === adminCode;
} 