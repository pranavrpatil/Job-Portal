package com.jobhook.Jobhook.utility;

public class Data {

    public static String getMessageBody(String otp){
        return """
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OTP Verification</title>
        </head>

        <body style="margin:0; padding:0; background-color:#f4f6f8;
                     font-family:Arial, Helvetica, sans-serif;">

            <table width="100%%" cellpadding="0" cellspacing="0"
                   style="background-color:#f4f6f8; padding:40px 0;">
                <tr>
                    <td align="center">

                        <table width="600" cellpadding="0" cellspacing="0"
                               style="background-color:#ffffff;
                                      border-radius:10px;
                                      padding:40px;
                                      box-shadow:0 2px 10px rgba(0,0,0,0.08);">

                            <tr>
                                <td align="center">
                                    <h1 style="color:#2563eb; margin:0 0 20px 0;">
                                        OTP Verification
                                    </h1>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <p style="color:#333333; font-size:16px;">
                                        Hello,
                                    </p>

                                    <p style="color:#333333; font-size:16px;
                                              line-height:1.6;">
                                        We received a request to verify your
                                        email address. Please use the OTP below
                                        to complete your verification.
                                    </p>
                                </td>
                            </tr>

                            <tr>
                                <td align="center" style="padding:20px 0;">

                                    <div style="display:inline-block;
                                                background-color:#f1f5f9;
                                                border:1px solid #e2e8f0;
                                                border-radius:8px;
                                                padding:15px 30px;
                                                font-size:32px;
                                                font-weight:bold;
                                                letter-spacing:8px;
                                                color:#2563eb;">
                                        %s
                                    </div>

                                </td>
                            </tr>

                            <tr>
                                <td align="center">

                                    <p style="color:#666666; font-size:14px;">
                                        This OTP is valid for
                                        <strong>5 minutes</strong>.
                                    </p>

                                </td>
                            </tr>

                            <tr>
                                <td>

                                    <div style="background-color:#fff7ed;
                                                border-left:4px solid #f97316;
                                                padding:12px 15px;
                                                margin-top:20px;">

                                        <p style="margin:0; color:#7c2d12;
                                                  font-size:14px;">
                                            <strong>Security Notice:</strong>
                                            Never share this OTP with anyone.
                                            Our team will never ask you for
                                            your OTP.
                                        </p>

                                    </div>

                                </td>
                            </tr>

                            <tr>
                                <td align="center" style="padding-top:30px;">

                                    <p style="color:#999999; font-size:13px;">
                                        If you did not request this OTP,
                                        you can safely ignore this email.
                                    </p>

                                    <p style="color:#999999; font-size:13px;">
                                        © 2026 JobHook. All rights reserved.
                                    </p>

                                </td>
                            </tr>

                        </table>

                    </td>
                </tr>
            </table>

        </body>
        </html>
        """.formatted(otp);
    }
}
