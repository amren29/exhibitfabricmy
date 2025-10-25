import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
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

    let file_url = null;

    // Handle file upload to Supabase Storage (if file exists)
    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `quotations/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
        .from('quotation-files')
        .upload(filePath, file);

      if (uploadError) {
        console.error('File upload error:', uploadError);
        // Continue without file if upload fails
      } else {
        // Get public URL
        const { data: urlData } = supabaseAdmin.storage
          .from('quotation-files')
          .getPublicUrl(filePath);

        file_url = urlData.publicUrl;
      }
    }

    // Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from("quotations")
      .insert([
        {
          name,
          email,
          phone,
          product_name,
          message: message || '',
          file_url,
          status: "pending",
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save quotation" },
        { status: 500 }
      );
    }

    // Send email notification (if Resend is configured)
    if (resend && process.env.RESEND_FROM_EMAIL) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: process.env.RESEND_FROM_EMAIL,
          subject: `New Quotation Request for ${product_name}`,
          html: `
            <h2>New Quotation Request</h2>
            <p><strong>Product:</strong> ${product_name}</p>
            <p><strong>Customer:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong></p>
            <p>${message || 'No message provided'}</p>
            ${file_url ? `<p><strong>Attachment:</strong> <a href="${file_url}">View File</a></p>` : ''}
          `,
        });
      } catch (emailError) {
        console.error("Email error:", emailError);
      }
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Quotation form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    let query = supabaseAdmin
      .from('quotations')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch quotations' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
