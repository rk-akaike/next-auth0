import Image from "next/image";
import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
import ResendEmailButton from "./components/resend";

const EmailVerification = async () => {
  const session = await getSession();

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50">
      <div className="relative flex flex-col w-[408px] bg-white p-6 rounded-lg border">
        <div className="bg-[#FEE4E2] rounded-full w-12 h-12 p-3">
          <Image src="/next.svg" alt="failure Icon" width={24} height={24} />
        </div>
        <p className="text-xl font-semibold leading-[140%] mt-4">
          Verification Pending
        </p>
        <p className="text-sm font-normal text-[#475467] leading-[140%] mt-1">
          We have sent a verification link to your email. Please verify the link
          and try again.
        </p>

        <p className="text-sm font-normal text-[#475467] leading-[140%] mt-4">
          If your email is already verified, please logout and login again.
        </p>

        <div className="flex flex-col gap-3 text-[16px] font-semibold leading-[150%] w-full mt-8">
          <ResendEmailButton
            userId={session?.user.sub}
            accessToken={session?.accessToken}
          />
        </div>
        <div className="flex flex-col gap-3 text-[16px] font-semibold leading-[150%] w-full mt-8">
          <a
            href="/api/auth/logout"
            className="px-4 py-[10px] bg-[#FEE4E2] border border-red-200 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] w-full text-center"
          >
            logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
