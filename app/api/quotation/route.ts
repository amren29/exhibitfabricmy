import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const product_name = formData.get('product_name') as string;
    const message = formData.get('message') as string;
    const file = formData.get('file') as File | null;

    // Validate required fields
    if (!name || !email || !phone || !product_name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send email notification
    if (resend && process.env.RESEND_FROM_EMAIL && process.env.RESEND_TO_EMAIL) {
      try {
        const emailOptions: any = {
          from: process.env.RESEND_FROM_EMAIL,
          to: process.env.RESEND_TO_EMAIL, // Your personal email
          replyTo: email, // Customer's email for easy reply
          subject: `New Quotation Request for ${product_name}`,
          html: `
            <h2>New Quotation Request</h2>
            <p><strong>Product:</strong> ${product_name}</p>
            <p><strong>Customer:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong></p>
            <p>${message || 'No message provided'}</p>
            ${file ? `<p><strong>Note:</strong> Customer has attached a file (${file.name}). Contact them directly for the file.</p>` : ''}
            <hr />
            <p style="color: #666; font-size: 12px;">
              You can reply directly to this email to respond to ${name}.
            </p>
          `,
        };

        await resend.emails.send(emailOptions);

        return NextResponse.json({
          success: true,
          message: "Quotation request submitted successfully"
        });
      } catch (emailError) {
        console.error("Email error:", emailError);
        return NextResponse.json(
          { error: "Failed to send email notification" },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Quotation form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
