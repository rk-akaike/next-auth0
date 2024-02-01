"use client";

import { FC, useState } from "react";

interface ResendEmailButtonProps {
  userId: any;
  accessToken: any;
}

const ResendEmailButton: FC<ResendEmailButtonProps> = ({
  userId,
  accessToken,
}) => {
  const [loading, setLoading] = useState(false);

  const resendVerificationEmail = async () => {
    setLoading(true);
    const clientId = "W2wQwG2DrBiLJJ145QwTPB1ic9If533S";
    // const organizationId = "your-organization-id";

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    var raw = JSON.stringify({
      user_id: userId,
      client_id: clientId,
      //   organization_id: organizationId,
      //   identity: {
      //     user_id: userId,
      //     provider: "Username-Password-Authentication",
      //   },
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      //   redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://rk-akaike.us.auth0.com/api/v2/jobs/verification-email",
        requestOptions
      );
      const result = await response.text();
      console.log(
        "🚀 ~ file: index.tsx:44 ~ resendVerificationEmail ~ result:",
        result
      );
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <button
      onClick={resendVerificationEmail}
      className="px-4 py-2 bg-green-500 text-white border-none rounded-md cursor-pointer"
    >
      Resend Email
    </button>
  );
};

export default ResendEmailButton;
